# Production Architecture Extension

The GitHub Pages website is a static course deployment. A commercial PineGuard would require a separate production architecture.

## Layers

1. **Webhook ingestion**: user-authorized HTTPS endpoint validates alert payloads and acknowledges quickly.
2. **Queue / stream buffer**: durable queue buffers bursty alert events before analytics workers process them.
3. **Idempotency**: event IDs and payload hashes prevent duplicate counting.
4. **Storage**: PostgreSQL for users, strategies, subscriptions, and reports; object storage for raw payloads; time-series tables for alert outcomes.
5. **Processing**: scheduled jobs recompute health reports and near-real-time workers monitor alerts.
6. **Serving**: dashboard, report downloads, audit trails, and optional creator-facing reports.

## Rationale

The production design separates data ingestion from analytics. This matters because alert events can arrive in bursts and webhook senders may terminate requests that do not acknowledge quickly. The endpoint should therefore record or enqueue the event first, then process analytics asynchronously.
