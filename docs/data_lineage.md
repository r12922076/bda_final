# PineGuard Data Lineage

PineGuard turns fragmented TradingView-style workflow traces into a structured validation product.

## Static course artifact

```text
Evidence seed URLs + manually coded evidence rows
        -> combined_evidence_snapshot.csv
        -> pineguard_static_data.json
        -> browser-side Evidence Explorer
        -> Strategy Health Report
```

```text
Sample market prices + sample alert events
        -> pineguard_static_data.json
        -> forward-test attribution in the browser
        -> Monitor page and report summary
```

```text
Strategy templates + score rules + user-selected profile
        -> browser-side health score
        -> Diagnosis page
        -> Report page
```

## Production design

```text
TradingView alert webhook
        -> API endpoint
        -> durable queue
        -> validation/idempotency worker
        -> event store + object storage
        -> scheduled report recomputation
        -> dashboard / downloadable report
```

## Why this matters

The data product is not raw alert data or raw public evidence. The monetized output is the interpreted validation layer: missing workflow components, score breakdowns, forward-test summaries, evidence basis, and reportable next steps.
