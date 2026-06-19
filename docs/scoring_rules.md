# Strategy Health Score Rules

The PineGuard health score measures workflow completeness and evidence quality. It does not estimate expected return, expected Sharpe ratio, or trading profitability.

## Category weights

| Category | Maximum points | Why it matters |
|---|---:|---|
| Backtest realism | 25 | Strategy Tester evidence is fragile when commission, slippage, order assumptions, and backtest settings are missing. |
| Live alert observability | 20 | TradingView alerts become usable workflow data only when alert history and payload schema are captured. |
| Repainting / lookahead risk | 20 | Multi-timeframe logic and realtime/historical differences are TradingView-specific validation risks. |
| Risk rule completeness | 20 | A strategy workflow is incomplete without explicit exit logic and position-sizing assumptions. |
| Evidence quality | 15 | Forward-test records and version history make a report auditable rather than purely historical. |

## Rule-level scoring

The runtime scoring function is implemented in `docs/assets/scoring.js`. The data-file summary is stored in `docs/data/score_rules.csv`.

| Rule | Points | Interpretation |
|---|---:|---|
| Alert-event history | 12 | Required for forward-test attribution and alert monitoring. |
| Webhook payload schema | 8 | Converts TradingView alerts into structured events. |
| Strategy Tester assumptions | 10 | Provides baseline historical validation context. |
| Commission / slippage specified | 8 | Makes backtest and live behavior more comparable. |
| Repainting / lookahead review | 16 | Required when multi-timeframe or realtime-dependent logic is used. |
| Forward-test records | 14 | Separates historical backtest behavior from live or paper behavior. |
| Version history | 8 | Needed for creator-facing or repeatable trust reports. |
| Explicit exit rule | 8 | Prevents signal-only workflows from appearing complete. |
| Position-sizing rule | 8 | Required before serious workflow validation. |

## Product boundary

A high score does not mean a strategy is profitable. It means the workflow is sufficiently documented to evaluate. A low score means the user should improve observability, cost assumptions, forward-test evidence, or risk rules before trusting the strategy.
