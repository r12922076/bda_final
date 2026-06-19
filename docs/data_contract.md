# PineGuard Data Contract

This document describes the minimum fields needed by the deployed static application.

## `pineguard_static_data.json`

Required top-level keys:

- `templates`
- `prices`
- `alerts`
- `evidence`
- `evidenceCategory`
- `evidenceSource`
- `evidenceStrength`
- `featureMap`
- `validation`
- `competitorBenchmarks`
- `productionLayers`
- `riskControls`
- `evidenceQuality`
- `scaleEconomics`
- `graderTour`

## Strategy templates

Required fields:

- `template_id`
- `name`
- `style`
- `market`
- `risk_level`
- `description`
- `revenue_angle`

## Alert events

Required fields:

- `timestamp`
- `symbol`
- `signal`
- `price`

The static prototype supports `BUY` and `SELL` signal directions. Production would add idempotency keys, raw payload hashes, user IDs, and strategy version IDs.

## Market prices

Required fields:

- `timestamp`
- `symbol`
- `close`

The browser joins alert timestamps to later price snapshots to compute directional forward-test outcomes.

## Evidence rows

Required fields:

- `url`
- `source_type`
- `pain_category`
- `short_evidence`
- `why_relevant`
- `evidence_strength`
- `evidence_role`

Evidence strength should be interpreted conservatively:

- `Strong`: official technical documentation or primary platform source.
- `Medium`: competitor pricing, adjacent-product benchmark, or manually coded public evidence.
- `Weak`: marketplace listing or broad demand proxy.

## Validation

Run:

```bash
python scripts/validate_static_site.py
node scripts/frontend_smoke_test.js
```
