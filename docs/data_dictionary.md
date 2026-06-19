# PineGuard Data Dictionary

This document explains the static data files used by the GitHub Pages prototype. All files are served from `docs/data/` and can be inspected directly by graders.

## `pineguard_static_data.json`

Combined runtime dataset loaded by `docs/assets/app.js`. It contains metadata, templates, market prices, alert events, evidence rows, evidence summaries, feature mapping, and static validation checks.

## `market_prices_snapshot.csv`

Pre-built market-price snapshot used for browser-side forward-test attribution.

Required fields:

| Field | Meaning |
|---|---|
| `timestamp` | Date or datetime for the price observation. |
| `symbol` | Market symbol. |
| `open`, `high`, `low`, `close` | OHLC prices. |
| `volume` | Trading volume if available. |

## `alert_events_snapshot.csv`

TradingView-style alert-event snapshot. A production system would receive these from user-authorized webhook payloads. The static prototype stores them as a reproducible course artifact.

Required fields:

| Field | Meaning |
|---|---|
| `timestamp` | Alert event time. |
| `strategy_id` | Strategy or template identifier. |
| `symbol` | Asset symbol. |
| `signal` | Directional event such as BUY or SELL. |
| `price` | Price at alert time. |
| `message` | Alert message text. |

## `strategy_templates.csv`

Template library used by the recommendation module.

Important fields:

| Field | Meaning |
|---|---|
| `template_id` | Template identifier. |
| `name` | Human-readable template name. |
| `style` | Strategy style. |
| `risk_level` | Low, medium, or high risk profile. |
| `market` | Suitable market category. |
| `description` | Plain-English explanation. |
| `revenue_angle` | Product tier connected to the template. |

## `combined_evidence_snapshot.csv`

Public demand-evidence snapshot. Rows use short paraphrases and URLs rather than long copied text.

Important fields:

| Field | Meaning |
|---|---|
| `evidence_origin` | Whether the row came from crawler or manual coding. |
| `url` | Public source URL. |
| `source_type` | Official documentation, competitor page, marketplace listing, etc. |
| `pain_category` | Business pain category. |
| `short_evidence` | Short paraphrase of the evidence. |
| `why_relevant` | Why this supports PineGuard. |

## `static_validation.csv`

Build-time validation checks used to confirm that the deployed static site has the data it needs.
