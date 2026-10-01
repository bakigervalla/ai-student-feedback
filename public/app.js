const SENT = {
  positive: { label: "Positive", color: "#16a34a", pill: "bg-green-100 text-green-700", icon: "fa-face-smile" },
  neutral: { label: "Neutral", color: "#d97706", pill: "bg-amber-100 text-amber-700", icon: "fa-face-meh" },
  negative: { label: "Negative", color: "#dc2626", pill: "bg-red-100 text-red-700", icon: "fa-face-frown" },
};
const TABS = {
  professor: [["dashboard", "fa-chart-pie", "Dashboard"], ["list", "fa-comments", "Feedback"], ["about", "fa-cloud", "How it works"]],
  student: [["submit", "fa-pen-to-square", "Give Feedback"], ["about", "fa-cloud", "How it works"]],
};
const RATING_LABELS = ["Click to rate", "Very poor", "Poor", "Okay", "Good", "Excellent"];
const COLORS = ["#0d9488", "#7c3aed", "#2563eb", "#db2777", "#ea580c", "#0891b2", "#65a30d", "#4f46e5"];
const EXAMPLES = [
  { course: "Grid & Cloud Computing", rating: 4, comment: "The labs with Docker were really practical and the professor explains clearly. But the slides are outdated and the last deadline was too short." },
  { course: "Machine Learning", rating: 2, comment: "Lectures are too fast and confusing. We need more examples before the exam, and the materials are hard to follow." },
  { course: "Web Engineering", rating: 5, comment: "Excellent course! Interesting topics, a helpful professor and a very useful final project." },
];

const $ = (id) => document.getElementById(id);
const state = { role: "professor", page: "dashboard", course: "", q: "", listCourse: "", listSentiment: "" };
let feedback = [];
let rating = 0;
let exampleIndex = 0;

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

const stars = (n) => `<span class="stars">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;
const pill = (s) => `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${SENT[s].pill}"><span class="w-1.5 h-1.5 rounded-full bg-current"></span>${SENT[s].label}</span>`;
const average = (list) => (list.length ? list.reduce((a, f) => a + f.rating, 0) / list.length : 0);
const shortDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const colorFor = (n) => COLORS[[...n].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
const courses = () => [...new Set(feedback.map((f) => f.course))].sort();

function avatar(f, size = "w-7 h-7") {
  const anon = f.name === "Anonymous";
  return `<span class="${size} shrink-0 rounded-full grid place-items-center text-white text-[10px] font-bold" style="background:${anon ? "#94a3b8" : colorFor(f.name)}">${anon ? "?" : escapeHtml(initials(f.name))}</span>`;
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.remove("opacity-0");
  clearTimeout(el.timer);
  el.timer = setTimeout(() => el.classList.add("opacity-0"), 2600);
}

async function api(path, body) {
  const res = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "The server did not answer. Try again in a moment.");
  return data;
}

async function loadFeedback() {
  try {
    feedback = await api("/api/feedback");
  } catch (err) {
    toast(err.message);
  }
}

