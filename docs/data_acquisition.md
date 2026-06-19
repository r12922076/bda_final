# Data Acquisition Process

PineGuard uses public digital-trace evidence to support a conservative beachhead hypothesis. The project does not claim product-market fit and does not use private scraping, login-only communities, broker accounts, or non-public TradingView data.

## Goal

The evidence dataset answers four questions:

1. Do TradingView users face validation pain around alerts, backtests, repainting, and paid scripts?
2. Are the relevant platform features technically real and documented?
3. Do adjacent products show willingness to pay for trading workflow tools?
4. What platform, privacy, and legal risks must the production system respect?

## Source classes

| Source class | Role | Evidence strength |
|---|---|---|
| TradingView official documentation | Technical feasibility and platform constraints | Strong |
| Academic or professional validation references | Why backtest overfitting, transaction costs, and lookahead matter | Strong/Medium |
| Public forums and marketplace traces | Qualitative pain signals and current workarounds | Medium/Weak |
| Competitor and adjacent-product pricing | Indirect willingness-to-pay benchmark | Medium |
| Legal and platform policy pages | Risk controls and product boundaries | Strong/Medium |

## Workflow

1. **Seed selection**: public seed URLs are listed in `docs/data/evidence_seed_urls.csv`. They include TradingView official docs, public discussions, competitor-pricing pages, and architecture references.
2. **Collection**: only public, non-login, non-paywalled pages are considered. The project avoids long copyrighted excerpts.
3. **Manual coding**: rows are coded with source type, pain category, evidence role, evidence strength, and a short paraphrased relevance note.
4. **Snapshot creation**: coded rows are stored in `docs/data/combined_evidence_snapshot.csv`.
5. **Build step**: `scripts/build_static_site.py` combines evidence rows, alert events, market snapshots, score rules, templates, and documentation metadata into `docs/data/pineguard_static_data.json`.
6. **Validation**: `scripts/validate_static_site.py` checks required files and JSON keys. `scripts/frontend_smoke_test.js` checks route registration and route-facing data assumptions.

## Important limitation

The evidence supports a defensible beachhead hypothesis, not proven product-market fit. Public discussions are self-selected, competitor pricing is an adjacent benchmark, and synthetic personas are derived from public evidence rather than direct interviews. A production launch would still require direct user interviews, landing-page conversion tests, and retention metrics.
