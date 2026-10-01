const MOOD = {
  positive: { label: "Praise", bar: "bg-praise", ink: "text-praise-ink", hl: "hl-praise" },
  neutral: { label: "Mixed", bar: "bg-mixed", ink: "text-mixed-ink", hl: "hl-mixed" },
  negative: { label: "Concern", bar: "bg-concern", ink: "text-concern-ink", hl: "hl-concern" },
};
const EXAMPLES = [
  { course: "Grid & Cloud Computing", rating: 4, comment: "The labs with Docker were really practical and the professor explains clearly. But the slides are outdated and the last deadline was too short." },
  { course: "Machine Learning", rating: 2, comment: "Lectures are too fast and confusing. We need more examples before the exam, and the materials are hard to follow." },
  { course: "Web Engineering", rating: 5, comment: "Excellent course! Interesting topics, a helpful professor and a very useful final project." },
];
const CIRCLE = (cls = "") => `<svg class="pen-circle ${cls}" viewBox="0 0 100 80" aria-hidden="true"><path d="M60 7 C30 3 5 18 8 42 C11 67 48 77 73 68 C95 60 98 33 81 18 C68 7 46 5 28 13"/></svg>`;

const $ = (id) => document.getElementById(id);
const state = { course: "", mood: "", q: "" };
let feedback = [];
let rating = 0;
let exampleIndex = 0;

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function highlight(text, highlights = []) {
  const lower = text.toLowerCase();
  const ranges = [];
  for (const h of highlights) {
    const start = h.text ? lower.indexOf(h.text.toLowerCase()) : -1;
    if (start < 0) continue;
    const end = start + h.text.length;
    if (ranges.some((r) => start < r.end && end > r.start)) continue;
    ranges.push({ start, end, cls: h.type === "praise" ? "hl-praise" : "hl-concern" });
  }
  ranges.sort((a, b) => a.start - b.start);
  let html = "";
  let pos = 0;
  for (const r of ranges) {
    html += escapeHtml(text.slice(pos, r.start)) + `<mark class="hl ${r.cls}">${escapeHtml(text.slice(r.start, r.end))}</mark>`;
    pos = r.end;
  }
  return html + escapeHtml(text.slice(pos));
}

const mood = (f) => MOOD[f.ai.sentiment] || MOOD.neutral;
const average = (list) => (list.length ? list.reduce((sum, f) => sum + f.rating, 0) / list.length : 0);
const shortDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.remove("opacity-0");
  clearTimeout(el.timer);
  el.timer = setTimeout(() => el.classList.add("opacity-0"), 2600);
}

async function api(path, body) {
  const res = await fetch(path, body ? {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  } : undefined);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "The server did not answer. Try again in a moment.");
  return data;
}

