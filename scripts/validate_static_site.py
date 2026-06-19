#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
required = [
    ROOT / "docs/index.html",
    ROOT / "docs/assets/style.css",
    ROOT / "docs/assets/app.js",
    ROOT / "docs/assets/router.js",
    ROOT / "docs/assets/components.js",
    ROOT / "docs/assets/scoring.js",
    ROOT / "docs/data/pineguard_static_data.json",
    ROOT / "docs/data/strategy_templates.csv",
    ROOT / "docs/data/market_prices_snapshot.csv",
    ROOT / "docs/data/alert_events_snapshot.csv",
    ROOT / "docs/data/combined_evidence_snapshot.csv",
    ROOT / "docs/data/personas.csv",
    ROOT / "docs/data/health_check_questions.csv",
    ROOT / "docs/data/score_rules.csv",
    ROOT / "docs/data/report_sections.csv",
    ROOT / "docs/data/sample_webhook_payloads.json",
]
errors = []
for path in required:
    if not path.exists():
        errors.append(f"missing required file: {path.relative_to(ROOT)}")

if (ROOT / "docs/data/pineguard_static_data.json").exists():
    data = json.loads((ROOT / "docs/data/pineguard_static_data.json").read_text())
    for key in ["templates", "prices", "alerts", "evidence", "featureMap", "validation", "productionLayers", "riskControls"]:
        if key not in data or not data[key]:
            errors.append(f"missing or empty JSON key: {key}")

# Keep validation focused on static-site structure and required data keys.

if errors:
    print("STATIC SITE VALIDATION FAILED")
    for e in errors:
        print("-", e)
    raise SystemExit(1)
print("STATIC SITE VALIDATION PASSED")
