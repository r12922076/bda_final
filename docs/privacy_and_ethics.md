# Privacy, Ethics, and Platform-Risk Notes

PineGuard is designed as a workflow-validation product rather than an investment-advice product.

## Core principles

1. **No investment advice**: the system should not tell users whether to buy or sell a specific asset.
2. **User-authorized data only**: a production version should use user-provided exports or user-authorized webhook payloads.
3. **No restricted scraping**: private, login-only, paywalled, or restricted content should not be scraped.
4. **Minimal data storage**: only fields required for validation should be stored.
5. **Auditability**: report outputs should be traceable to input files, alert events, and static evidence rows.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Users may treat the health score as trading advice. | Use workflow-validation language and explicit disclaimers. |
| Alert payloads may expose private strategy behavior. | Separate identity data from event logs and support deletion/export. |
| Public evidence may not be representative. | Label evidence as directional, not survey-based. |
| Platform dependency on TradingView-style workflows. | Use user-authorized payloads and exportable static files. |
| Overclaiming product value. | Emphasize monitoring, completeness, and validation rather than profitability. |
