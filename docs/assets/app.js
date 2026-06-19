(function(){
  const app = document.getElementById("app");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("navlinks");
  let DATA = null;
  let state = PG.loadState();
  let charts = [];
  const samplePayload = {
    strategy_id: "T001",
    symbol: "AAPL",
    signal: "BUY",
    price: 192.40,
    timestamp: "2026-06-19T09:30:00Z",
    timeframe: "1h",
    message: "BUY alert fired for AAPL"
  };
  function save(partial={}){ state = {...state, ...partial}; PG.saveState(state); }
  function setNested(group, key, val){ state[group][key]=val; PG.saveState(state); }
  function destroyCharts(){ charts.forEach(c=>{try{c.destroy()}catch{}}); charts=[]; }
  function byId(id){ return document.getElementById(id); }
  function setText(id, text){ const el = byId(id); if(el) el.textContent = text; }
  function on(id, event, handler){ const el = byId(id); if(el) el.addEventListener(event, handler); }
  function makeChart(canvas, type, labels, datasets, options={}){
    if(!canvas || !window.Chart) return;
    const chart = new Chart(canvas, {type, data:{labels,datasets}, options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:true}}, ...options}});
    charts.push(chart); return chart;
  }
  function shell(title, subtitle, body, actions=""){
    destroyCharts();
    app.innerHTML = `<section class="page-head"><div><div class="eyebrow">PineGuard static product demo</div><h1>${PG.esc(title)}</h1><p>${PG.esc(subtitle)}</p></div><div class="page-actions">${actions}</div></section>${body}`;
    bindCommon();
  }
  function bindCommon(){ if(navLinks) navLinks.classList.remove("open"); }
  if(navToggle && navLinks) navToggle.addEventListener("click", ()=> navLinks.classList.toggle("open"));
  if(navLinks) navLinks.addEventListener("click", ()=> navLinks.classList.remove("open"));

  function getComputed(){
    const ft = PG.forwardTest(DATA.alerts, DATA.prices, Number(state.horizon));
    const recs = PG.recommendTemplates(DATA, state.style, state.persona);
    const breakdown = PG.scoreBreakdown(state, ft);
    return {ft,recs,breakdown};
  }

  function home(){
    const {ft, breakdown} = getComputed();
    const body = `
      <section class="hero-product">
        <div class="hero-copy">
          <span class="pill">Static GitHub Pages deployment · Browser-side analytics</span>
          <h2>Turn TradingView strategy workflow data into evidence-backed health reports.</h2>
          <p>PineGuard is a data-monetization prototype for paid TradingView power users. It does not sell trading signals. It sells validation structure around alerts, strategy metadata, forward-test outcomes, and public evidence.</p>
          <div class="actions">${PG.routeButton("Start Strategy Health Check", "health-check", "primary")}${PG.routeButton("View Sample Report", "report", "secondary")}${PG.routeButton("Explore Demand Evidence", "evidence", "ghost")}</div>
        </div>
        <div class="hero-panel">
          <div class="score-ring"><span>${breakdown.total}</span><small>/100</small></div>
          <h3>Current sample health score</h3>
          <p>Computed from static alert events, selected profile inputs, strategy templates, and workflow gap rules.</p>
          <div class="mini-grid">${PG.metric("Alerts", DATA.alerts.length, "snapshot")}${PG.metric("Evidence rows", DATA.evidence.length, "public traces")}</div>
        </div>
      </section>
      <section class="grid four problem-grid">
        ${PG.card("Repainting risk", `<p>Historical and realtime behavior can diverge. PineGuard flags missing review steps.</p><span class="mini-link">Health Check module</span>`)}
        ${PG.card("Backtest realism", `<p>Commission, slippage, and order assumptions affect whether Strategy Tester evidence is credible.</p><span class="mini-link">Risk flags</span>`)}
        ${PG.card("Alert observability", `<p>TradingView alerts become monetizable event data when logged, attributed, and monitored.</p><span class="mini-link">Forward-Test Monitor</span>`)}
        ${PG.card("Paid-script trust", `<p>Invite-only and paid scripts need credibility reports based on observed behavior rather than claims.</p><span class="mini-link">Expansion product</span>`)}
      </section>
      <section class="card wide"><h2>How the demo works</h2><div class="steps">
        <div><strong>1</strong><span>Choose user profile</span></div><div><strong>2</strong><span>Declare available workflow data</span></div><div><strong>3</strong><span>Generate gap diagnosis</span></div><div><strong>4</strong><span>Inspect alert outcomes</span></div><div><strong>5</strong><span>Download report</span></div>
      </div></section>
      <section class="grid three">
        ${PG.card("Product output", `<p>The paid artifact is a strategy health report, not a buy/sell signal.</p>${PG.routeButton("Open report", "report", "link")}`)}
        ${PG.card("Evidence-backed demand", `<p>Official docs, public pain signals, and competitor benchmarks are structured into an evidence explorer.</p>${PG.routeButton("Open evidence", "evidence", "link")}`)}
        ${PG.card("Big-data architecture", `<p>The course site is static. The production design uses webhook ingestion, queues, storage, and scheduled recomputation.</p>${PG.routeButton("Open architecture", "architecture", "link")}`)}
      </section>`;
    shell("TradingView Strategy Validation Layer", "A static single-page product demo for monetizing strategy-workflow data.", body);
  }

  function healthCheck(){
    const step = Number(state.step || 1);
    const stepper = ["Persona","Strategy","Data","Risks","Generate"].map((s,i)=>`<button class="step ${step===i+1?'active':''}" data-step="${i+1}"><strong>${i+1}</strong><span>${s}</span></button>`).join("");
    let content="";
    if(step===1){
      content = `<h2>Step 1 · Select the user type</h2><p class="muted">This determines the recommended entry product and the risk checks.</p><div class="persona-grid">${PG.personas.map(p=>`<button class="persona-card ${state.persona===p.id?'selected':''}" data-persona="${p.id}"><h3>${PG.esc(p.name)}</h3><p>${PG.esc(p.pain)}</p>${PG.badge(p.product,"blue")}</button>`).join("")}</div>`;
    } else if(step===2){
      content = `<h2>Step 2 · Strategy profile</h2><div class="form-grid">
        <label>Trading style<select id="f-style">${["Trend following","Breakout","Mean reversion","ETF rotation","Paid script due diligence","Not sure"].map(x=>`<option ${state.style===x?'selected':''}>${x}</option>`).join("")}</select></label>
        <label>Market<select id="f-market">${["Crypto","US equities","FX","Futures","ETFs","Multi-asset"].map(x=>`<option ${state.market===x?'selected':''}>${x}</option>`).join("")}</select></label>
        <label>Risk tolerance<select id="f-risk">${["Low","Medium","High"].map(x=>`<option ${state.risk===x?'selected':''}>${x}</option>`).join("")}</select></label>
        <label>Forward-test horizon <span id="h-label">${state.horizon}</span> bars<input id="f-horizon" type="range" min="1" max="20" value="${state.horizon}"></label>
      </div>`;
    } else if(step===3){
      const items = [
        ["alert_logs","I have TradingView alert logs"],["strategy_tester","I have Strategy Tester results"],["request_security","I know whether multi-timeframe/request.security logic is used"],["commission_slippage","Commission/slippage assumptions are specified"],["forward_records","I have live or paper forward-test records"],["version_history","I have version history of the script"],["webhook_payload","I have webhook payload examples"]
      ];
      content = `<h2>Step 3 · Available workflow data</h2><p class="muted">PineGuard monetizes the structure around these data traces. Missing items become report risks.</p><div class="check-grid">${items.map(([k,l])=>`<label class="toggle-row"><input type="checkbox" data-data="${k}" ${state.data[k]?'checked':''}><span>${PG.esc(l)}</span></label>`).join("")}</div>`;
    } else if(step===4){
      content = `<h2>Step 4 · Main concerns</h2><p class="muted">Select the concerns the user wants PineGuard to diagnose.</p><div class="check-grid">${Object.entries(PG.concerns).map(([k,l])=>`<label class="toggle-row"><input type="checkbox" data-concern="${k}" ${state.concerns[k]?'checked':''}><span>${PG.esc(l)}</span></label>`).join("")}</div>`;
    } else {
      const {ft,recs,breakdown}=getComputed();
      content = `<h2>Step 5 · Ready to generate</h2><div class="grid two"><div class="card soft"><h3>Profile summary</h3><p><strong>${PG.esc(state.style)}</strong> · ${PG.esc(state.market)} · ${PG.esc(state.risk)} risk · ${state.horizon}-bar horizon</p><p>${ft.length} alert events will be evaluated. ${recs.length} templates are recommended.</p></div><div class="card soft"><h3>Estimated health score</h3><div class="score-large">${breakdown.total}<span>/100</span></div></div></div><div class="actions mt">${PG.routeButton("Generate Diagnosis", "diagnosis", "primary")}${PG.routeButton("Open Forward-Test Monitor", "monitor", "secondary")}</div>`;
    }
    const body = `<section class="wizard-layout"><aside class="stepper">${stepper}</aside><div class="card wizard-card">${content}<div class="wizard-actions"><button class="btn secondary" id="prev-step" ${step<=1?'disabled':''}>Back</button><button class="btn primary" id="next-step" ${step>=5?'disabled':''}>Continue</button></div></div></section>`;
    shell("Strategy Health Check", "Walk through a product-style onboarding flow instead of a flat dashboard.", body, PG.routeButton("View sample report", "report", "secondary"));
    document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{save({step:Number(b.dataset.step)}); healthCheck();});
    document.querySelectorAll("[data-persona]").forEach(b=>b.onclick=()=>{save({persona:b.dataset.persona, step:2}); healthCheck();});
    ["f-style","f-market","f-risk"].forEach(id=>{const el=byId(id); if(el) el.oninput=()=>{save({[id.replace('f-','')]:el.value});};});
    const hz=byId("f-horizon"); if(hz) hz.oninput=()=>{setText("h-label", hz.value); save({horizon:Number(hz.value)});};
    document.querySelectorAll("[data-data]").forEach(ch=>ch.oninput=()=>{setNested("data", ch.dataset.data, ch.checked);});
    document.querySelectorAll("[data-concern]").forEach(ch=>ch.oninput=()=>{setNested("concerns", ch.dataset.concern, ch.checked);});
    on("prev-step", "click", ()=>{save({step:Math.max(1, step-1)}); healthCheck();});
    on("next-step", "click", ()=>{save({step:Math.min(5, step+1)}); healthCheck();});
  }

  function diagnosis(){
    const {ft,recs,breakdown}=getComputed();
    const missing = breakdown.gaps.filter(g=>!g.ok);
    const body = `<section class="grid score-layout"><div class="card score-card"><div class="score-ring big"><span>${breakdown.total}</span><small>/100</small></div><h2>Strategy Health Score</h2><p class="muted">Workflow completeness score, not performance prediction.</p><div class="actions centered">${PG.routeButton("Generate Full Report", "report", "primary")}${PG.routeButton("Open Monitor", "monitor", "secondary")}</div></div><div class="card"><h2>Score breakdown</h2>${Object.entries(breakdown.categories).map(([k,v])=>PG.progress(k, v.score, v.max)).join("")}</div></section>
      <section class="grid two"><div class="card"><h2>Missing or weak components</h2><div class="checklist">${missing.length?missing.map(g=>`<div class="check"><div><strong>${PG.esc(g.label)}</strong><br><span class="muted">${PG.esc(g.detail)}</span></div>${PG.badge("Fix", "amber")}</div>`).join(""):"<p>No major missing workflow component under this profile.</p>"}</div></div><div class="card"><h2>Recommended next actions</h2><div class="action-list"><a href="#/strategy-profile">Use recommended template library</a><a href="#/monitor">Inspect evaluated alert events</a><a href="#/evidence">Review evidence basis</a><button id="download-diagnosis">Download diagnosis JSON</button></div></div></section>
      <section class="grid three">${recs.map(r=>PG.card(r.name, `<p>${PG.esc(r.description)}</p>${PG.badge(r.revenue_angle,"blue")}`)).join("")}</section>`;
    shell("Diagnosis", "Score breakdown, missing workflow components, and recommended next actions.", body);
    on("download-diagnosis", "click", ()=>PG.downloadText("pineguard_diagnosis.json", JSON.stringify({state, breakdown, missing}, null, 2), "application/json"));
  }

  function strategyProfile(){
    const {recs}=getComputed();
    const all=DATA.templates;
    const cards=all.map(t=>`<article class="template-card ${recs.some(r=>r.template_id===t.template_id)?'recommended':''}"><div class="template-top"><h3>${PG.esc(t.name)}</h3>${PG.badge(t.risk_level, t.risk_level==='High'?'red':t.risk_level==='Low'?'green':'amber')}</div><p>${PG.esc(t.description)}</p><div class="chips"><span>${PG.esc(t.style)}</span><span>${PG.esc(t.market)}</span><span>${PG.esc(t.revenue_angle)}</span></div><button class="btn primary use-template" data-template="${t.template_id}">Use this template</button></article>`).join("");
    shell("Template Library", "Card-based strategy-completion modules make the Pro Completion Plan tangible.", `<section class="template-grid">${cards}</section>`);
    document.querySelectorAll(".use-template").forEach(b=>b.onclick=()=>{save({selectedTemplate:b.dataset.template}); PG.go("diagnosis");});
  }

  function monitor(){
    const {ft}=getComputed();
    const wins=ft.filter(x=>x.outcome==="win").length;
    const avg=ft.length ? ft.reduce((a,x)=>a+x.directional_return,0)/ft.length : 0;
    const sampleCsv = PG.csvFromRows(DATA.alerts.slice(0,8));
    const rows=ft.slice(0,12).map(x=>({timestamp:String(x.timestamp).slice(0,16).replace('T',' '), symbol:x.symbol, signal:x.signal, entry:Number(x.price).toFixed(2), future:x.future_close?Number(x.future_close).toFixed(2):"pending", ret:(100*x.directional_return).toFixed(2)+"%", outcome:x.outcome}));
    const body = `<section class="grid four">${PG.metric("Total alerts", ft.length, "evaluated")}${PG.metric("Win rate", ft.length?(100*wins/ft.length).toFixed(1)+"%":"0%", "directional")}${PG.metric("Avg. return", (100*avg).toFixed(2)+"%", `${state.horizon}-bar horizon`)}${PG.metric("Symbols", new Set(ft.map(x=>x.symbol)).size, "monitored")}</section>
      <section class="card"><h2>Forward-test horizon</h2><div class="button-row">${[1,3,5,10,20].map(h=>`<button class="pill-btn ${Number(state.horizon)===h?'active':''}" data-horizon="${h}">${h} bars</button>`).join("")}</div></section>
      <section class="grid two"><div class="card"><h2>Directional return after alerts</h2><div class="chartbox"><canvas id="monitor-chart"></canvas></div></div><div class="card"><h2>Alert event table</h2>${PG.table(rows,[{key:"timestamp",label:"Time"},{key:"symbol",label:"Symbol"},{key:"signal",label:"Signal"},{key:"entry",label:"Entry"},{key:"future",label:"Future"},{key:"ret",label:"Return"},{key:"outcome",label:"Outcome",render:r=>PG.badge(r.outcome, r.outcome==='win'?'green':r.outcome==='loss'?'red':'neutral')}])}</div></section>
      <section class="grid two"><div class="card"><h2>Local CSV demo</h2><p class="muted">GitHub Pages cannot receive live webhooks, but the browser can parse user-provided CSV files for a static demo.</p><input type="file" id="csv-upload" accept=".csv"><div class="actions mt"><button class="btn secondary" id="download-sample-csv">Download sample alert CSV</button></div><div id="csv-status" class="muted mt"></div></div><div class="card"><h2>Sample webhook payload</h2><pre class="codeblock" id="payload-box">${PG.esc(JSON.stringify(samplePayload,null,2))}</pre><button class="btn primary" id="copy-payload">Copy sample webhook payload</button></div></section>`;
    shell("Forward-Test Monitor", "Evaluate TradingView-style alert events and demonstrate static data ingestion.", body);
    document.querySelectorAll("[data-horizon]").forEach(b=>b.onclick=()=>{save({horizon:Number(b.dataset.horizon)}); monitor();});
    const labels=ft.slice(0,36).map((_,i)=>i+1), vals=ft.slice(0,36).map(x=>+(100*x.directional_return).toFixed(2));
    makeChart(byId("monitor-chart"), "line", labels, [{label:"Directional return (%)", data:vals, tension:.35, borderWidth:2}], {scales:{y:{ticks:{callback:v=>v+"%"}}}});
    on("download-sample-csv", "click", ()=>PG.downloadText("sample_alert_events.csv", sampleCsv, "text/csv"));
    on("copy-payload", "click", ()=>PG.copyText(JSON.stringify(samplePayload,null,2)).then(()=>setText("copy-payload", "Copied")));
    on("csv-upload", "change", e=>{const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{const rows=PG.parseCsv(r.result); setText("csv-status", `Parsed ${rows.length} rows locally. No file was uploaded to a server.`);}; r.readAsText(f);});
  }

  function evidence(){
    const categories=[...new Set(DATA.evidence.map(e=>e.pain_category))].sort();
    const sources=[...new Set(DATA.evidence.map(e=>e.source_type))].sort();
    const currentCat=sessionStorage.getItem("pg_cat") || "all";
    const currentSource=sessionStorage.getItem("pg_source") || "all";
    const rows=DATA.evidence.filter(e=>(currentCat==="all"||e.pain_category===currentCat)&&(currentSource==="all"||e.source_type===currentSource));
    const body = `<section class="grid two"><div class="card"><h2>Evidence filters</h2><div class="form-grid two-cols"><label>Pain category<select id="filter-cat"><option value="all">All categories</option>${categories.map(x=>`<option value="${PG.esc(x)}" ${currentCat===x?'selected':''}>${PG.esc(x)}</option>`).join("")}</select></label><label>Source type<select id="filter-source"><option value="all">All source types</option>${sources.map(x=>`<option value="${PG.esc(x)}" ${currentSource===x?'selected':''}>${PG.esc(x)}</option>`).join("")}</select></label></div><div class="actions mt"><button class="btn secondary" id="strong-only">Show strong evidence</button><button class="btn secondary" id="wtp-only">Show WTP evidence</button><button class="btn primary" id="export-evidence">Export evidence CSV</button></div></div><div class="card"><h2>Evidence summary</h2><div class="grid two mini-metrics">${PG.metric("Visible rows", rows.length, "after filters")}${PG.metric("Total rows", DATA.evidence.length, "snapshot")}</div><div class="chartbox small"><canvas id="evidence-chart"></canvas></div></div></section>
      <section class="evidence-grid">${rows.slice(0,18).map(e=>`<article class="evidence-card"><div>${PG.badge(e.source_type,"blue")} ${PG.badge(e.pain_category,"neutral")}</div><h3>${PG.esc((e.url||"").replace(/^https?:\/\//,'').slice(0,70))}</h3><p>${PG.esc(e.short_evidence || e.why_relevant || "Evidence row")}</p><p class="muted"><strong>How it supports PineGuard:</strong> ${PG.esc(e.why_relevant || "Supports evidence-backed product design.")}</p><a href="${PG.esc(e.url)}" target="_blank" rel="noreferrer">Open source</a></article>`).join("")}</section>`;
    shell("Evidence Explorer", "Filter official docs, public traces, competitor benchmarks, and product-evidence mappings.", body);
    on("filter-cat", "input", e=>{sessionStorage.setItem("pg_cat", e.target.value); evidence();});
    on("filter-source", "input", e=>{sessionStorage.setItem("pg_source", e.target.value); evidence();});
    on("export-evidence", "click", ()=>PG.downloadText("pineguard_evidence_export.csv", PG.csvFromRows(rows), "text/csv"));
    on("strong-only", "click", ()=>{sessionStorage.setItem("pg_source","official_doc"); evidence();});
    on("wtp-only", "click", ()=>{sessionStorage.setItem("pg_source","pricing"); evidence();});
    makeChart(byId("evidence-chart"), "bar", DATA.evidenceCategory.map(x=>x.name), [{label:"Rows", data:DATA.evidenceCategory.map(x=>x.value)}], {plugins:{legend:{display:false}}});
  }

  function report(){
    const {ft,recs,breakdown}=getComputed();
    const markdown=PG.reportMarkdown(DATA,state,ft,recs,breakdown);
    const body = `<section class="report-layout"><aside class="card report-side"><div class="score-ring"><span>${breakdown.total}</span><small>/100</small></div><h3>Report actions</h3><button class="btn primary wide-btn" id="download-md">Download Markdown Report</button><button class="btn secondary wide-btn" id="download-json">Download JSON Report</button><button class="btn secondary wide-btn" id="copy-summary">Copy Executive Summary</button>${PG.routeButton("Start New Health Check", "health-check", "ghost wide-btn")}</aside><article class="paper-report"><h1>PineGuard Strategy Health Report</h1><p class="lead">Generated for ${PG.esc(state.style)} · ${PG.esc(state.market)} · ${PG.esc(state.risk)} risk</p>${Object.entries(breakdown.categories).map(([k,v])=>PG.progress(k,v.score,v.max)).join("")}<h2>Executive summary</h2><p>PineGuard evaluated the selected TradingView-style workflow using static alert logs, market snapshots, strategy templates, and public evidence data. The current health score is <strong>${breakdown.total}/100</strong>. This score measures workflow completeness and evidence quality, not trading profitability.</p><h2>Main risks detected</h2><ul>${breakdown.gaps.filter(g=>!g.ok).map(g=>`<li><strong>${PG.esc(g.label)}:</strong> ${PG.esc(g.detail)}</li>`).join("") || "<li>No major missing workflow components under this profile.</li>"}</ul><h2>Recommended templates</h2><ul>${recs.map(r=>`<li><strong>${PG.esc(r.name)}</strong>: ${PG.esc(r.description)}</li>`).join("")}</ul><h2>Disclaimer</h2><p>This academic prototype is not investment advice and does not execute trades.</p></article></section>`;
    shell("Generated Report", "The concrete paid output PineGuard would monetize.", body);
    on("download-md", "click", ()=>PG.downloadText("pineguard_strategy_health_report.md", markdown, "text/markdown"));
    on("download-json", "click", ()=>PG.downloadText("pineguard_report.json", JSON.stringify({state, breakdown, forward_tests:ft.slice(0,10), recommendations:recs}, null, 2), "application/json"));
    on("copy-summary", "click", ()=>PG.copyText(markdown.split("## Health Score Breakdown")[0]).then(()=>setText("copy-summary", "Copied")));
  }

  function pricing(){
    const plans=[
      ["Strategy Health Check","$19–$49 one-time","User evaluating one strategy","Repainting/backtest/alert checklist; downloadable report","Does not include execution or investment advice"],
      ["Forward-Test Monitor","$19–$39 / month","Alert-heavy users","Alert event log, horizon attribution, weekly report","High-frequency users require separate pricing"],
      ["Pro Completion Plan","$39–$79 / month","Users building/refining strategies","Template library, missing-rule diagnosis, report history","Still validation-first, not signal generation"],
      ["Creator Trust Report","Later expansion","Creators with sufficient live history","Credibility report and evidence basis","Weaker evidence; expansion product only"]
    ];
    shell("Pricing and Revenue Funnel", "SaaS-style packaging connects product outputs to willingness-to-pay benchmarks.", `<section class="pricing-grid">${plans.map(p=>`<article class="price-card"><h3>${p[0]}</h3><div class="price">${p[1]}</div><p><strong>For:</strong> ${p[2]}</p><p><strong>Includes:</strong> ${p[3]}</p><p class="muted"><strong>Boundary:</strong> ${p[4]}</p></article>`).join("")}</section><section class="card"><h2>Unit economics logic</h2>${PG.table(DATA.scaleEconomics,[{key:"scale",label:"Scale"},{key:"expected_workload",label:"Workload",small:true},{key:"cost_driver",label:"Cost driver",small:true}])}</section>`);
  }

  function architecture(){
    const body = `<section class="grid two"><div class="card"><h2>Course deployment</h2><div class="pipeline"><div>CSV / JSON snapshots</div><div>GitHub Pages</div><div>Browser analytics</div><div>Report preview</div></div><p class="muted">This deployed version intentionally pre-builds data and runs client-side analytics because GitHub Pages is static.</p></div><div class="card"><h2>Production deployment</h2><div class="pipeline production"><div>TradingView webhook</div><div>API endpoint</div><div>Queue</div><div>Workers</div><div>Database / object storage</div><div>Dashboard</div></div><p class="muted">Commercial PineGuard would use consent-based ingestion, durable queues, idempotency, storage, and scheduled recomputation.</p></div></section><section class="card"><h2>Production layers</h2>${PG.table(DATA.productionLayers,[{key:"layer",label:"Layer"},{key:"design",label:"Design",small:true},{key:"why",label:"Why it matters",small:true}])}</section><section class="card"><h2>Prototype-to-production scale path</h2>${PG.table(DATA.scaleEconomics,[{key:"scale",label:"Scale"},{key:"expected_workload",label:"Expected workload",small:true},{key:"architecture_implication",label:"Architecture implication",small:true},{key:"cost_driver",label:"Cost driver",small:true}])}</section>`;
    shell("System Architecture", "Static course artifact plus production event-driven architecture.", body);
  }

  function risk(){
    const riskCards=DATA.riskControls.map(r=>PG.card(r.risk, `<p>${PG.esc(r.control)}</p>${PG.badge("Controlled in prototype","green")}`)).join("");
    shell("Risk, Ethics, and Data Governance", "PineGuard is framed as workflow validation, not investment advice or execution routing.", `<section class="grid three">${riskCards}</section><section class="card"><h2>Evidence interpretation controls</h2>${PG.table(DATA.evidenceQuality,[{key:"evidence_type",label:"Evidence type"},{key:"role",label:"Role",small:true},{key:"interpretation",label:"Conservative interpretation",small:true}])}</section><section class="actions">${PG.routeButton("Open privacy and ethics doc", "docs", "primary")}<button class="btn secondary" id="download-risk">Download risk CSV</button></section>`);
    on("download-risk", "click", ()=>PG.downloadText("pineguard_risk_controls.csv", PG.csvFromRows(DATA.riskControls), "text/csv"));
  }

  function docs(){
    const links=[
      ["Architecture overview","architecture.md","Production and course-deployment architecture."],
      ["Data acquisition methodology","evidence_methodology.md","How evidence rows were collected and coded."],
      ["Data dictionary","data_dictionary.md","Runtime data files and fields."],
      ["Production architecture","production_architecture.md","Webhook, queue, storage, and processing extension."],
      ["Risk register","risk_register.md","Platform, privacy, and investment-advice controls."],
      ["Rubric mapping","rubric_mapping.md","Where each assignment requirement is satisfied."],
      ["Scale and unit economics","scale_and_unit_economics.md","Prototype-to-production scaling logic."],
      ["GitHub Pages instructions","README_GITHUB_PAGES.md","Deployment and local preview steps."]
    ];
    shell("Documentation Hub", "All supporting files are reachable from the website, so the grader does not need to hunt through the repository.", `<section class="docs-grid">${links.map(l=>`<a class="doc-card" href="${l[1]}" target="_blank"><h3>${l[0]}</h3><p>${l[2]}</p><span>Open document →</span></a>`).join("")}</section><section class="card"><h2>Static data downloads</h2><div class="download-grid"><a href="./data/pineguard_static_data.json">Combined JSON</a><a href="./data/alert_events_snapshot.csv">Alert events</a><a href="./data/market_prices_snapshot.csv">Market prices</a><a href="./data/strategy_templates.csv">Strategy templates</a><a href="./data/combined_evidence_snapshot.csv">Evidence snapshot</a><a href="./data/competitor_benchmarks.csv">Competitor benchmarks</a></div></section>`);
  }

  async function init(){
    PG.register("home", home); PG.register("health-check", healthCheck); PG.register("diagnosis", diagnosis); PG.register("strategy-profile", strategyProfile); PG.register("monitor", monitor); PG.register("evidence", evidence); PG.register("report", report); PG.register("pricing", pricing); PG.register("architecture", architecture); PG.register("risk", risk); PG.register("docs", docs);
    try {
      const response = await fetch("./data/pineguard_static_data.json");
      DATA = await response.json();
    } catch(err) {
      app.innerHTML=`<pre class="error">Failed to load static data: ${PG.esc(err)}</pre>`;
      return;
    }
    try {
      if(!location.hash) location.hash="#/home";
      PG.render();
    } catch(err) {
      console.error(err);
      app.innerHTML=`<pre class="error">PineGuard loaded its static data, but rendering failed. ${PG.esc(err)}</pre>`;
    }
  }
  init();
})();
