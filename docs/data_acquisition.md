# Data Acquisition Process

PineGuard's demand evidence and runtime demo data are built from public digital traces and static sample data. The goal is to document how the project moved from a broad idea - TradingView users may need better strategy validation - into a defensible, inspectable product hypothesis.

## 1. Scope of data collection

The project collects only public or user-provided data categories:

1. **Official platform documentation**: TradingView pages about alerts, webhooks, Pine Script strategies, repainting, and Strategy Tester assumptions.
2. **Public ecosystem traces**: public script/listing pages and public discussions that mention non-repainting, backtesting, alerts, webhooks, paid scripts, or strategy validation.
3. **Adjacent-product benchmarks**: pricing and product pages for trading journals, webhook automation tools, backtesting platforms, Pine tooling, and execution bridges.
4. **Static demo data**: synthetic or sample alert events, market price snapshots, strategy templates, and risk-control records used by the GitHub Pages prototype.

The prototype does **not** collect private TradingView account data, broker credentials, trading API keys, or login-only content.

## 2. Collection rules

The data-collection process follows conservative rules:

- Use only public pages or user-provided files.
- Avoid private communities, paywalled pages, and login-only material.
- Store source URLs and short paraphrases rather than long copied excerpts.
- Separate official technical evidence from qualitative user-pain evidence.
- Treat competitor pricing as adjacent willingness-to-pay evidence, not direct proof that users will buy PineGuard.
- Treat public forum discussions as directional pain signals, not representative market research.

## 3. Evidence coding schema

Each evidence row is coded with the following fields:

| Field | Meaning |
|---|---|
| `evidence_origin` | Whether the row came from automated seed discovery or manual coding. |
| `url` | Public source URL. |
| `source_type` | Official documentation, forum discussion, competitor, marketplace listing, or service page. |
| `pain_category` | Main workflow pain: alert/webhook, repaint/lookahead, backtest realism, paid-script trust, no-code templates, or forward-test need. |
| `short_evidence` | Short paraphrase of the source's relevant content. |
| `why_relevant` | How the source supports PineGuard's product logic. |
| `usable_in_report` | Whether the source is suitable for report use. |
| `evidence_strength` | Strong, Medium, or Weak. |
| `evidence_role` | Technical validity evidence, demand proxy, adjacent-market benchmark, or willingness-to-pay benchmark. |

## 4. Evidence strength interpretation

| Strength | Examples | Interpretation |
|---|---|---|
| Strong | TradingView official documentation, platform policy, academic references, official pricing pages. | Reliable for technical feasibility, platform constraints, or adjacent pricing. |
| Medium | Reddit/forum discussions, professional articles, competitor pages, marketplace pages. | Useful for qualitative demand and current-workaround evidence. |
| Weak | Isolated marketplace language, promotional claims, single anecdotes. | Directional only; should not be used as a standalone demand claim. |

## 5. Build pipeline

```text
Public seed URLs and static CSV files
        -> manual evidence coding and strength labels
        -> docs/data/combined_evidence_snapshot.csv
        -> scripts/build_static_site.py
        -> docs/data/pineguard_static_data.json
        -> browser-side SPA routes
        -> evidence explorer, health score, monitor, and report output
```

The deployed website reads `docs/data/pineguard_static_data.json` at runtime. It does not crawl the web, call external APIs, or collect user data after deployment.

## 6. Limitations

This evidence supports a **beachhead hypothesis**, not proven product-market fit. The project did not run a controlled survey, paid acquisition campaign, or landing-page conversion test. Public discussions are self-selected and may overrepresent dissatisfied users. Competitor prices show that adjacent workflow tools are monetizable, but they do not prove PineGuard's exact demand curve.

A production launch should add direct interviews, conversion tests, retention tracking, and user-authorized event ingestion.
