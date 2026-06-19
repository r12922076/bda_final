(function(){
  const fmt = new Intl.NumberFormat("en-US");
  const money = new Intl.NumberFormat("en-US", {style:"currency", currency:"USD", maximumFractionDigits:0});
  function esc(x){
    return String(x ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
  }
  function slug(x){ return String(x||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }
  function badge(text, tone="neutral"){
    return `<span class="badge ${tone}">${esc(text)}</span>`;
  }
  function routeButton(label, route, cls="primary"){
    return `<a class="btn ${cls}" href="#/${route}">${esc(label)}</a>`;
  }
  function card(title, body, cls=""){
    return `<article class="card ${cls}"><h3>${esc(title)}</h3>${body}</article>`;
  }
  function table(rows, cols, empty="No rows to display."){
    if(!rows || !rows.length) return `<div class="empty">${esc(empty)}</div>`;
    return `<div class="table-wrap"><table><thead><tr>${cols.map(c=>`<th>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td class="${c.small?'small':''}">${c.render?c.render(r):esc(r[c.key])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  function metric(label, value, sub=""){
    return `<div class="metric-card"><div class="metric-label">${esc(label)}</div><div class="metric-value">${esc(value)}</div><div class="metric-sub">${esc(sub)}</div></div>`;
  }
  function progress(label, value, max=100){
    const pct = Math.max(0, Math.min(100, Math.round(value/max*100)));
    return `<div class="progress-row"><div class="progress-head"><strong>${esc(label)}</strong><span>${esc(value)} / ${esc(max)}</span></div><div class="bar"><span style="width:${pct}%"></span></div></div>`;
  }
  function downloadText(filename, content, type="text/plain"){
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 500);
  }
  function csvFromRows(rows){
    if(!rows || !rows.length) return "";
    const keys = Object.keys(rows[0]);
    const cell = v => `"${String(v ?? "").replace(/"/g,'""')}"`;
    return [keys.join(","), ...rows.map(r=>keys.map(k=>cell(r[k])).join(","))].join("\n");
  }
  function parseCsv(text){
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if(!lines.length) return [];
    const parseLine = line => {
      const out=[]; let cur="", q=false;
      for(let i=0;i<line.length;i++){
        const ch=line[i];
        if(ch==='"' && line[i+1]==='"'){cur+='"'; i++;}
        else if(ch==='"'){q=!q;}
        else if(ch===',' && !q){out.push(cur); cur="";}
        else cur+=ch;
      }
      out.push(cur); return out;
    };
    const headers=parseLine(lines[0]).map(h=>h.trim());
    return lines.slice(1).map(line=>{
      const vals=parseLine(line); const obj={};
      headers.forEach((h,i)=>obj[h]=vals[i] ?? ""); return obj;
    });
  }
  function copyText(text){
    return navigator.clipboard?.writeText(text).catch(()=>{
      const ta=document.createElement("textarea"); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    });
  }
  window.PG = Object.assign(window.PG || {}, {fmt,money,esc,slug,badge,routeButton,card,table,metric,progress,downloadText,csvFromRows,parseCsv,copyText});
})();
