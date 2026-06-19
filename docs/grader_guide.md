# PineGuard Grader Guide

This guide is designed for a quick evaluation of the deployed artifact.

## Two-minute path

1. Open the live site: <https://r12922076.github.io/bda_final/>
2. Click **Grader Tour** from the navigation bar.
3. Open **Health Check** and verify the five-step workflow:
   - persona selection
   - strategy profile
   - available data
   - risk concerns
   - diagnosis generation
4. Open **Diagnosis** and verify the score breakdown and missing workflow components.
5. Open **Monitor** and verify horizon buttons, alert-event table, sample CSV download, and webhook payload copy.
6. Open **Evidence** and test filters by pain category, source type, and evidence strength.
7. Open **Report** and download the Markdown or JSON report.
8. Open **Architecture** and confirm the split between static course deployment and production event-driven deployment.
9. Open **Risk** and verify platform, privacy, investment-advice, cold-start, and competition controls.

## Requirement mapping

- Target customer: Home, Health Check, Pricing, and Report.
- Demand evidence and willingness to pay: Evidence, Pricing, Evidence Methodology, Competitor Benchmarks.
- Technical system design: Architecture, Data Contract, Data Lineage, README, and validation scripts.
- Delivery: Report page, Markdown/JSON downloads, static GitHub Pages deployment.
- Go-to-market difficulties: Risk page and Risk Register.

## Important boundary

PineGuard is a workflow-validation product. It does not sell trading signals, execute trades, or provide investment advice.
