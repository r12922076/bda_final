# Platform and Legal Risk Notes

PineGuard is intentionally positioned as strategy-workflow validation, not signal selling or execution routing.

## Platform dependency

PineGuard depends on TradingView-style user workflows. The product should use user-authorized alert payloads, user exports, and public documentation. It should not scrape login-only pages, bypass access controls, or attempt to redistribute protected Pine Script code.

## Investment-advice boundary

PineGuard scores workflow completeness and evidence quality. It does not recommend securities, predict returns, execute trades, or tell users whether to buy or sell. Every generated report should state that historical outcomes and workflow scores do not imply future profitability.

## Paid-script and creator risk

A creator trust product can create disputes if it publicly attacks specific scripts. The safer design is user-initiated and private: users analyze their own observed alert history and exported data. PineGuard should report measured workflow properties rather than accuse third-party creators.

## Privacy and data minimization

Webhook payloads can reveal trading preferences, symbols, strategy timing, and sometimes personally identifiable information if users include it. PineGuard should collect only fields required for analysis, avoid broker API keys and account credentials, and support deletion/export of user data in a production version.

## Prototype boundary

The current GitHub Pages deployment uses static sample CSV/JSON data and browser-side JavaScript analytics. It does not receive live webhooks, store private user data, or execute orders. Production deployment would require user consent, authentication, idempotent ingestion, retention controls, and security monitoring.
