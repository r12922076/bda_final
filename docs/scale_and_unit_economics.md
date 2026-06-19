# Scale and Unit Economics

PineGuard should not scale directly from the static prototype to high-frequency monitoring. The commercial path should start from low-frequency health checks and then move into monitoring only when the user has enough alert history.

| Scale | Expected workload | Architecture implication | Cost driver |
|---|---|---|---|
| Course prototype | Static snapshots and browser-side computation | GitHub Pages, versioned JSON/CSV, and validation checks | Near-zero hosting cost for the academic demo |
| 10x early product | Thousands of alert events per day and scheduled reports | Webhook endpoint, durable queue, PostgreSQL metadata, daily workers | Webhook ingestion, storage retention, report recomputation |
| 100x commercial product | Millions of alert events per month | Partitioned event tables, object storage, retries, monitoring, cost-aware retention | Event volume, market-data enrichment, retention policy, support load |

The main variable costs are event ingestion, storage retention, market-data enrichment, scheduled recomputation, and user support for alert setup. High-frequency users should be priced separately because they create disproportionate data volume.
