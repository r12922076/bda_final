#!/usr/bin/env python3
"""Build static PineGuard data snapshots for GitHub Pages.

Run from repository root:
    python scripts/build_static_site.py

This script does not fetch live data. Fetch/update market data first if needed.
"""
from __future__ import annotations
from pathlib import Path
import json
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data"
DATA.mkdir(parents=True, exist_ok=True)

def read_first(paths):
    for p in paths:
        if p.exists():
            return pd.read_csv(p)
    return pd.DataFrame()

templates = read_first([ROOT / "data" / "strategy_templates.csv", DATA / "strategy_templates.csv"])
prices = read_first([ROOT / "data" / "live_market_prices.csv", ROOT / "data" / "sample_market_prices.csv", DATA / "market_prices_snapshot.csv"])
alerts = read_first([ROOT / "data" / "sample_alerts.csv", DATA / "alert_events_snapshot.csv"])
evidence = read_first([ROOT / "evidence" / "outputs" / "combined_evidence.csv", ROOT / "evidence" / "combined_evidence.csv", ROOT / "outputs" / "combined_evidence.csv", DATA / "combined_evidence_snapshot.csv"])

def records(df):
    return df.where(pd.notna(df), None).to_dict(orient="records")

def count_by(df, col):
    if df.empty or col not in df.columns:
        return []
    return [{"name": str(k), "value": int(v)} for k, v in df[col].fillna("unknown").value_counts().items()]

def assign_evidence_strength(row):
    source_type = str(row.get("source_type", ""))
    origin = str(row.get("evidence_origin", ""))
    if source_type == "official_doc":
        return "Strong"
    if source_type in {"pricing", "competitor", "competitor_or_service"}:
        return "Medium"
    if origin == "manual":
        return "Medium"
    return "Weak"

def assign_evidence_role(row):
    source_type = str(row.get("source_type", ""))
    if source_type == "official_doc":
        return "Technical validity evidence"
    if source_type == "pricing":
        return "WTP benchmark evidence"
    if source_type.startswith("competitor"):
        return "Adjacent-market benchmark"
    if source_type == "marketplace_listing":
        return "Demand proxy"
    return "Qualitative public-trace evidence"

if not evidence.empty:
    evidence["evidence_strength"] = evidence.apply(assign_evidence_strength, axis=1)
    evidence["evidence_role"] = evidence.apply(assign_evidence_role, axis=1)

validation = [
    {"check":"templates_present","passed":len(templates)>=5,"detail":f"{len(templates)} templates"},
    {"check":"prices_present","passed":len(prices)>=100,"detail":f"{len(prices)} price rows"},
    {"check":"alerts_present","passed":len(alerts)>=5,"detail":f"{len(alerts)} alert rows"},
    {"check":"evidence_present","passed":len(evidence)>=3,"detail":f"{len(evidence)} evidence rows"},
]

competitor_benchmarks = [
    {"category":"No-code Pine tooling","examples":"Pineify; PineGen AI","benchmark":"Pineify: USD 99 lifetime; PineGen AI: USD 39-99/month","access_date":"June 2026","pineguard_implication":"Supports willingness to pay for reducing Pine Script workflow friction."},
    {"category":"Webhook automation","examples":"TradersPost; PineConnector; PickMyTrade; CrossTrade","benchmark":"TradersPost: USD 41-254/month; PineConnector: USD 39-159/month; PickMyTrade: USD 50/month; CrossTrade: USD 29-99/month","access_date":"June 2026","pineguard_implication":"Supports paid alert-event infrastructure and monitoring workflows."},
    {"category":"Backtesting and research","examples":"TrendSpider; Quantpedia; Build Alpha","benchmark":"TrendSpider: USD 82-349/month; research platforms use premium access models","access_date":"June 2026","pineguard_implication":"Supports paid strategy evaluation and validation products."},
    {"category":"Trading workflow platform","examples":"TradingView paid plans","benchmark":"Paid plans tied to alerts, indicators, history, and workflow capacity","access_date":"June 2026","pineguard_implication":"Supports a target segment that already pays for trading workflow tooling."},
]
production_layers = [
    {"layer":"Webhook ingestion","design":"User-authorized HTTPS endpoint validates payloads and acknowledges quickly.","why":"Avoids slow synchronous processing and reduces missing-event risk."},
    {"layer":"Queue / stream buffer","design":"Durable queue stores bursty alert events before analytics workers consume them.","why":"Decouples ingestion from processing and supports retries."},
    {"layer":"Idempotency","design":"Payload hashes and event IDs prevent duplicate counting.","why":"Preserves audit quality and report integrity."},
    {"layer":"Storage","design":"Relational metadata, raw-payload object storage, and time-series outcome tables.","why":"Separates users, strategies, raw logs, and analytics outputs."},
    {"layer":"Scheduled jobs","design":"Daily report recomputation and near-real-time alert monitoring.","why":"Balances reliable reporting with timely dashboard updates."},
]
risk_controls = [
    {"risk":"Platform dependency","control":"Use user-authorized alert payloads and user-provided exports; avoid unauthorized scraping."},
    {"risk":"Investment-advice boundary","control":"Provide workflow diagnostics only; no personalized trade recommendations or execution."},
    {"risk":"Privacy and data minimization","control":"Do not collect broker passwords or trading API keys; retain only validation-relevant fields."},
    {"risk":"Cold start","control":"Start with one-time health checks, then migrate users into monitoring as alert history accumulates."},
    {"risk":"Competitive imitation","control":"Differentiate through audit trails, evidence-backed reports, and alert/outcome history."},
]
evidence_quality = [
    {"evidence_type":"Official technical docs","role":"Validate that repainting, strategy testing, alerts, and webhooks are platform-level topics.","interpretation":"Strong technical motivation; not direct willingness-to-pay evidence."},
    {"evidence_type":"Public user discussions","role":"Show qualitative pain around repainting, webhook issues, and paid-script trust.","interpretation":"Useful but not representative; should be described conservatively."},
    {"evidence_type":"Competitor pricing","role":"Show adjacent workflows are monetized.","interpretation":"Benchmarks a plausible price corridor; not a direct demand curve."},
    {"evidence_type":"Static prototype data","role":"Demonstrates reproducible data product logic.","interpretation":"Course artifact; production system needs live authorized ingestion."},
]