function showPage() {
  const page = ["feedback", "dashboard", "about"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "feedback";
  document.querySelectorAll("[data-page]").forEach((el) => el.classList.toggle("hidden", el.dataset.page !== page));
  document.querySelectorAll("[data-nav]").forEach((a) =>
    a.dataset.nav === page ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  window.scrollTo(0, 0);
  if (page === "dashboard") loadDashboard();
}

function setRating(value, animate = true) {
  rating = value;
  document.querySelectorAll("#grades .grade").forEach((btn) => {
    const on = Number(btn.dataset.value) === rating;
    btn.setAttribute("aria-checked", on);
    btn.querySelector(".pen-circle")?.remove();
    btn.classList.toggle("text-pen", on);
    if (on) btn.insertAdjacentHTML("beforeend", CIRCLE(animate ? "draw" : ""));
  });
}

function showEmptyResult() {
  $("result").innerHTML = `
    <div class="rounded-md border-2 border-dashed border-rule p-7 text-ink-soft text-lg leading-relaxed">
      <p class="font-pen text-3xl text-ink mb-2">Your note will appear here</p>
      AI marks what you <mark class="hl hl-praise">praised</mark> and what
      <mark class="hl hl-concern">worried you</mark>, then writes one suggestion for the professor.
    </div>`;
}

function showLoading() {
  $("result").innerHTML = `
    <div class="note tilt rounded-sm p-7 text-lg">
      <i class="fa-solid fa-highlighter text-pen fa-bounce mr-2"></i> Reading your feedback…
    </div>`;
}

function showResult(item) {
  const m = mood(item);
  $("result").innerHTML = `
    <div class="note tilt rounded-sm p-6 sm:p-7 sweep">
      <div class="flex items-start justify-between gap-4">
        <p class="font-pen text-3xl leading-none">Note for the professor</p>
        <span class="stamp ${m.ink} text-lg">${m.label}</span>
      </div>
      <blockquote class="mt-5 text-lg leading-relaxed">“${highlight(item.comment, item.ai.highlights)}”</blockquote>
      <p class="mt-5 leading-relaxed">${escapeHtml(item.ai.summary)}</p>
      <p class="mt-4 flex gap-3 leading-relaxed"><i class="fa-solid fa-lightbulb text-pen mt-1"></i><span><b>Suggestion:</b> ${escapeHtml(item.ai.suggestion)}</span></p>
      <p class="mt-5 flex flex-wrap gap-2">${item.ai.topics.map((t) => `<span class="border border-ink/25 rounded-full px-3 py-0.5 text-sm">${escapeHtml(t)}</span>`).join("")}</p>
    </div>
    <p class="mt-5 flex items-center gap-2 text-ink-soft">
      <i class="fa-solid fa-circle-check text-praise-ink"></i> Handed in.
      <a href="#dashboard" class="text-ink font-bold underline underline-offset-4">See the report cards</a>
    </p>`;
}

function showReturned(message) {
  $("result").innerHTML = `
    <div class="sheet rounded-md border border-rule p-7">
      <span class="stamp text-pen text-2xl">Returned</span>
      <p class="mt-5 text-lg leading-relaxed">${escapeHtml(message)}</p>
      <p class="mt-2 text-ink-soft">Your text is still in the form, so you can edit it and hand it in again.</p>
    </div>`;
}

function formError(message) {
  $("formError").textContent = message;
  $("formError").classList.toggle("hidden", !message);
}

async function submitFeedback(e) {
  e.preventDefault();
  if (!rating) return formError("Pick a grade from 1 to 5.");
  if ($("comment").value.trim().length < 5) return formError("Write a few words about the course.");
  formError("");

  const btn = $("submit");
  btn.disabled = true;
  btn.textContent = "Handing in…";
  showLoading();
  try {
    const item = await api("/api/feedback", { ...Object.fromEntries(new FormData($("form"))), rating });
    showResult(item);
    $("form").reset();
    setRating(0);
    $("counter").textContent = "0/1000";
    toast("Feedback handed in");
  } catch (err) {
    showReturned(err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Hand in feedback";
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

async function loadDashboard() {
  try {
    feedback = await api("/api/feedback");
  } catch (err) {
    return toast(err.message);
  }
  renderDashboard();
}

function renderDashboard() {
  const list = feedback.filter((f) => !state.course || f.course === state.course);
  renderHeadline(list);
  renderStats(list);
  renderCards();
  renderTopics(list);
  renderList();
}

function courseStats() {
  return [...new Set(feedback.map((f) => f.course))].map((course) => {
    const items = feedback.filter((f) => f.course === course);
    return { course, items, avg: average(items) };
  }).sort((a, b) => b.avg - a.avg);
}

function renderHeadline(list) {
  let text;
  if (!feedback.length) {
    text = "No feedback yet. Share the link with your students to get the first comments.";
  } else if (state.course) {
    const top = topTopics(list, "negative")[0];
    text = `${state.course} has ${list.length} ${list.length === 1 ? "comment" : "comments"} with an average grade of ${average(list).toFixed(1)}.` +
      (top ? ` Students worry most about ${top.toLowerCase()}.` : " No major concerns so far.");
  } else {
    const courses = courseStats();
    const best = courses[0], worst = courses[courses.length - 1];
    text = `${feedback.length} students handed in feedback. ${best.course} leads with ${best.avg.toFixed(1)}` +
      (courses.length > 1 ? `, while ${worst.course} needs attention at ${worst.avg.toFixed(1)}.` : ".");
  }
  $("headline").textContent = text;
}

function renderStats(list) {
  const count = (s) => list.filter((f) => f.ai.sentiment === s).length;
  const stats = [
    [list.length, "comments"],
    [average(list).toFixed(1), "average grade"],
    [`${list.length ? Math.round((count("positive") / list.length) * 100) : 0}%`, "mostly praise"],
    [count("negative"), "raise concerns"],
  ];
  $("stats").innerHTML = stats.map(([value, label], i) => `
    <div class="flex flex-col-reverse pr-8 mr-8 ${i < stats.length - 1 ? "sm:border-r-2 border-rule" : ""}">
      <dt class="text-ink-soft">${label}</dt>
      <dd class="font-display text-4xl font-extrabold tabular-nums">${value}</dd>
    </div>`).join("");

  $("moodBar").innerHTML = Object.entries(MOOD).map(([key, m]) =>
    `<div class="${m.bar}" style="width:${list.length ? (count(key) / list.length) * 100 : 0}%"></div>`).join("");
  $("moodLegend").innerHTML = Object.entries(MOOD).map(([key, m]) =>
    `<span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full ${m.bar}"></span>${m.label} <b class="text-ink">${count(key)}</b></span>`).join("");
}

function renderCards() {
  $("cards").innerHTML = courseStats().map(({ course, items, avg }) => {
    const selected = course === state.course;
    const count = (s) => items.filter((f) => f.ai.sentiment === s).length;
    const topics = topTopics(items).slice(0, 3).join(", ");
    return `
    <li class="border-b border-rule">
      <button data-course="${escapeHtml(course)}" aria-pressed="${selected}"
        class="w-full text-left grid grid-cols-[4rem_1fr] sm:grid-cols-[4rem_1fr_8rem] items-center gap-4 py-4 px-2 sm:px-3 hover:bg-white ${selected ? "bg-white shadow-[inset_4px_0_0_var(--color-pen)]" : ""}">
        <span class="relative grid place-items-center h-14 font-pen text-[2rem] font-bold text-pen">${avg.toFixed(1)}${CIRCLE("small")}</span>
        <span>
          <span class="block font-display font-bold text-lg leading-tight">${escapeHtml(course)}</span>
          <span class="block text-sm text-ink-soft mt-0.5">${items.length} ${items.length === 1 ? "comment" : "comments"}${topics ? `, mostly about ${escapeHtml(topics.toLowerCase())}` : ""}</span>
        </span>
        <span class="hidden sm:flex h-2.5 rounded-full overflow-hidden bg-rule">
          ${Object.keys(MOOD).map((k) => `<span class="${MOOD[k].bar}" style="width:${(count(k) / items.length) * 100}%"></span>`).join("")}
        </span>
      </button>
    </li>`;
  }).join("");
  document.querySelectorAll("[data-course]").forEach((btn) => (btn.onclick = () => selectCourse(btn.dataset.course)));
}

function topTopics(list, sentiment) {
  const counts = {};
  list.filter((f) => !sentiment || f.ai.sentiment === sentiment)
    .forEach((f) => f.ai.topics.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

function renderTopics(list) {
  const topics = {};
  list.forEach((f) => f.ai.topics.forEach((t) => {
    topics[t] ??= { total: 0, positive: 0, negative: 0 };
    topics[t].total++;
    if (f.ai.sentiment in topics[t]) topics[t][f.ai.sentiment]++;
  }));
  const entries = Object.entries(topics).sort((a, b) => b[1].total - a[1].total).slice(0, 12);
  const max = entries[0]?.[1].total || 1;
  $("topics").innerHTML = entries.map(([name, t]) => {
    const cls = t.negative > t.positive ? "hl-concern" : t.positive > t.negative ? "hl-praise" : "hl-mixed";
    const size = 1 + (t.total / max) * 0.6;
    return `<mark class="hl ${cls} mr-3 whitespace-nowrap" style="font-size:${size}em">${escapeHtml(name)}<sup class="text-ink-soft text-xs ml-0.5">${t.total}</sup></mark>`;
  }).join(" ") + (entries.length ? `<span class="block text-sm text-ink-soft leading-normal mt-2">Green is mostly praised, pink mostly criticised, yellow is mixed.</span>` : '<span class="text-ink-soft">Topics appear after the first comments.</span>');
}

function renderList() {
  const base = feedback.filter((f) => !state.course || f.course === state.course);
  const q = state.q.trim().toLowerCase();
  const list = base.filter((f) =>
    (!state.mood || f.ai.sentiment === state.mood) &&
    (!q || `${f.comment} ${f.course} ${f.ai.topics.join(" ")}`.toLowerCase().includes(q)));

  $("courseChip").innerHTML = state.course
    ? `<button id="clearCourse" class="inline-flex items-center gap-2 bg-ink text-white rounded-full pl-3 pr-2 py-1 text-sm font-bold">${escapeHtml(state.course)} <i class="fa-solid fa-xmark" aria-label="Show all courses"></i></button>`
    : "";
  $("clearCourse")?.addEventListener("click", () => selectCourse(""));

  const tabs = [["", "All", base.length], ...Object.entries(MOOD).map(([k, m]) => [k, m.label, base.filter((f) => f.ai.sentiment === k).length])];
  $("moodTabs").innerHTML = tabs.map(([key, label, n]) => `
    <button data-mood="${key}" aria-pressed="${state.mood === key}"
      class="rounded-full px-3.5 py-1.5 text-sm font-bold ${state.mood === key ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}">${label} <span class="opacity-60">${n}</span></button>`).join("");
  document.querySelectorAll("[data-mood]").forEach((b) => (b.onclick = () => { state.mood = b.dataset.mood; renderList(); }));

  $("list").innerHTML = list.map((f) => {
    const m = mood(f);
    return `
    <article class="bg-white border border-rule rounded-md p-5 sm:p-6 grid grid-cols-[3.5rem_1fr] md:grid-cols-[3.5rem_1fr_16rem] gap-x-5 gap-y-4">
      <span class="relative grid place-items-center h-12 font-pen text-4xl font-bold text-pen" title="Grade ${f.rating} of 5">${f.rating}${CIRCLE("small")}</span>
      <div>
        <p class="text-lg leading-relaxed">${highlight(f.comment, f.ai.highlights)}</p>
        <p class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span class="font-bold ${m.ink}">${m.label}</span>
          <span class="font-bold text-ink">${escapeHtml(f.course)}</span>
          <span>${escapeHtml(f.name)}</span>
          <span>${shortDate(f.date)}</span>
        </p>
      </div>
      <p class="col-span-2 md:col-span-1 note rounded-sm p-4 text-sm leading-relaxed self-start"><i class="fa-solid fa-lightbulb text-pen mr-1.5"></i>${escapeHtml(f.ai.suggestion)}</p>
    </article>`;
  }).join("") || `<p class="text-center text-ink-soft py-12 text-lg">No comments match. Clear the search or pick another tone.</p>`;
}

function selectCourse(course) {
  state.course = state.course === course ? "" : course;
  state.mood = "";
  $("brief").innerHTML = briefHint();
  renderDashboard();
}

function briefHint() {
  return `<p class="text-ink-soft">AI reads every comment${state.course ? ` for ${escapeHtml(state.course)}` : ""} and writes what is going well and what to change.</p>`;
}

async function writeBriefing() {
  const btn = $("briefBtn");
  btn.disabled = true;
  btn.textContent = "Writing…";
  $("brief").innerHTML = '<p><i class="fa-solid fa-pen-nib fa-bounce text-pen mr-2"></i>Reading all comments…</p>';
  try {
    const s = await api("/api/summary", { course: state.course });
    $("brief").innerHTML = `
      <p>${escapeHtml(s.summary)}</p>
      <p class="font-pen text-2xl mt-4">Keep doing</p>
      <ul class="space-y-1">${s.strengths.map((x) => `<li class="flex gap-2"><i class="fa-solid fa-check text-praise-ink mt-1"></i>${escapeHtml(x)}</li>`).join("")}</ul>
      <p class="font-pen text-2xl mt-4">Change</p>
      <ul class="space-y-1">${s.improvements.map((x) => `<li class="flex gap-2"><i class="fa-solid fa-arrow-right text-pen mt-1"></i>${escapeHtml(x)}</li>`).join("")}</ul>`;
  } catch (err) {
    $("brief").innerHTML = `<p class="text-pen font-bold">${escapeHtml(err.message)}</p>`;
  } finally {
    btn.disabled = false;
    btn.textContent = "Write briefing";
  }
}

document.querySelectorAll("#grades .grade").forEach((b) => (b.onclick = () => { setRating(Number(b.dataset.value)); formError(""); }));
$("grades").onkeydown = (e) => {
  const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
  if (!step) return;
  e.preventDefault();
  setRating(Math.min(5, Math.max(1, (rating || 0) + step)));
  document.querySelector(`#grades [data-value="${rating}"]`).focus();
};
$("comment").oninput = (e) => ($("counter").textContent = `${e.target.value.length}/1000`);
$("form").onsubmit = submitFeedback;
$("exampleBtn").onclick = fillExample;
$("search").oninput = (e) => { state.q = e.target.value; renderList(); };
$("briefBtn").onclick = writeBriefing;
window.addEventListener("hashchange", showPage);

$("brief").innerHTML = briefHint();
showEmptyResult();
showPage();