function render() {
  document.querySelectorAll("#roleSwitch button").forEach((b) => {
    const on = b.dataset.role === state.role;
    b.classList.toggle("bg-teal-600", on);
    b.classList.toggle("text-white", on);
  });
  $("avatar").textContent = state.role === "professor" ? "AB" : "ST";
  $("appName").textContent = state.role === "professor" ? "Professor Console" : "Student Portal";

  const tabs = TABS[state.role];
  if (!tabs.some(([id]) => id === state.page)) state.page = tabs[0][0];
  $("tabs").innerHTML = tabs.map(([id, icon, label]) => `
    <button data-tab="${id}" class="flex items-center gap-1.5 px-3 whitespace-nowrap border-b-2 ${state.page === id ? "border-teal-600 text-teal-700 font-semibold" : "border-transparent text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900"}">
      <i class="fa-solid ${icon}"></i> ${label}${id === "list" ? ` <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 rounded-full">${feedback.length}</span>` : ""}
    </button>`).join("");
  document.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => go(b.dataset.tab)));

  document.querySelectorAll("[data-page]").forEach((el) => el.classList.toggle("hidden", el.dataset.page !== state.page));
  if (state.page === "dashboard") renderDashboard();
  if (state.page === "list") renderList();
}

function go(page) {
  state.page = page;
  document.querySelector("main").scrollTop = 0;
  render();
}

function renderDashboard() {
  const list = feedback.filter((f) => !state.course || f.course === state.course);
  const count = (s) => list.filter((f) => f.ai.sentiment === s).length;
  const avg = average(list);

  $("courseFilter").innerHTML = `<option value="">All courses</option>` +
    courses().map((c) => `<option ${c === state.course ? "selected" : ""}>${escapeHtml(c)}</option>`).join("");
  $("courseCount").textContent = state.course || `${courses().length} courses`;

  $("kpiTotal").textContent = list.length;
  $("kpiWeek").textContent = `+${list.filter((f) => Date.now() - new Date(f.date) < 7 * 864e5).length} in the last 7 days`;
  $("kpiAvg").textContent = avg.toFixed(1);
  $("kpiStars").innerHTML = stars(Math.round(avg));
  $("kpiPositive").textContent = `${list.length ? Math.round((count("positive") / list.length) * 100) : 0}%`;
  $("kpiNegative").textContent = count("negative");

  if (!$("report").dataset.filled) {
    $("report").innerHTML = `<p class="font-bold text-violet-600 text-[10px] uppercase tracking-wide mb-1"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i>AI summary · ${escapeHtml(state.course || "all courses")}</p>
      Click <b>Generate AI report</b> and AI will read ${list.length} comments and write what students like, what they complain about and what to improve.`;
  }

  const ranked = courses().map((c) => {
    const items = feedback.filter((f) => f.course === c);
    return { c, items, avg: average(items) };
  }).sort((a, b) => b.avg - a.avg);
  $("byCourse").innerHTML = ranked.map(({ c, items, avg: a }) => `
    <button data-course="${escapeHtml(c)}" class="w-full grid grid-cols-[150px_1fr_70px] items-center gap-2.5 py-1.5 px-1 rounded text-left hover:bg-slate-50 ${state.course === c ? "bg-teal-50" : ""}">
      <span class="font-semibold truncate">${escapeHtml(c)}</span>
      <span class="flex h-2 rounded bg-slate-100 overflow-hidden">${Object.keys(SENT).map((s) => `<span style="width:${(items.filter((f) => f.ai.sentiment === s).length / items.length) * 100}%;background:${SENT[s].color}"></span>`).join("")}</span>
      <span class="text-right text-[11px]">${stars(Math.round(a))}</span>
    </button>`).join("");
  document.querySelectorAll("[data-course]").forEach((b) => (b.onclick = () => setCourse(state.course === b.dataset.course ? "" : b.dataset.course)));

  $("donut").innerHTML = donut(Object.keys(SENT).map((s) => ({ v: count(s), c: SENT[s].color })), list.length) +
    `<div class="flex-1 text-[11.5px]">${Object.keys(SENT).map((s) => `
      <div class="flex items-center gap-2 py-1 text-slate-600"><span class="w-2.5 h-2.5 rounded-sm" style="background:${SENT[s].color}"></span><i class="fa-regular ${SENT[s].icon}"></i>${SENT[s].label}<b class="ml-auto text-slate-800">${count(s)}</b></div>`).join("")}</div>`;

  const topics = {};
  list.forEach((f) => f.ai.topics.forEach((t) => {
    topics[t] ??= { n: 0, pos: 0, neg: 0 };
    topics[t].n++;
    if (f.ai.sentiment === "positive") topics[t].pos++;
    if (f.ai.sentiment === "negative") topics[t].neg++;
  }));
  const top = Object.entries(topics).sort((a, b) => b[1].n - a[1].n).slice(0, 7);
  $("topics").innerHTML = top.map(([t, v]) => `
    <div class="grid grid-cols-[100px_1fr_28px] items-center gap-2 py-1 text-[11.5px]">
      <span class="truncate">${escapeHtml(t)}</span>
      <span class="h-[7px] rounded bg-slate-100 overflow-hidden"><span class="block h-full rounded ${v.neg > v.pos ? "bg-red-500" : "bg-teal-500"}" style="width:${(v.n / top[0][1].n) * 100}%"></span></span>
      <b class="text-right">${v.n}</b>
    </div>`).join("") || `<p class="text-slate-400">No topics yet.</p>`;

  $("latest").innerHTML = list.slice(0, 5).map(feedItem).join("") || `<p class="text-slate-400 py-6 text-center">No feedback yet.</p>`;
  bindOpen();
}

function donut(segments, total, size = 120) {
  const r = size / 2 - 12, C = 2 * Math.PI * r, sum = segments.reduce((a, s) => a + s.v, 0) || 1;
  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.v / sum) * C;
    const arc = `<circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="${s.c}" stroke-width="16" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${size / 2} ${size / 2})"/>`;
    offset += len;
    return arc;
  }).join("");
  return `<svg width="${size}" height="${size}" class="shrink-0" role="img" aria-label="${total} responses"><circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="#f1f5f9" stroke-width="16"/>${arcs}
    <text x="50%" y="48%" text-anchor="middle" font-size="20" font-weight="800" fill="#0f172a">${total}</text>
    <text x="50%" y="63%" text-anchor="middle" font-size="9.5" fill="#64748b">responses</text></svg>`;
}

