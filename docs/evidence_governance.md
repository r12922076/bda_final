# Evidence Governance

PineGuard separates evidence quality from product claims. The Evidence Explorer deliberately labels source type, pain category, evidence role, and evidence strength so the report does not overstate demand.

## Evidence-strength rules

| Strength | Meaning | Examples |
|---|---|---|
| Strong | Primary technical, platform, academic, or policy source. | TradingView official docs, platform policies, academic/professional validation references. |
| Medium | Public directional evidence or adjacent-market benchmark. | Reddit/forum pain signals, professional blogs, competitor-pricing pages. |
| Weak | Isolated, promotional, or indirect evidence. | Marketplace listing language, single anecdote, indirect product claim. |

## Evidence-role rules

| Role | Interpretation |
|---|---|
| Technical validity evidence | The platform feature or failure mode is documented and technically real. |
| Demand proxy | A public pain point or workaround suggests potential user need. |
| WTP benchmark evidence | A direct or adjacent pricing source suggests users pay for nearby workflows. |
| Adjacent-market benchmark | Similar tools monetize trading workflow, automation, journaling, or research. |

## Conservative interpretation

The evidence supports a beachhead hypothesis, not product-market fit. PineGuard can claim that the target segment plausibly faces validation pain and pays for adjacent tools. It should not claim that conversion, retention, or a demand curve has already been proven.

## Current evidence mix

- Official/technical sources support technical feasibility and platform constraints.
- Public discussion sources support qualitative pain signals.
- Competitor-pricing sources support indirect willingness-to-pay benchmarks.
- Synthetic personas summarize public evidence. They are not direct interviews.

## Files

- `docs/data/evidence_seed_urls.csv`
- `docs/data/combined_evidence_snapshot.csv`
- `docs/data/evidence_strength_summary.csv`
- `docs/data/pineguard_static_data.json`
