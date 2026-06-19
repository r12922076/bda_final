# Data Contract

This document defines the minimum runtime data contract for the static demo and the production event contract for a live version.

## Static runtime bundle

The deployed SPA loads `docs/data/pineguard_static_data.json`. Required top-level keys:

- `templates`
- `prices`
- `alerts`
- `evidence`
- `evidenceStrength`
- `featureMap`
- `validation`
- `productionLayers`
- `riskControls`
- `graderTour`

## Evidence row contract

Each evidence row must include:

- `url`
- `source_type`
- `pain_category`
- `short_evidence`
- `why_relevant`
- `evidence_strength`
- `evidence_role`

## Alert event contract

Each static alert event must include:

- `timestamp`
- `symbol`
- `signal`
- `price`
- `strategy_id`

## Production webhook event schema

A production event should be normalized into a schema like this:

```json
{
  "event_id": "uuid",
  "payload_hash": "sha256",
  "user_id": "hashed_user_id",
  "strategy_id": "strategy_id",
  "symbol": "AAPL",
  "timeframe": "15m",
  "signal": "long_entry",
  "alert_time": "2026-06-19T13:20:00Z",
  "alert_price": 198.25,
  "payload_version": "v1",
  "raw_payload_uri": "object://bucket/path/event.json"
}
```

## Production reliability notes

- `event_id` and `payload_hash` support idempotency.
- Raw payloads should be stored separately from normalized metadata.
- Webhook ingestion should acknowledge quickly and move durable processing to a queue.
- Scheduled workers compute forward-test outcomes after the chosen horizon has passed.
- Sensitive user strategy data should be minimized and separated from public evidence data.
