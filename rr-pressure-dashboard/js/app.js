const $ = (s) => document.querySelector(s);
let type = "bat";
const rows = () => (type === "bat" ? BAT : BOWL).map((a, i) => ({
  rank: i + 1, name: a[0], team: a[1], rating: a[2], stab: a[3], balls: a[4],
  n: a[5], p: a[6], w: a[7], dotP: a[8], dotN: a[9], ipl: a[10]
}));

function render() {
  const q = $("#q").value.trim().toLowerCase(), s = $("#sort").value;
  const d = rows().filter(r => (r.name + r.team).toLowerCase().includes(q));
  d.sort((a, b) => s === "rank" ? a.rank - b.rank : s === "rating" ? b.rating - a.rating : s === "stab" ? b.stab - a.stab : b.balls - a.balls);
  const max = Math.max(...rows().map(r => r.rating));
  $("#tbl tbody").innerHTML = d.length ? d.map(r => `
    <tr tabindex="0" data-n="${r.name}">
      <td class="rk">${r.rank}</td>
      <td><b>${r.name}</b></td>
      <td>${r.team}${r.team === "Rajasthan Royals" ? ' <span class="rr">RR</span>' : ""}</td>
      <td><div class="bar"><i style="width:${r.rating / max * 100}%"></i></div><span>${r.rating.toFixed(2)}</span></td>
      <td><span class="pill ${r.stab >= 60 ? "hi" : r.stab >= 45 ? "md" : "lo"}">${r.stab}%</span></td>
      <td>${r.balls}</td></tr>`).join("")
    : `<tr><td colspan="6" class="empty">No player matches "${q}". Clear the search to see all ten.</td></tr>`;
  charts();
}

function charts() {
  const d = rows(), max = Math.max(...d.map(r => r.rating)), bat = type === "bat";
  $("#c1t").textContent = (bat ? "Batter" : "Bowler") + " pressure rating";
  $("#c1").innerHTML = d.map(r => `<div class="hb"><span>${r.name}</span><div><i style="width:${r.rating / max * 100}%"></i></div><b>${r.rating.toFixed(2)}</b></div>`).join("");
  $("#c2t").textContent = (bat ? "Strike rate" : "Economy") + ": normal vs pressure";
  const v = d.flatMap(r => [r.n, r.p]), lo = Math.min(...v) * .97, hi = Math.max(...v) * 1.02;
  const pos = x => ((x - lo) / (hi - lo) * 100).toFixed(1);
  $("#c2").innerHTML = `<div class="legend"><i class="dn"></i>Normal <i class="dp"></i>Pressure (green = better)</div>` + d.map(r => {
    const good = bat ? r.p > r.n : r.p < r.n;
    return `<div class="dm"><span>${r.name}</span><div><u style="left:${pos(Math.min(r.n, r.p))}%;width:${Math.abs(pos(r.p) - pos(r.n))}%"></u><i class="dn" style="left:${pos(r.n)}%"></i><i class="dp ${good ? "g" : ""}" style="left:${pos(r.p)}%"></i></div></div>`;
  }).join("");
}

function detail(name) {
  const r = rows().find(x => x.name === name), bat = type === "bat";
  const diff = r.p - r.n, good = bat ? diff > 0 : diff < 0;
  $("#dbody").innerHTML = `
    <h3>${r.name}</h3><p class="muted">${r.team} · Rank ${r.rank} of 10</p>
    <div class="kv">
      <div><small>Rating</small><b>${r.rating.toFixed(2)}</b></div>
      <div><small>Top-10 stability</small><b>${r.stab}%</b></div>
      <div><small>${bat ? "SR" : "Econ"} normal / pressure</small><b>${r.n} / ${r.p}</b></div>
      <div><small>${bat ? "Times out" : "Wickets"} (pressure)</small><b>${r.w}</b></div>
      <div><small>Dot% pressure / normal</small><b>${r.dotP} / ${r.dotN}</b></div>
      <div><small>IPL share of balls</small><b>${r.ipl}%</b></div>
    </div>
    <p>${bat ? "Scoring rate" : "Economy"} ${good ? "improves" : "slips"} by ${Math.abs(diff).toFixed(1)} under pressure across ${r.balls} pressure balls.${r.ipl === 0 ? " Evidence is T20I only." : ""}</p>`;
  $("#dlg").showModal();
}

document.querySelectorAll(".tab").forEach(b => b.onclick = () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("on"));
  b.classList.add("on"); type = b.dataset.type; render();
});
$("#q").oninput = render; $("#sort").onchange = render;
$("#tbl").addEventListener("click", e => { const t = e.target.closest("tr[data-n]"); if (t) detail(t.dataset.n); });
$("#tbl").addEventListener("keydown", e => { if (e.key === "Enter") { const t = e.target.closest("tr[data-n]"); if (t) detail(t.dataset.n); } });
$("#x").onclick = () => $("#dlg").close();
$("#dlg").addEventListener("click", e => { if (e.target.id === "dlg") e.target.close(); });

$("#bands").innerHTML = BANDS.map(([l, v], i) => `<div class="col"><b>${v}</b><i class="${i === 3 || i === 4 ? "hot" : ""}" style="height:${(v - 30) * 10}%"></i><span>${l}</span></div>`).join("");
$("#fitGrid").innerHTML = FIT.map(([n, t]) => `<article class="card"><h3>${n}</h3><p>${t}</p></article>`).join("");

document.querySelectorAll("[data-count]").forEach(el => {
  const end = +el.dataset.count, dec = +(el.dataset.dec || 0);
  const fmt = x => x.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = fmt(end); return; }
  const t0 = performance.now();
  (function f(t) { const k = Math.min((t - t0) / 1400, 1); el.textContent = fmt(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
});
render();
