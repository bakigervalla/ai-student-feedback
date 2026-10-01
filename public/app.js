const SENTIMENT = {
  positive: { icon: "fa-face-smile", css: "bg-green-100 text-green-700", color: "#16a34a" },
  neutral: { icon: "fa-face-meh", css: "bg-amber-100 text-amber-700", color: "#f59e0b" },
  negative: { icon: "fa-face-frown", css: "bg-red-100 text-red-700", color: "#dc2626" },
};
const RATING_LABELS = ["Click to rate", "Very poor", "Poor", "Okay", "Good", "Excellent"];
const EXAMPLES = [
  { course: "Grid & Cloud Computing", rating: 4, comment: "The labs with Docker were really practical and the professor explains clearly. But the slides are outdated and the last deadline was too short." },
  { course: "Machine Learning", rating: 2, comment: "Lectures are too fast and confusing. We need more examples before the exam, and the materials are hard to follow." },
  { course: "Web Engineering", rating: 5, comment: "Excellent course! Interesting topics, a helpful professor and a very useful final project." },
];

const $ = (id) => document.getElementById(id);
let feedback = [];
let rating = 0;
let exampleIndex = 0;
const charts = {};

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function stars(n) {
  return [1, 2, 3, 4, 5].map((i) => `<i class="fa-solid fa-star ${i <= n ? "text-amber-400" : "text-slate-200"}"></i>`).join("");
}

function sentimentBadge(sentiment) {
  const s = SENTIMENT[sentiment] || SENTIMENT.neutral;
  return `<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${s.css}"><i class="fa-solid ${s.icon} mr-1"></i>${escapeHtml(sentiment)}</span>`;
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.remove("opacity-0");
  clearTimeout(el.timer);
  el.timer = setTimeout(() => el.classList.add("opacity-0"), 2500);
}