function ring(score, color, label, size = 72) {
  const r = size / 2 - 6, C = 2 * Math.PI * r, pct = Math.round(((score + 1) / 2) * 100);
  return `<div class="relative shrink-0" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}"><circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="#f1f5f9" stroke-width="7"/>
    <circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C * pct) / 100} ${C}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>
    <span class="absolute inset-0 grid place-items-center text-xl" style="color:${color}"><i class="fa-regular ${label}"></i></span></div>`;
}

function feedItem(f) {
  return `<div data-open="${f.id}" class="flex gap-2.5 py-2.5 border-b border-slate-100 last:border-0 cursor-pointer group">
    ${avatar(f)}
    <div class="min-w-0"><p class="text-[12.5px] leading-snug text-slate-700 group-hover:text-teal-700">${escapeHtml(f.comment)}</p>
    <p class="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">${stars(f.rating)} ${pill(f.ai.sentiment)} <span>${escapeHtml(f.course)} · ${escapeHtml(f.name)} · ${shortDate(f.date)}</span></p></div>
  </div>`;
}

function setCourse(course) {
  state.course = course;
  delete $("report").dataset.filled;
  renderDashboard();
}

async function generateReport() {
  const btn = $("reportBtn");
  btn.disabled = true;
  $("report").dataset.filled = "1";
  $("report").innerHTML = `<div class="flex items-center gap-2.5 text-violet-600 font-semibold py-2"><span class="dots"><span></span><span></span><span></span></span> AI is reading the feedback…</div>`;
  try {
    const s = await api("/api/summary", { course: state.course });
    $("report").innerHTML = `
      <p class="font-bold text-violet-600 text-[10px] uppercase tracking-wide mb-1"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i>AI summary · ${escapeHtml(state.course || "all courses")}</p>
      <p>${escapeHtml(s.summary)}</p>
      <div class="grid sm:grid-cols-2 gap-3 mt-2.5">
        <div><p class="font-bold text-green-700 mb-1"><i class="fa-solid fa-thumbs-up mr-1"></i>Strengths</p><ul class="list-disc ml-4.5 space-y-0.5">${s.strengths.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
        <div><p class="font-bold text-red-700 mb-1"><i class="fa-solid fa-screwdriver-wrench mr-1"></i>To improve</p><ul class="list-disc ml-4.5 space-y-0.5">${s.improvements.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
      </div>`;
    toast("AI report generated");
  } catch (err) {
    $("report").innerHTML = `<p class="text-red-600 font-semibold">${escapeHtml(err.message)}</p>`;
  } finally {
    btn.disabled = false;
  }
}

function renderList() {
  const q = state.q.trim().toLowerCase();
  const list = feedback.filter((f) =>
    (!state.listCourse || f.course === state.listCourse) &&
    (!state.listSentiment || f.ai.sentiment === state.listSentiment) &&
    (!q || `${f.comment} ${f.course} ${f.ai.topics.join(" ")}`.toLowerCase().includes(q)));

  $("search").value = state.q;
  $("listCourse").innerHTML = `<option value="">All courses</option>` +
    courses().map((c) => `<option ${c === state.listCourse ? "selected" : ""}>${escapeHtml(c)}</option>`).join("");
  $("listSentiment").value = state.listSentiment;
  $("listMeta").textContent = `${list.length} of ${feedback.length} comments · sentiment & topics detected by AI`;

  $("rows").innerHTML = list.map((f) => `
    <tr data-open="${f.id}" class="border-t border-slate-100 cursor-pointer hover:bg-teal-50">
      <td class="px-3 py-2"><span class="flex items-center gap-2 font-semibold">${avatar(f, "w-6 h-6")}${escapeHtml(f.name)}</span></td>
      <td class="px-3 py-2 whitespace-nowrap">${escapeHtml(f.course)}</td>
      <td class="px-3 py-2">${stars(f.rating)}</td>
      <td class="px-3 py-2 max-w-[340px] truncate text-slate-600">${escapeHtml(f.comment)}</td>
      <td class="px-3 py-2">${pill(f.ai.sentiment)}</td>
      <td class="px-3 py-2">${f.ai.topics.slice(0, 2).map((t) => `<span class="inline-block px-2 py-0.5 mr-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">${escapeHtml(t)}</span>`).join("")}</td>
      <td class="px-3 py-2 whitespace-nowrap text-slate-500">${shortDate(f.date)}</td>
    </tr>`).join("") || `<tr><td colspan="7" class="text-center text-slate-500 py-10">No feedback matches your filters.</td></tr>`;
  bindOpen();
}

