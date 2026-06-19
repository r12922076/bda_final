(function(){
  const defaultState = {
    step: 1,
    persona: "alert-heavy",
    style: "Trend following",
    market: "Crypto",
    risk: "Medium",
    horizon: 5,
    data: {
      alert_logs: true,
      strategy_tester: true,
      request_security: false,
      commission_slippage: false,
      forward_records: true,
      version_history: false,
      webhook_payload: true
    },
    concerns: {
      repainting: true,
      backtest_realism: true,
      webhook_reliability: true,
      exit_rule: false,
      position_sizing: false,
      paid_trust: false,
      forward_test: true
    },
    selectedTemplate: "T001"
  };
  const personas = [
    {id:"alert-heavy", name:"Alert-heavy trader", pain:"Many TradingView alerts but weak outcome tracking", product:"Forward-Test Monitor"},
    {id:"paid-script", name:"Paid-indicator buyer", pain:"Needs credibility checks before trusting invite-only scripts", product:"Strategy Health Check"},
    {id:"pine-coder", name:"Pine Script builder", pain:"Needs repaint, lookahead, and backtest-realism checks", product:"Pro Completion Plan"},
    {id:"no-code", name:"No-code strategy seeker", pain:"Needs guided templates and missing-rule diagnosis", product:"Pro Completion Plan"},
    {id:"creator", name:"Indicator creator", pain:"Needs evidence-backed trust report for users", product:"Creator Trust Report"}
  ];
  const concerns = {
    repainting: "Repainting / lookahead risk",
    backtest_realism: "Unrealistic backtest",
    webhook_reliability: "Alert delay / missed webhook",
    exit_rule: "No explicit exit rule",
    position_sizing: "No position sizing rule",
    paid_trust: "Paid-indicator trust",
    forward_test: "No forward-test record"
  };
  function clone(obj){ return typeof structuredClone === "function" ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)); }
  function deepMerge(base, patch){
    const out = clone(base);
    if(!patch || typeof patch !== "object") return out;
    for(const [k,v] of Object.entries(patch)){
      if(v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])) out[k] = {...out[k], ...v};
      else if(k in out) out[k] = v;
    }
    return out;
  }
  function loadState(){
    try { return deepMerge(defaultState, JSON.parse(localStorage.getItem("pineguard_state") || "{}")); }
    catch { return clone(defaultState); }
  }
  function saveState(s){ localStorage.setItem("pineguard_state", JSON.stringify(s)); }
  function recommendTemplates(DATA, style, persona){
    const map = {
      "Trend following":["T001","T004","T007"],
      "Breakout":["T002","T004","T007"],
      "Mean reversion":["T003","T004"],
      "ETF rotation":["T005","T004"],
      "Paid script due diligence":["T006","T004","T007"],
      "Not sure":["T004","T001","T003"]
    };
    if(persona === "paid-script") return ["T006","T004","T007"].map(id=>DATA.templates.find(t=>t.template_id===id)).filter(Boolean);
    if(persona === "creator") return ["T007","T006","T004"].map(id=>DATA.templates.find(t=>t.template_id===id)).filter(Boolean);
    return (map[style] || map["Not sure"]).map(id=>DATA.templates.find(t=>t.template_id===id)).filter(Boolean);
  }
  function forwardTest(alerts, prices, horizon){
    const bySym = {};
    prices.forEach(p=>{ if(!bySym[p.symbol]) bySym[p.symbol]=[]; bySym[p.symbol].push(p); });
    Object.values(bySym).forEach(v=>v.sort((a,b)=>String(a.timestamp).localeCompare(String(b.timestamp))));
    return alerts.map(a=>{
      const arr=bySym[a.symbol]||[];
      const day=String(a.timestamp).slice(0,10);
      const idx=arr.findIndex(p=>String(p.timestamp).slice(0,10)>=day);
      const future=idx>=0 ? arr[Math.min(arr.length-1, idx+horizon)] : null;
      if(!future) return {...a, future_close:null, directional_return:0, outcome:"pending"};
      const raw=(future.close - Number(a.price))/Number(a.price);
      const ret=a.signal === "SELL" ? -raw : raw;
      return {...a, future_close:future.close, directional_return:ret, outcome:ret>=0?"win":"loss"};
    });
  }
  function gapList(state){
    const d=state.data, c=state.concerns;
    return [
      {id:"alert_logs", label:"Alert-event history", ok:!!d.alert_logs, detail:"Required for forward-test attribution and alert monitoring.", category:"Live alert observability", points:12},
      {id:"webhook_payload", label:"Webhook payload schema", ok:!!d.webhook_payload, detail:"Needed to convert TradingView alerts into structured events.", category:"Live alert observability", points:8},
      {id:"strategy_tester", label:"Strategy Tester assumptions", ok:!!d.strategy_tester, detail:"Commission, slippage, and broker-emulator settings affect realism.", category:"Backtest realism", points:10},
      {id:"commission_slippage", label:"Commission/slippage specified", ok:!!d.commission_slippage, detail:"Missing cost assumptions make backtests less comparable to live behavior.", category:"Backtest realism", points:8},
      {id:"request_security", label:"Repainting/lookahead review", ok:!!d.request_security || !c.repainting, detail:"Scripts using multi-timeframe logic require special checks.", category:"Repainting/lookahead risk", points:16},
      {id:"forward_records", label:"Forward-test records", ok:!!d.forward_records, detail:"Live or paper-trading records are needed beyond historical backtests.", category:"Evidence quality", points:14},
      {id:"version_history", label:"Script version history", ok:!!d.version_history || state.persona!=="creator", detail:"Creator trust reports require stable versioned behavior.", category:"Evidence quality", points:8},
      {id:"exit_rule", label:"Explicit exit rule", ok:!c.exit_rule, detail:"A missing exit rule weakens strategy completion quality.", category:"Risk rule completeness", points:8},
      {id:"position_sizing", label:"Position sizing rule", ok:!c.position_sizing, detail:"Sizing logic is needed before any serious validation workflow.", category:"Risk rule completeness", points:8}
    ];
  }
  function scoreBreakdown(state, ft){
    const gaps=gapList(state);
    const categories={"Backtest realism":25,"Live alert observability":20,"Repainting/lookahead risk":20,"Risk rule completeness":20,"Evidence quality":15};
    const out={};
    for(const [k,max] of Object.entries(categories)) out[k]={score:max,max};
    gaps.forEach(g=>{ if(!g.ok && out[g.category]) out[g.category].score=Math.max(0,out[g.category].score-g.points); });
    if(ft && ft.length < 10) out["Evidence quality"].score=Math.max(0,out["Evidence quality"].score-4);
    const total=Object.values(out).reduce((a,x)=>a+x.score,0);
    return {total, categories:out, gaps};
  }
  function reportMarkdown(DATA, state, ft, recs, breakdown){
    const wins=ft.filter(x=>x.outcome==="win").length;
    const winRate=ft.length ? (100*wins/ft.length).toFixed(1) : "0.0";
    const avg=ft.length ? (100*ft.reduce((a,x)=>a+x.directional_return,0)/ft.length).toFixed(2) : "0.00";
    const missing=breakdown.gaps.filter(g=>!g.ok);
    return `# PineGuard Strategy Health Report\n\nReport ID: PG-${String(state.persona||"user").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)}-${breakdown.total}-${state.horizon}\nGenerated at: Static demo snapshot / June 2026\nGenerated for: ${state.style} / ${state.market} / ${state.risk} risk\n\n## Executive Summary\nPineGuard evaluated the selected TradingView-style workflow using static alert logs, market snapshots, strategy templates, and public evidence data. The current health score is ${breakdown.total}/100. This score measures workflow completeness and evidence quality, not trading profitability.\n\n## Health Score Breakdown\n${Object.entries(breakdown.categories).map(([k,v])=>`- ${k}: ${v.score}/${v.max}`).join("\n")}\n\n## Forward-Test Monitor\n- Evaluated alert events: ${ft.length}\n- Horizon: ${state.horizon} bars\n- Directional win rate: ${winRate}%\n- Average directional return: ${avg}%\n\n## Recommended Templates\n${recs.map(r=>`- ${r.name} (${r.template_id}): ${r.description}`).join("\n")}\n\n## Missing or Weak Workflow Components\n${missing.length ? missing.map(g=>`- ${g.label}: ${g.detail}`).join("\n") : "- No major missing workflow components under the current profile."}\n\n## Evidence Basis\nThe report uses official documentation, public user-pain evidence, competitor benchmarks, and static data snapshots. Public discussion evidence is interpreted qualitatively rather than as a representative survey. The evidence supports a beachhead hypothesis, not proven product-market fit.\n\n## Next Step\n${breakdown.total < 75 ? "PineGuard recommends starting with Strategy Health Check and Forward-Test Monitor before upgrading to Pro Completion." : "PineGuard recommends continuing monitoring and using Pro Completion only if new strategy modules are added."}\n\n## Disclaimer\nThis academic prototype is not investment advice, does not execute trades, and does not evaluate expected profitability.`;
  }
  window.PG = Object.assign(window.PG || {}, {defaultState, personas, concerns, loadState, saveState, recommendTemplates, forwardTest, gapList, scoreBreakdown, reportMarkdown});
})();