async function api(path, body) {
  const res = await fetch(path, body ? {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  } : undefined);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

function showPage() {
  const page = location.hash.slice(1) || "feedback";
  document.querySelectorAll("[data-page]").forEach((el) => el.classList.toggle("hidden", el.dataset.page !== page));
  document.querySelectorAll("[data-nav]").forEach((a) => {
    a.classList.toggle("bg-teal-600", a.dataset.nav === page);
    a.classList.toggle("hover:bg-white/10", a.dataset.nav !== page);
  });
  if (page === "dashboard") loadDashboard();
}

function setRating(value) {
  rating = value;
  document.querySelectorAll("#stars button").forEach((b) => b.classList.toggle("text-amber-400", Number(b.dataset.value) <= rating));
  $("ratingLabel").textContent = RATING_LABELS[rating];
}

function showEmptyResult() {
  $("result").innerHTML = `
    <div class="text-center text-slate-400 py-12">
      <i class="fa-solid fa-robot text-5xl mb-4"></i>
      <p class="font-semibold text-slate-500">AI analysis will appear here</p>
      <p class="text-sm mt-1">Sentiment · topics · summary · suggested improvement</p>
    </div>`;
}

function showResult(item) {
  $("result").innerHTML = `
    <h2 class="text-lg font-bold mb-4"><i class="fa-solid fa-wand-magic-sparkles text-violet-600 mr-1"></i> AI analysis</h2>
    <div class="flex flex-wrap items-center gap-2 mb-5">
      ${sentimentBadge(item.ai.sentiment)}
      ${item.ai.topics.map((t) => `<span class="px-2 py-0.5 rounded-full text-xs bg-teal-50 text-teal-700">${escapeHtml(t)}</span>`).join("")}
      <span class="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700"><i class="fa-solid fa-shield-halved mr-1"></i>Respectful</span>
    </div>
    <p class="text-xs uppercase font-semibold text-slate-500 mb-1">Summary for the professor</p>
    <p class="mb-4">${escapeHtml(item.ai.summary)}</p>
    <div class="rounded-lg bg-violet-50 p-3 mb-5">
      <p class="text-xs uppercase font-semibold text-violet-700 mb-1"><i class="fa-solid fa-lightbulb mr-1"></i> Suggested improvement</p>
      <p>${escapeHtml(item.ai.suggestion)}</p>
    </div>
    <div class="rounded-lg bg-green-50 text-green-700 text-sm p-3 flex items-center gap-2">
      <i class="fa-solid fa-circle-check"></i> Thank you! Your feedback was saved.
      <a href="#dashboard" class="ml-auto font-semibold underline">View dashboard</a>
    </div>`;
}

function showError(message) {
  $("result").innerHTML = `
    <div class="text-center py-10">
      <i class="fa-solid fa-circle-exclamation text-5xl text-red-500 mb-4"></i>
      <p class="font-semibold text-red-700">Feedback not saved</p>
      <p class="text-sm text-slate-600 mt-1">${escapeHtml(message)}</p>
    </div>`;
}

async function submitFeedback(e) {
  e.preventDefault();
  if (!rating) return toast("Please choose a rating first.");
  const btn = $("submit");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> AI is analysing…';
  $("result").innerHTML = `<div class="text-center text-violet-600 py-16"><i class="fa-solid fa-spinner fa-spin text-4xl mb-4"></i><p class="font-semibold">AI is reading your feedback…</p></div>`;
  try {
    const item = await api("/api/feedback", { ...Object.fromEntries(new FormData($("form"))), rating });
    showResult(item);
    $("form").reset();
    setRating(0);
    $("counter").textContent = "0 / 1000";
    toast("Feedback saved");
  } catch (err) {
    showError(err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Submit & analyse with AI';
  }
}

function fillExample() {
  const ex = EXAMPLES[exampleIndex++ % EXAMPLES.length];
  $("form").course.value = ex.course;
  $("comment").value = ex.comment;
  $("counter").textContent = `${ex.comment.length} / 1000`;
  setRating(ex.rating);
}

async function loadDashboard() {
  try {
    feedback = await api("/api/feedback");
  } catch (err) {
    return toast(err.message);
  }
  const current = $("courseFilter").value;
  const courses = [...new Set(feedback.map((f) => f.course))].sort();
  $("courseFilter").innerHTML = '<option value="">All courses</option>' +
    courses.map((c) => `<option ${c === current ? "selected" : ""}>${escapeHtml(c)}</option>`).join("");
  renderDashboard();
}

function renderDashboard() {
  const course = $("courseFilter").value;
  const list = feedback.filter((f) => !course || f.course === course);
  const count = (s) => list.filter((f) => f.ai.sentiment === s).length;
  const avg = list.length ? list.reduce((sum, f) => sum + f.rating, 0) / list.length : 0;

  $("kpiTotal").textContent = list.length;
  $("kpiAvg").textContent = avg.toFixed(1);
  $("kpiPositive").textContent = `${list.length ? Math.round((count("positive") / list.length) * 100) : 0}%`;
  $("kpiNegative").textContent = count("negative");

  renderCharts(list);
  renderTopics(list);
  renderList();
}

function renderCharts(list) {
  const sentiments = Object.keys(SENTIMENT);
  charts.sentiment?.destroy();
  charts.sentiment = new Chart($("sentimentChart"), {
    type: "doughnut",
    data: {
      labels: sentiments.map((s) => s[0].toUpperCase() + s.slice(1)),
      datasets: [{ data: sentiments.map((s) => list.filter((f) => f.ai.sentiment === s).length), backgroundColor: sentiments.map((s) => SENTIMENT[s].color) }],
    },
    options: { maintainAspectRatio: false, cutout: "65%", plugins: { legend: { position: "bottom" } } },
  });

  const courses = [...new Set(feedback.map((f) => f.course))].sort();
  const averages = courses.map((c) => {
    const items = feedback.filter((f) => f.course === c);
    return +(items.reduce((sum, f) => sum + f.rating, 0) / items.length).toFixed(1);
  });
  const selected = $("courseFilter").value;
  charts.course?.destroy();
  charts.course = new Chart($("courseChart"), {
    type: "bar",
    data: {
      labels: courses,
      datasets: [{
        label: "Average rating",
        data: averages,
        borderRadius: 6,
        backgroundColor: courses.map((c) => (!selected || c === selected ? "#0d9488" : "#cbd5e1")),
      }],
    },
    options: { maintainAspectRatio: false, scales: { y: { min: 0, max: 5, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } },
  });
}

function renderTopics(list) {
  const topics = {};
  list.forEach((f) => f.ai.topics.forEach((t) => {
    topics[t] ??= { total: 0, negative: 0 };
    topics[t].total++;
    if (f.ai.sentiment === "negative") topics[t].negative++;
  }));
  const top = Object.entries(topics).sort((a, b) => b[1].total - a[1].total).slice(0, 10);
  $("topics").innerHTML = top.map(([name, t]) => {
    const css = t.negative > t.total / 2 ? "bg-red-50 text-red-700 border-red-200" : "bg-teal-50 text-teal-700 border-teal-200";
    return `<span class="border rounded-full px-3 py-1 text-sm ${css}">${escapeHtml(name)} <b>${t.total}</b></span>`;
  }).join("") || '<p class="text-sm text-slate-400">No topics yet.</p>';
}

function renderList() {
  const course = $("courseFilter").value;
  const sentiment = $("sentimentFilter").value;
  const q = $("search").value.trim().toLowerCase();
  const list = feedback.filter((f) =>
    (!course || f.course === course) &&
    (!sentiment || f.ai.sentiment === sentiment) &&
    (!q || `${f.comment} ${f.course} ${f.ai.topics.join(" ")}`.toLowerCase().includes(q)));

  $("listCount").textContent = `(${list.length})`;
  $("list").innerHTML = list.map((f) => `
    <div class="bg-white rounded-xl border border-slate-200 p-4">
      <div class="flex flex-wrap items-center gap-2 text-sm mb-2">
        <span class="font-semibold">${escapeHtml(f.course)}</span>
        <span>${stars(f.rating)}</span>
        ${sentimentBadge(f.ai.sentiment)}
        <span class="ml-auto text-xs text-slate-400">${escapeHtml(f.name)} · ${new Date(f.date).toLocaleDateString()}</span>
      </div>
      <p class="text-slate-700">${escapeHtml(f.comment)}</p>
      <div class="flex flex-wrap items-center gap-2 mt-3 text-sm">
        ${f.ai.topics.map((t) => `<span class="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">${escapeHtml(t)}</span>`).join("")}
        <span class="text-violet-700"><i class="fa-solid fa-lightbulb mx-1"></i>${escapeHtml(f.ai.suggestion)}</span>
      </div>
    </div>`).join("") || '<p class="text-center text-slate-400 py-10">No feedback matches the filters.</p>';
}

async function generateSummary() {
  const btn = $("summaryBtn");
  btn.disabled = true;
  $("summary").innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> AI is reading the feedback…';
  try {
    const s = await api("/api/summary", { course: $("courseFilter").value });
    $("summary").innerHTML = `
      <p class="mb-3">${escapeHtml(s.summary)}</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div><p class="font-semibold text-green-700 mb-1"><i class="fa-solid fa-thumbs-up mr-1"></i> Strengths</p>
          <ul class="list-disc ml-5 space-y-0.5">${s.strengths.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
        <div><p class="font-semibold text-red-700 mb-1"><i class="fa-solid fa-screwdriver-wrench mr-1"></i> To improve</p>
          <ul class="list-disc ml-5 space-y-0.5">${s.improvements.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
      </div>`;
  } catch (err) {
    $("summary").innerHTML = `<span class="text-red-600">${escapeHtml(err.message)}</span>`;
  } finally {
    btn.disabled = false;
  }
}

document.querySelectorAll("#stars button").forEach((b) => (b.onclick = () => setRating(Number(b.dataset.value))));
$("comment").oninput = (e) => ($("counter").textContent = `${e.target.value.length} / 1000`);
$("form").onsubmit = submitFeedback;
$("exampleBtn").onclick = fillExample;
$("courseFilter").onchange = () => {
  renderDashboard();
  $("summary").textContent = "AI reads all comments for the selected course and writes a short report.";
};
$("sentimentFilter").onchange = renderList;
$("search").oninput = renderList;
$("summaryBtn").onclick = generateSummary;
window.addEventListener("hashchange", showPage);

showEmptyResult();
showPage();