scale_economics = [
    {"scale":"Course prototype","expected_workload":"Static snapshots and browser-side computation","architecture_implication":"GitHub Pages, versioned JSON/CSV, and validation checks are sufficient.","cost_driver":"Near-zero hosting cost for the academic demo."},
    {"scale":"10x early product","expected_workload":"Thousands of alert events per day and scheduled reports","architecture_implication":"Add webhook endpoint, durable queue, PostgreSQL metadata, and daily workers.","cost_driver":"Webhook ingestion, storage retention, and scheduled recomputation."},
    {"scale":"100x commercial product","expected_workload":"Millions of alert events per month across many strategies","architecture_implication":"Add partitioned event tables, object storage, retries, monitoring, and cost-aware retention.","cost_driver":"Event volume, market-data enrichment, retention policy, and support load."},
]

payload = {
    "meta": {
        "project":"PineGuard",
        "student_id":"r12323059",
        "version":"GitHub Pages Static SPA v3 high-score polish",
        "routes":"home, health-check, diagnosis, strategy-profile, monitor, evidence, report, pricing, architecture, risk, docs, tour",
        "build_type":"static browser app",
        "data_mode":"pre-downloaded JSON/CSV snapshots",
        "runtime_note":"No Python backend is required after deployment."
    },
    "templates": records(templates),
    "prices": records(prices),
    "alerts": records(alerts),
    "evidence": records(evidence),
    "evidenceCategory": count_by(evidence, "pain_category"),
    "evidenceSource": count_by(evidence, "source_type"),
    "evidenceStrength": count_by(evidence, "evidence_strength"),
    "graderTour": [
        {"step":"1","route":"#/home","what_to_check":"Landing page states the beachhead customer and product output."},
        {"step":"2","route":"#/health-check","what_to_check":"Five-step wizard: persona, strategy, available data, risks, generation."},
        {"step":"3","route":"#/diagnosis","what_to_check":"Health score, category breakdown, and missing workflow components."},
        {"step":"4","route":"#/monitor","what_to_check":"Forward-test monitor, horizon buttons, sample CSV download, payload copy."},
        {"step":"5","route":"#/evidence","what_to_check":"Evidence Explorer filters by category, source, and strength."},
        {"step":"6","route":"#/report","what_to_check":"Downloadable report as the paid data product output."},
        {"step":"7","route":"#/architecture","what_to_check":"Static course deployment and production event-driven pipeline."},
    ],
    "featureMap": [
        {"pain_category":"alert_or_webhook_workflow","product_feature":"Webhook alert monitor","paid_output":"Monthly Forward-Test Monitor"},
        {"pain_category":"repainting_or_lookahead","product_feature":"Repaint/lookahead checklist","paid_output":"Strategy Health Check"},
        {"pain_category":"backtest_realism","product_feature":"Backtest realism diagnosis","paid_output":"Strategy Health Check"},
        {"pain_category":"no_code_or_template_need","product_feature":"Template recommender","paid_output":"Pro Strategy Completion Plan"},
        {"pain_category":"paid_indicator_trust","product_feature":"Creator trust report","paid_output":"Creator Trust Report"},
        {"pain_category":"forward_test_need","product_feature":"Forward-test attribution","paid_output":"Monthly Forward-Test Monitor"},
    ],
    "validation": validation,
    "competitorBenchmarks": competitor_benchmarks,
    "productionLayers": production_layers,
    "riskControls": risk_controls,
    "evidenceQuality": evidence_quality,
    "scaleEconomics": scale_economics
}
(DATA / "pineguard_static_data.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
templates.to_csv(DATA / "strategy_templates.csv", index=False)
prices.to_csv(DATA / "market_prices_snapshot.csv", index=False)
alerts.to_csv(DATA / "alert_events_snapshot.csv", index=False)
evidence.to_csv(DATA / "combined_evidence_snapshot.csv", index=False)
pd.DataFrame(validation).to_csv(DATA / "static_validation.csv", index=False)
pd.DataFrame(competitor_benchmarks).to_csv(DATA / "competitor_benchmarks.csv", index=False)
pd.DataFrame(production_layers).to_csv(DATA / "production_architecture_layers.csv", index=False)
pd.DataFrame(risk_controls).to_csv(DATA / "risk_controls.csv", index=False)
pd.DataFrame(evidence_quality).to_csv(DATA / "evidence_quality_notes.csv", index=False)
pd.DataFrame(scale_economics).to_csv(DATA / "scale_economics.csv", index=False)
pd.DataFrame(count_by(evidence, "evidence_strength")).to_csv(DATA / "evidence_strength_summary.csv", index=False)
print("Built static site data under docs/data")