function bindOpen() {
  document.querySelectorAll("[data-open]").forEach((el) => (el.onclick = () => openDrawer(Number(el.dataset.open))));
}

function analysisHtml(ai) {
  const s = SENT[ai.sentiment] || SENT.neutral;
  const score = Number(ai.score) || 0;
  return `
    <div class="flex items-center gap-4 mb-3.5">
      ${ring(score, s.color, s.icon)}
      <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center text-xs">
        <span class="text-slate-500">Sentiment</span><span>${pill(ai.sentiment)}</span>
        <span class="text-slate-500">Score</span><span class="font-mono">${score > 0 ? "+" : ""}${score.toFixed(2)} <span class="text-slate-400">(-1 … +1)</span></span>
        <span class="text-slate-500">Tone check</span><span><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-700"><i class="fa-solid fa-check"></i> Respectful</span></span>
      </div>
    </div>
    <h4 class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mt-3 mb-1.5">Detected topics</h4>
    <div class="flex flex-wrap gap-1.5">${ai.topics.map((t) => `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-700">${escapeHtml(t)}</span>`).join("")}</div>
    <h4 class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mt-3.5 mb-1.5">Summary for the professor</h4>
    <div class="rounded-lg border border-slate-200 bg-gradient-to-br from-violet-50 to-teal-50 p-3 text-[12.5px] leading-relaxed text-slate-700">${escapeHtml(ai.summary)}</div>
    <h4 class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mt-3.5 mb-1.5">Suggested improvement</h4>
    <div class="rounded-lg border border-slate-200 bg-violet-50 p-3 text-[12.5px] leading-relaxed text-slate-700"><i class="fa-solid fa-lightbulb text-amber-500 mr-1.5"></i>${escapeHtml(ai.suggestion)}</div>`;
}

function openDrawer(id) {
  const f = feedback.find((x) => x.id === id);
  if (!f) return;
  $("drawer").innerHTML = `
    <div class="px-4 py-3.5 border-b border-slate-200 flex items-center gap-2.5">
      ${avatar(f)}
      <div class="flex-1"><p class="font-bold text-sm">${escapeHtml(f.name)}</p><p class="text-[11px] text-slate-500">${escapeHtml(f.course)} · ${shortDate(f.date)}</p></div>
      <button id="closeDrawer" aria-label="Close" class="w-7 h-7 rounded-md border border-slate-300 hover:bg-slate-50"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="p-4 overflow-auto flex-1">
      ${stars(f.rating)}
      <blockquote class="my-3 text-[13.5px] leading-relaxed bg-slate-50 border-l-3 border-teal-500 px-3.5 py-3 rounded-r-md">“${escapeHtml(f.comment)}”</blockquote>
      <h3 class="font-extrabold text-[15px] mt-4 mb-3"><i class="fa-solid fa-wand-magic-sparkles text-violet-600 mr-1"></i> AI analysis</h3>
      ${analysisHtml(f.ai)}
    </div>`;
  $("drawer").classList.remove("translate-x-full");
  $("scrim").classList.remove("hidden");
  $("closeDrawer").onclick = closeDrawer;
}

function closeDrawer() {
  $("drawer").classList.add("translate-x-full");
  $("scrim").classList.add("hidden");
}

function setRating(value) {
  rating = value;
  document.querySelectorAll("#stars button").forEach((b) => b.classList.toggle("text-amber-400", Number(b.dataset.value) <= rating));
  $("ratingLabel").textContent = RATING_LABELS[rating];
}

function showAnalysisPlaceholder() {
  $("analysis").innerHTML = `
    <div class="border-[1.5px] border-dashed border-slate-300 rounded-lg px-4 py-8 text-center text-slate-500 leading-relaxed">
      <i class="fa-solid fa-robot text-3xl text-slate-400 mb-2"></i><br>
      Rate the course, write a comment and click <b>Submit & analyse with AI</b>.<br>
      <span class="text-[11.5px]">The AI detects the sentiment, finds the topics, checks the tone and writes a summary for the professor.</span>
    </div>`;
}

function formError(message) {
  $("formError").textContent = message;
  $("formError").classList.toggle("hidden", !message);
}

async function submitFeedback(e) {
  e.preventDefault();
  if (!rating) return formError("Choose a rating from 1 to 5 stars.");
  if ($("comment").value.trim().length < 5) return formError("Write a few words about the course.");
  formError("");

  const btn = $("submitBtn");
  btn.disabled = true;
  $("analysis").innerHTML = `<div class="flex items-center justify-center gap-2.5 text-violet-600 font-semibold py-10"><span class="dots"><span></span><span></span><span></span></span> AI is reading your feedback…</div>`;
  try {
    const item = await api("/api/feedback", { ...Object.fromEntries(new FormData($("form"))), rating });
    feedback.unshift(item);
    $("analysis").innerHTML = analysisHtml(item.ai) + `
      <div class="mt-3.5 rounded-lg bg-green-50 border border-green-200 p-3.5 text-[12.5px]">
        <b class="text-green-700"><i class="fa-solid fa-circle-check mr-1"></i>Feedback submitted!</b>
        Thank you. Your feedback for ${escapeHtml(item.course)} was saved and will be shown to the professor.
      </div>`;
    $("form").reset();
    setRating(0);
    $("counter").textContent = "0/1000";
    toast("Feedback submitted · analysed by AI");
  } catch (err) {
    $("analysis").innerHTML = `
      <div class="rounded-lg bg-red-50 border border-red-200 p-3.5 text-[12.5px]">
        <b class="text-red-700"><i class="fa-solid fa-ban mr-1"></i>Feedback not saved</b>
        <p class="mt-1">${escapeHtml(err.message)}</p>
      </div>`;
  } finally {
    btn.disabled = false;
  }
}

function fillExample() {
  const ex = EXAMPLES[exampleIndex++ % EXAMPLES.length];
  $("form").course.value = ex.course;
  $("comment").value = ex.comment;
  $("counter").textContent = `${ex.comment.length}/1000`;
  setRating(ex.rating);
  formError("");
}

async function loadStatus() {
  try {
    const s = await api("/api/status");
    $("footerModel").textContent = `(${s.model})`;
    $("modelName").textContent = s.model;
    $("footerStatus").innerHTML = s.aiReady
      ? `<i class="fa-solid fa-circle text-green-600 text-[8px] mr-1"></i>Online · AI ready`
      : `<i class="fa-solid fa-circle text-amber-500 text-[8px] mr-1"></i>Online · OpenAI key missing on the server`;
  } catch {
    $("footerStatus").innerHTML = `<i class="fa-solid fa-circle text-red-600 text-[8px] mr-1"></i>Server offline`;
  }
}

$("roleSwitch").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  state.role = b.dataset.role;
  state.page = TABS[state.role][0][0];
  closeDrawer();
  render();
  toast(state.role === "professor" ? "Switched to the professor view" : "Switched to the student view");
};
$("globalSearch").onkeydown = (e) => {
  if (e.key !== "Enter") return;
  state.role = "professor";
  state.q = e.target.value;
  e.target.value = "";
  e.target.blur();
  go("list");
};
$("courseFilter").onchange = (e) => setCourse(e.target.value);
$("reportBtn").onclick = generateReport;
$("search").oninput = (e) => { state.q = e.target.value; renderList(); $("search").focus(); };
$("listCourse").onchange = (e) => { state.listCourse = e.target.value; renderList(); };
$("listSentiment").onchange = (e) => { state.listSentiment = e.target.value; renderList(); };
document.querySelectorAll("#stars button").forEach((b) => (b.onclick = () => { setRating(Number(b.dataset.value)); formError(""); }));
$("comment").oninput = (e) => ($("counter").textContent = `${e.target.value.length}/1000`);
$("form").onsubmit = submitFeedback;
$("exampleBtn").onclick = fillExample;
$("scrim").onclick = closeDrawer;
document.addEventListener("keydown", (e) => e.key === "Escape" && closeDrawer());

showAnalysisPlaceholder();
loadStatus();
loadFeedback().then(render);
