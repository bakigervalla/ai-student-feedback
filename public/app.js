const I18N = {
  en: {
    "search.ph": "Search feedback, courses, topics…",
    "role.student": "Student", "role.professor": "Professor",
    "app.professor": "Professor Console", "app.student": "Student Portal",
    "tab.dashboard": "Dashboard", "tab.list": "Feedback", "tab.submit": "Give Feedback", "tab.about": "How it works",
    "dash.title": "Feedback Dashboard", "dash.semester": "Winter semester 2026/27", "dash.courses": "{n} courses",
    "all.courses": "All courses", "all": "All",
    "kpi.total": "Total feedback", "kpi.week": "+{n} in the last 7 days", "kpi.avg": "Average rating",
    "kpi.positive": "Positive sentiment", "kpi.positiveNote": "classified by AI",
    "kpi.attention": "Needs attention", "kpi.attentionNote": "negative comments to review",
    "byCourse.title": "Sentiment by course", "byCourse.note": "Share of positive / neutral / negative comments per course · click a course to filter",
    "latest.title": "Latest feedback", "latest.note": "Click a comment to see the full AI analysis", "latest.empty": "No feedback yet.",
    "donut.title": "Sentiment overview", "donut.note": "AI classification of every comment", "donut.responses": "responses",
    "topics.title": "Top topics", "topics.note": "What students talk about (AI topic detection)",
    "topics.praised": "mostly praised", "topics.criticised": "mostly criticised", "topics.empty": "No topics yet.",
    "tags.title": "Most picked badges", "tags.note": "Quick feedback chosen by students", "tags.empty": "No badges picked yet.",
    "sent.positive": "Positive", "sent.neutral": "Neutral", "sent.negative": "Negative",
    "list.title": "All Feedback", "list.search": "Search text, topic or badge…",
    "list.meta": "{n} of {total} comments · sentiment & topics detected by AI",
    "list.badgesOnly": "Badges only", "list.empty": "No feedback matches your filters.",
    "th.student": "Student", "th.course": "Course", "th.rating": "Rating", "th.comment": "Comment",
    "th.badges": "Badges", "th.sentiment": "AI sentiment", "th.date": "Date",
    "submit.title": "Give Course Feedback", "submit.subtitle": "Your feedback helps professors improve the course",
    "form.title": "Your feedback", "form.note": "It takes less than a minute. You can stay anonymous.",
    "form.course": "Course", "form.rating": "Overall rating",
    "form.quick": "Quick feedback", "form.pick": "Pick all that apply", "form.selected": "{n} selected",
    "form.good": "What went well", "form.bad": "What could be better",
    "form.comment": "Anything else?", "form.commentOpt": "(optional if you picked badges)",
    "form.commentPh": "e.g. The labs were very practical, but the lectures are too fast…",
    "form.tip": "Tip: mention lectures, labs, exams, materials or pace.",
    "form.name": "Name", "form.optional": "(optional)", "form.namePh": "Leave empty to stay anonymous",
    "form.submit": "Submit feedback", "form.sending": "Sending…",
    "rating.0": "Click to rate", "rating.1": "Very poor", "rating.2": "Poor", "rating.3": "Okay", "rating.4": "Good", "rating.5": "Excellent",
    "err.rating": "Choose a rating from 1 to 5 stars.", "err.content": "Pick at least one badge or write a few words.",
    "err.toxic": "Your comment contains offensive language. Please rephrase it respectfully.",
    "err.notSaved": "Feedback not saved", "err.server": "The server did not answer. Try again in a moment.",
    "results.title": "Class results", "results.note": "How all students rated the course",
    "results.placeholder": "Submit your feedback to see how all students rated this course.",
    "results.thanks": "Thank you! Your feedback was saved.", "results.responses": "{n} responses",
    "results.avg": "average rating", "results.distribution": "Rating distribution", "results.none": "No badges yet.",
    "toast.sent": "Feedback submitted", "toast.professor": "Switched to the professor view", "toast.student": "Switched to the student view",
    "ai.analysis": "AI analysis", "ai.sentiment": "Sentiment", "ai.score": "Score", "ai.tone": "Tone check", "ai.respectful": "Respectful",
    "ai.badges": "Badges picked by the student", "ai.topics": "Topics detected by AI",
    "ai.summary": "Summary for the professor", "ai.suggestion": "Suggested improvement",
    "anonymous": "Anonymous", "close": "Close",
    "footer.hosted": "Hosted on Render", "status.ready": "Online · AI ready",
    "status.noKey": "Online · OpenAI key missing on the server", "status.offline": "Server offline",
    "about.title": "How it works", "about.subtitle": "Architecture, tech stack and cloud deployment",
    "arch.title": "System architecture", "arch.browser": "Browser", "arch.browserNote": "Student form & professor dashboard",
    "arch.readWrite": "read / write", "arch.storage": "Storage", "arch.storageNote": "feedback + AI results",
    "arch.apiKey": "API key / prompt", "arch.llm": "Large language model", "arch.llmNote": "sentiment, topics, summaries",
    "arch.aaas": "AI as a Service",
    "flow.title": "Request flow", "flow.note": "What happens when a student clicks “Submit”",
    "flow.1": "The browser sends the rating, badges and comment to the Node.js server.",
    "flow.2": "The server asks OpenAI for the sentiment, topics, a tone check and a summary as JSON.",
    "flow.3": "Offensive comments are rejected; the others are saved with the AI result.",
    "flow.4": "The student sees the class results; the professor sees the AI analysis on the dashboard.",
    "stack.title": "Tech stack", "stack.note": "Chosen to be simple, cheap and easy to explain",
    "stack.storage": "JSON file on the server", "stack.cloud": "Render web service, deployed from GitHub",
    "stack.secretsLabel": "Secrets", "stack.secrets": "OpenAI key stored as an environment variable on Render",
  },
  sq: {
    "search.ph": "Kërko komente, lëndë, tema…",
    "role.student": "Student", "role.professor": "Profesor",
    "app.professor": "Paneli i profesorit", "app.student": "Portali i studentit",
    "tab.dashboard": "Paneli", "tab.list": "Komentet", "tab.submit": "Jep vlerësim", "tab.about": "Si funksionon",
    "dash.title": "Paneli i vlerësimeve", "dash.semester": "Semestri dimëror 2026/27", "dash.courses": "{n} lëndë",
    "all.courses": "Të gjitha lëndët", "all": "Të gjitha",
    "kpi.total": "Vlerësime gjithsej", "kpi.week": "+{n} në 7 ditët e fundit", "kpi.avg": "Nota mesatare",
    "kpi.positive": "Qëndrim pozitiv", "kpi.positiveNote": "klasifikuar nga AI",
    "kpi.attention": "Kërkon vëmendje", "kpi.attentionNote": "komente negative për t'u shqyrtuar",
    "byCourse.title": "Qëndrimi sipas lëndës", "byCourse.note": "Pjesa e komenteve pozitive / neutrale / negative për çdo lëndë · kliko një lëndë për ta filtruar",
    "latest.title": "Vlerësimet e fundit", "latest.note": "Kliko një koment për të parë analizën e plotë nga AI", "latest.empty": "Ende nuk ka vlerësime.",
    "donut.title": "Pasqyra e qëndrimit", "donut.note": "Klasifikimi i çdo komenti nga AI", "donut.responses": "përgjigje",
    "topics.title": "Temat kryesore", "topics.note": "Për çfarë flasin studentët (tema të gjetura nga AI)",
    "topics.praised": "kryesisht të lavdëruara", "topics.criticised": "kryesisht të kritikuara", "topics.empty": "Ende nuk ka tema.",
    "tags.title": "Etiketat më të zgjedhura", "tags.note": "Vlerësime të shpejta të zgjedhura nga studentët", "tags.empty": "Ende nuk është zgjedhur asnjë etiketë.",
    "sent.positive": "Pozitiv", "sent.neutral": "Neutral", "sent.negative": "Negativ",
    "list.title": "Të gjitha vlerësimet", "list.search": "Kërko tekst, temë ose etiketë…",
    "list.meta": "{n} nga {total} komente · qëndrimi dhe temat nga AI",
    "list.badgesOnly": "Vetëm etiketa", "list.empty": "Asnjë vlerësim nuk përputhet me filtrat.",
    "th.student": "Studenti", "th.course": "Lënda", "th.rating": "Nota", "th.comment": "Komenti",
    "th.badges": "Etiketat", "th.sentiment": "Qëndrimi (AI)", "th.date": "Data",
    "submit.title": "Vlerëso lëndën", "submit.subtitle": "Vlerësimi yt i ndihmon profesorët ta përmirësojnë lëndën",
    "form.title": "Vlerësimi yt", "form.note": "Zgjat më pak se një minutë. Mund të mbetesh anonim.",
    "form.course": "Lënda", "form.rating": "Vlerësimi i përgjithshëm",
    "form.quick": "Vlerësim i shpejtë", "form.pick": "Zgjidh sa të duash", "form.selected": "{n} të zgjedhura",
    "form.good": "Çfarë shkoi mirë", "form.bad": "Çfarë mund të ishte më mirë",
    "form.comment": "Diçka tjetër?", "form.commentOpt": "(opsionale nëse zgjodhe etiketa)",
    "form.commentPh": "p.sh. Ushtrimet ishin shumë praktike, por ligjëratat janë shumë të shpejta…",
    "form.tip": "Këshillë: përmend ligjëratat, ushtrimet, provimet, materialet ose ritmin.",
    "form.name": "Emri", "form.optional": "(opsionale)", "form.namePh": "Lëre bosh për të mbetur anonim",
    "form.submit": "Dërgo vlerësimin", "form.sending": "Duke dërguar…",
    "rating.0": "Kliko për të vlerësuar", "rating.1": "Shumë dobët", "rating.2": "Dobët", "rating.3": "Mesatar", "rating.4": "Mirë", "rating.5": "Shkëlqyeshëm",
    "err.rating": "Zgjidh një notë nga 1 deri në 5 yje.", "err.content": "Zgjidh të paktën një etiketë ose shkruaj disa fjalë.",
    "err.toxic": "Komenti yt përmban fjalë fyese. Të lutem riformuloje me respekt.",
    "err.notSaved": "Vlerësimi nuk u ruajt", "err.server": "Serveri nuk u përgjigj. Provo përsëri pas pak.",
    "results.title": "Rezultatet e klasës", "results.note": "Si e vlerësuan lëndën të gjithë studentët",
    "results.placeholder": "Dërgo vlerësimin tënd për të parë si e vlerësuan këtë lëndë të gjithë studentët.",
    "results.thanks": "Faleminderit! Vlerësimi yt u ruajt.", "results.responses": "{n} përgjigje",
    "results.avg": "nota mesatare", "results.distribution": "Shpërndarja e notave", "results.none": "Ende nuk ka etiketa.",
    "toast.sent": "Vlerësimi u dërgua", "toast.professor": "Kalove te pamja e profesorit", "toast.student": "Kalove te pamja e studentit",
    "ai.analysis": "Analiza nga AI", "ai.sentiment": "Qëndrimi", "ai.score": "Pikët", "ai.tone": "Kontrolli i tonit", "ai.respectful": "I respektueshëm",
    "ai.badges": "Etiketat e zgjedhura nga studenti", "ai.topics": "Temat e gjetura nga AI",
    "ai.summary": "Përmbledhje për profesorin", "ai.suggestion": "Përmirësim i sugjeruar",
    "anonymous": "Anonim", "close": "Mbyll",
    "footer.hosted": "I vendosur në Render", "status.ready": "Në linjë · AI gati",
    "status.noKey": "Në linjë · mungon çelësi i OpenAI në server", "status.offline": "Serveri jashtë linje",
    "about.title": "Si funksionon", "about.subtitle": "Arkitektura, teknologjitë dhe vendosja në cloud",
    "arch.title": "Arkitektura e sistemit", "arch.browser": "Shfletuesi", "arch.browserNote": "Formulari i studentit dhe paneli i profesorit",
    "arch.readWrite": "lexim / shkrim", "arch.storage": "Ruajtja", "arch.storageNote": "vlerësimet + rezultatet e AI",
    "arch.apiKey": "çelës API / prompt", "arch.llm": "Model i madh gjuhësor", "arch.llmNote": "qëndrimi, temat, përmbledhjet",
    "arch.aaas": "AI si shërbim",
    "flow.title": "Rrjedha e kërkesës", "flow.note": "Çfarë ndodh kur studenti klikon “Dërgo”",
    "flow.1": "Shfletuesi dërgon notën, etiketat dhe komentin te serveri Node.js.",
    "flow.2": "Serveri i kërkon OpenAI-t qëndrimin, temat, kontrollin e tonit dhe një përmbledhje në JSON.",
    "flow.3": "Komentet fyese refuzohen; të tjerat ruhen bashkë me rezultatin e AI.",
    "flow.4": "Studenti sheh rezultatet e klasës; profesori sheh analizën e AI në panel.",
    "stack.title": "Teknologjitë", "stack.note": "Të zgjedhura që të jenë të thjeshta, të lira dhe të lehta për t'u shpjeguar",
    "stack.storage": "Skedar JSON në server", "stack.cloud": "Shërbim web në Render, i vendosur nga GitHub",
    "stack.secretsLabel": "Sekretet", "stack.secrets": "Çelësi i OpenAI ruhet si variabël mjedisi në Render",
  },
};
// Courses, badges and AI topics are stored in English; only their display is translated.
const TERMS_SQ = {
  "Grid & Cloud Computing": "Kompjutimi Grid dhe Cloud", "Machine Learning": "Mësimi i makinës",
  "Distributed Systems": "Sistemet e shpërndara", "Web Engineering": "Inxhinieria e uebit", "Databases II": "Bazat e të dhënave II",
  "Clear explanations": "Shpjegime të qarta", "Practical labs": "Ushtrime praktike", "Helpful professor": "Profesor i gatshëm",
  "Great examples": "Shembuj të shkëlqyer", "Fair grading": "Vlerësim i drejtë", "Useful project": "Projekt i dobishëm",
  "Too fast": "Ritëm shumë i shpejtë", "Outdated materials": "Materiale të vjetruara", "Too much workload": "Ngarkesë e madhe",
  "Hard exams": "Provime të vështira", "Unclear assignments": "Detyra të paqarta", "Boring lectures": "Ligjërata të mërzitshme",
  Labs: "Ushtrimet", Professor: "Profesori", Cloud: "Cloud", Pace: "Ritmi", Lectures: "Ligjëratat", Assignments: "Detyrat",
  Materials: "Materialet", Exams: "Provimet", Grading: "Vlerësimi", Project: "Projekti", General: "Të përgjithshme",
  Projects: "Projektet", Explanations: "Shpjegimet", Examples: "Shembujt", Workload: "Ngarkesa", Theory: "Teoria",
  Technologies: "Teknologjitë", Consultations: "Konsultimet",
};

const SENT = {
  positive: { color: "#16a34a", pill: "bg-green-50 text-green-700", icon: "fa-face-smile" },
  neutral: { color: "#d97706", pill: "bg-amber-50 text-amber-700", icon: "fa-face-meh" },
  negative: { color: "#dc2626", pill: "bg-red-50 text-red-700", icon: "fa-face-frown" },
};
const COURSES = [
  { name: "Grid & Cloud Computing", icon: "fa-cloud" },
  { name: "Machine Learning", icon: "fa-brain" },
  { name: "Distributed Systems", icon: "fa-network-wired" },
  { name: "Web Engineering", icon: "fa-code" },
  { name: "Databases II", icon: "fa-database" },
];
const TAGS = {
  good: [["Clear explanations", "fa-lightbulb"], ["Practical labs", "fa-flask"], ["Helpful professor", "fa-hand-holding-heart"],
    ["Great examples", "fa-star"], ["Fair grading", "fa-scale-balanced"], ["Useful project", "fa-diagram-project"]],
  bad: [["Too fast", "fa-gauge-high"], ["Outdated materials", "fa-box-archive"], ["Too much workload", "fa-weight-hanging"],
    ["Hard exams", "fa-file-circle-exclamation"], ["Unclear assignments", "fa-circle-question"], ["Boring lectures", "fa-face-meh-blank"]],
};
const TABS = {
  professor: [["dashboard", "fa-chart-pie"], ["list", "fa-comments"], ["about", "fa-cloud"]],
  student: [["submit", "fa-pen-to-square"], ["about", "fa-cloud"]],
};

const $ = (id) => document.getElementById(id);
const state = { role: "professor", page: "dashboard", course: "", q: "", listCourse: "", listSentiment: "" };
const form = { course: COURSES[0].name, tags: new Set() };
let feedback = [];
let rating = 0;
let resultsCourse = "";
let status = null;
let drawerId = null;
let lang = "en";
try { lang = localStorage.getItem("lang") === "sq" ? "sq" : "en"; } catch {}

const t = (key, vars = {}) => (I18N[lang][key] ?? I18N.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k]);
const term = (text) => (lang === "sq" && TERMS_SQ[text]) || text;
const aiText = (ai, field) => (lang === "sq" && ai[`${field}_sq`]) || ai[field];

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function stars(value) {
  return `<span class="stars">${[1, 2, 3, 4, 5].map((i) =>
    `<i class="fa-solid ${value >= i - 0.25 ? "fa-star" : value >= i - 0.75 ? "fa-star-half-stroke" : "fa-star off"}"></i>`).join("")}</span>`;
}
const pill = (s) => `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${SENT[s].pill}"><i class="fa-regular ${SENT[s].icon}"></i>${t(`sent.${s}`)}</span>`;
const average = (list) => (list.length ? list.reduce((a, f) => a + f.rating, 0) / list.length : 0);
// Chrome ships no Albanian month names, so "sq" dates are built by hand.
const MONTHS_SQ = ["jan", "shk", "mar", "pri", "maj", "qer", "korr", "gush", "sht", "tet", "nën", "dhj"];
const shortDate = (d) => {
  const date = new Date(d);
  return lang === "sq" ? `${String(date.getDate()).padStart(2, "0")} ${MONTHS_SQ[date.getMonth()]}`
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};
const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const displayName = (f) => (f.name === "Anonymous" ? t("anonymous") : f.name);
const courseIcon = (name) => (COURSES.find((c) => c.name === name) || { icon: "fa-book" }).icon;
const courses = () => COURSES.map((c) => c.name).filter((n) => feedback.some((f) => f.course === n))
  .concat([...new Set(feedback.map((f) => f.course))].filter((n) => !COURSES.some((c) => c.name === n)));
const tagInfo = (tag) => {
  const good = TAGS.good.find(([x]) => x === tag);
  const bad = TAGS.bad.find(([x]) => x === tag);
  return { icon: (good || bad || [, "fa-tag"])[1], good: Boolean(good) };
};
const count = (n) => `<span class="opacity-60 font-bold">${n}</span>`;

function avatar(f, size = "w-7 h-7") {
  const anon = f.name === "Anonymous";
  return `<span class="${size} shrink-0 rounded-full grid place-items-center text-white text-[10px] font-bold ${anon ? "bg-slate-300" : "bg-slate-500"}">${anon ? '<i class="fa-solid fa-user"></i>' : escapeHtml(initials(f.name))}</span>`;
}

function chip(label, icon, selected, attrs, extra = "") {
  return `<button type="button" ${attrs} aria-pressed="${selected}"
    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition ${selected ? "bg-slate-800 border-slate-800 text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}">
    <i class="${icon}"></i>${label}${extra}</button>`;
}
const courseChip = (name, selected, attrs, extra) => chip(escapeHtml(term(name)), `fa-solid ${selected ? "fa-check" : courseIcon(name)}`, selected, attrs, extra);
const allChip = (selected, attrs, extra) => chip(t("all.courses"), "fa-solid fa-layer-group", selected, attrs, extra);

function tagChip(tag, extra = "") {
  const info = tagInfo(tag);
  return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700"><i class="fa-solid ${info.icon} text-[10px] ${info.good ? "text-green-600" : "text-red-600"}"></i>${escapeHtml(term(tag))}${extra}</span>`;
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
  if (!res.ok) throw Object.assign(new Error(data.error || t("err.server")), { status: res.status });
  return data;
}

async function loadFeedback() {
  try {
    feedback = await api("/api/feedback");
  } catch (err) {
    toast(err.message);
  }
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  document.querySelectorAll("#langSwitch button").forEach((b) => {
    const on = b.dataset.lang === lang;
    b.classList.toggle("bg-white", on);
    b.classList.toggle("text-slate-900", on);
  });
  setRating(rating);
  renderStatus();
  renderResults();
  render();
  if (drawerId) openDrawer(drawerId);
}

function render() {
  document.querySelectorAll("#roleSwitch button").forEach((b) => {
    const on = b.dataset.role === state.role;
    b.classList.toggle("bg-white", on);
    b.classList.toggle("text-slate-900", on);
  });
  $("avatar").textContent = state.role === "professor" ? "AB" : "ST";
  $("appName").textContent = t(`app.${state.role}`);

  const tabs = TABS[state.role];
  if (!tabs.some(([id]) => id === state.page)) state.page = tabs[0][0];
  $("tabs").innerHTML = tabs.map(([id, icon]) => `
    <button data-tab="${id}" class="flex items-center gap-1.5 px-3 whitespace-nowrap border-b-2 ${state.page === id ? "border-teal-600 text-slate-900 font-semibold" : "border-transparent text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900"}">
      <i class="fa-solid ${icon}"></i> ${t(`tab.${id}`)}${id === "list" ? ` <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 rounded-full">${feedback.length}</span>` : ""}
    </button>`).join("");
  document.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => go(b.dataset.tab)));

  document.querySelectorAll("[data-page]").forEach((el) => el.classList.toggle("hidden", el.dataset.page !== state.page));
  if (state.page === "dashboard") renderDashboard();
  if (state.page === "list") renderList();
  if (state.page === "submit") renderFormBadges();
}

function go(page) {
  state.page = page;
  document.querySelector("main").scrollTop = 0;
  render();
}

function renderDashboard() {
  const list = feedback.filter((f) => !state.course || f.course === state.course);
  const n = (s) => list.filter((f) => f.ai.sentiment === s).length;
  const avg = average(list);

  $("courseFilter").innerHTML = allChip(!state.course, `data-filter=""`, count(feedback.length)) +
    courses().map((c) => courseChip(c, state.course === c, `data-filter="${escapeHtml(c)}"`, count(feedback.filter((f) => f.course === c).length))).join("");
  document.querySelectorAll("[data-filter]").forEach((b) => (b.onclick = () => setCourse(b.dataset.filter)));
  $("courseCount").textContent = state.course ? term(state.course) : t("dash.courses", { n: courses().length });

  $("kpiTotal").textContent = list.length;
  $("kpiWeek").textContent = t("kpi.week", { n: list.filter((f) => Date.now() - new Date(f.date) < 7 * 864e5).length });
  $("kpiAvg").textContent = avg.toFixed(1);
  $("kpiStars").innerHTML = stars(avg);
  $("kpiPositive").textContent = `${list.length ? Math.round((n("positive") / list.length) * 100) : 0}%`;
  $("kpiNegative").textContent = n("negative");

  const ranked = courses().map((c) => {
    const items = feedback.filter((f) => f.course === c);
    return { c, items, avg: average(items) };
  }).sort((a, b) => b.avg - a.avg);
  $("byCourse").innerHTML = ranked.map(({ c, items, avg: a }) => `
    <button data-course="${escapeHtml(c)}" class="w-full grid grid-cols-[200px_1fr_70px] items-center gap-2.5 py-1.5 px-1 rounded text-left hover:bg-slate-50 ${state.course === c ? "bg-slate-100" : ""}">
      <span class="font-semibold truncate flex items-center gap-2"><i class="fa-solid ${courseIcon(c)} text-slate-400 w-4 text-center"></i>${escapeHtml(term(c))}</span>
      <span class="flex h-2 rounded bg-slate-100 overflow-hidden">${Object.keys(SENT).map((s) => `<span style="width:${(items.filter((f) => f.ai.sentiment === s).length / items.length) * 100}%;background:${SENT[s].color}"></span>`).join("")}</span>
      <span class="text-right">${stars(a)}</span>
    </button>`).join("");
  document.querySelectorAll("[data-course]").forEach((b) => (b.onclick = () => setCourse(state.course === b.dataset.course ? "" : b.dataset.course)));

  $("donut").innerHTML = donut(Object.keys(SENT).map((s) => ({ v: n(s), c: SENT[s].color })), list.length) +
    `<div class="flex-1 text-[11.5px]">${Object.keys(SENT).map((s) => `
      <div class="flex items-center gap-2 py-1 text-slate-600"><span class="w-2.5 h-2.5 rounded-sm" style="background:${SENT[s].color}"></span><i class="fa-regular ${SENT[s].icon}"></i>${t(`sent.${s}`)}<b class="ml-auto text-slate-800">${n(s)}</b></div>`).join("")}</div>`;

  const topics = {};
  list.forEach((f) => f.ai.topics.forEach((x) => {
    topics[x] ??= { n: 0, pos: 0, neg: 0 };
    topics[x].n++;
    if (f.ai.sentiment === "positive") topics[x].pos++;
    if (f.ai.sentiment === "negative") topics[x].neg++;
  }));
  const top = Object.entries(topics).sort((a, b) => b[1].n - a[1].n).slice(0, 7);
  $("topics").innerHTML = top.map(([x, v]) => `
    <div class="grid grid-cols-[100px_1fr_28px] items-center gap-2 py-1 text-[11.5px]">
      <span class="truncate">${escapeHtml(term(x))}</span>
      <span class="h-[7px] rounded bg-slate-100 overflow-hidden"><span class="block h-full rounded ${v.neg > v.pos ? "bg-red-500" : "bg-slate-500"}" style="width:${(v.n / top[0][1].n) * 100}%"></span></span>
      <b class="text-right">${v.n}</b>
    </div>`).join("") || `<p class="text-slate-400">${t("topics.empty")}</p>`;

  const tagCounts = countTags(list);
  $("tagStats").innerHTML = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
    .map(([x, c]) => tagChip(x, ` <b class="ml-0.5">${c}</b>`)).join("") || `<p class="text-slate-400">${t("tags.empty")}</p>`;

  $("latest").innerHTML = list.slice(0, 5).map(feedItem).join("") || `<p class="text-slate-400 py-6 text-center">${t("latest.empty")}</p>`;
  bindOpen();
}

function countTags(list) {
  const counts = {};
  list.forEach((f) => (f.tags || []).forEach((x) => (counts[x] = (counts[x] || 0) + 1)));
  return counts;
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
  return `<svg width="${size}" height="${size}" class="shrink-0" role="img" aria-label="${total} ${t("donut.responses")}"><circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="#f1f5f9" stroke-width="16"/>${arcs}
    <text x="50%" y="48%" text-anchor="middle" font-size="20" font-weight="800" fill="#0f172a">${total}</text>
    <text x="50%" y="63%" text-anchor="middle" font-size="9.5" fill="#64748b">${t("donut.responses")}</text></svg>`;
}

function ring(score, color, icon, size = 72) {
  const r = size / 2 - 6, C = 2 * Math.PI * r, pct = Math.round(((score + 1) / 2) * 100);
  return `<div class="relative shrink-0" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}"><circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="#f1f5f9" stroke-width="7"/>
    <circle r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C * pct) / 100} ${C}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>
    <span class="absolute inset-0 grid place-items-center text-xl" style="color:${color}"><i class="fa-regular ${icon}"></i></span></div>`;
}

function feedItem(f) {
  return `<div data-open="${f.id}" class="flex gap-2.5 py-2.5 border-b border-slate-100 last:border-0 cursor-pointer group">
    ${avatar(f)}
    <div class="min-w-0">
      ${f.comment ? `<p class="text-[12.5px] leading-snug text-slate-700 group-hover:text-slate-950 group-hover:underline">${escapeHtml(f.comment)}</p>` : ""}
      ${f.tags?.length ? `<p class="flex flex-wrap gap-1 mt-1">${f.tags.map((x) => tagChip(x)).join("")}</p>` : ""}
      <p class="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">${stars(f.rating)} ${pill(f.ai.sentiment)} <span>${escapeHtml(term(f.course))} · ${escapeHtml(displayName(f))} · ${shortDate(f.date)}</span></p>
    </div>
  </div>`;
}

function setCourse(course) {
  state.course = course;
  renderDashboard();
}

function renderList() {
  const q = state.q.trim().toLowerCase();
  const base = feedback.filter((f) => !state.listCourse || f.course === state.listCourse);
  const list = base.filter((f) =>
    (!state.listSentiment || f.ai.sentiment === state.listSentiment) &&
    (!q || [f.comment, f.course, term(f.course), ...f.ai.topics.map(term), ...(f.tags || []).map(term), ...f.ai.topics, ...(f.tags || [])]
      .join(" ").toLowerCase().includes(q)));

  $("search").value = state.q;
  $("listCourse").innerHTML = allChip(!state.listCourse, `data-list-course=""`) +
    courses().map((c) => courseChip(c, state.listCourse === c, `data-list-course="${escapeHtml(c)}"`)).join("");
  $("listSentiment").innerHTML = [["", t("all"), "fa-solid fa-layer-group"], ...Object.entries(SENT).map(([k, s]) => [k, t(`sent.${k}`), `fa-regular ${s.icon}`])]
    .map(([k, label, icon]) => chip(label, icon, state.listSentiment === k, `data-list-sentiment="${k}"`, ` ${count(base.filter((f) => !k || f.ai.sentiment === k).length)}`)).join("");
  document.querySelectorAll("[data-list-course]").forEach((b) => (b.onclick = () => { state.listCourse = b.dataset.listCourse; renderList(); }));
  document.querySelectorAll("[data-list-sentiment]").forEach((b) => (b.onclick = () => { state.listSentiment = b.dataset.listSentiment; renderList(); }));
  $("listMeta").textContent = t("list.meta", { n: list.length, total: feedback.length });

  $("rows").innerHTML = list.map((f) => `
    <tr data-open="${f.id}" class="border-t border-slate-100 cursor-pointer hover:bg-slate-50">
      <td class="px-3 py-2"><span class="flex items-center gap-2 font-semibold">${avatar(f, "w-6 h-6")}${escapeHtml(displayName(f))}</span></td>
      <td class="px-3 py-2 whitespace-nowrap"><span class="inline-flex items-center gap-1.5"><i class="fa-solid ${courseIcon(f.course)} text-slate-400"></i>${escapeHtml(term(f.course))}</span></td>
      <td class="px-3 py-2">${stars(f.rating)}</td>
      <td class="px-3 py-2 max-w-[320px]"><p class="truncate text-slate-600">${escapeHtml(f.comment) || `<span class="text-slate-400 italic">${t("list.badgesOnly")}</span>`}</p></td>
      <td class="px-3 py-2"><span class="flex flex-wrap gap-1">${(f.tags || []).slice(0, 2).map((x) => tagChip(x)).join("")}</span></td>
      <td class="px-3 py-2">${pill(f.ai.sentiment)}</td>
      <td class="px-3 py-2 whitespace-nowrap text-slate-500">${shortDate(f.date)}</td>
    </tr>`).join("") || `<tr><td colspan="7" class="text-center text-slate-500 py-10">${t("list.empty")}</td></tr>`;
  bindOpen();
}

function bindOpen() {
  document.querySelectorAll("[data-open]").forEach((el) => (el.onclick = () => openDrawer(Number(el.dataset.open))));
}

function analysisHtml(ai, tags = []) {
  const s = SENT[ai.sentiment] ? ai.sentiment : "neutral";
  const score = Number(ai.score) || 0;
  const heading = (key) => `<h4 class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mt-3.5 mb-1.5">${t(key)}</h4>`;
  return `
    <div class="flex items-center gap-4 mb-3.5">
      ${ring(score, SENT[s].color, SENT[s].icon)}
      <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center text-xs">
        <span class="text-slate-500">${t("ai.sentiment")}</span><span>${pill(s)}</span>
        <span class="text-slate-500">${t("ai.score")}</span><span class="font-mono">${score > 0 ? "+" : ""}${score.toFixed(2)} <span class="text-slate-400">(-1 … +1)</span></span>
        <span class="text-slate-500">${t("ai.tone")}</span><span class="text-slate-700"><i class="fa-solid fa-check text-green-600 mr-1"></i>${t("ai.respectful")}</span>
      </div>
    </div>
    ${tags.length ? `${heading("ai.badges")}<div class="flex flex-wrap gap-1.5">${tags.map((x) => tagChip(x)).join("")}</div>` : ""}
    ${heading("ai.topics")}
    <div class="flex flex-wrap gap-1.5">${ai.topics.map((x) => `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">${escapeHtml(term(x))}</span>`).join("")}</div>
    ${heading("ai.summary")}
    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[12.5px] leading-relaxed text-slate-700">${escapeHtml(aiText(ai, "summary"))}</div>
    ${heading("ai.suggestion")}
    <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[12.5px] leading-relaxed text-slate-700"><i class="fa-solid fa-lightbulb text-slate-400 mr-1.5"></i>${escapeHtml(aiText(ai, "suggestion"))}</div>`;
}

function openDrawer(id) {
  const f = feedback.find((x) => x.id === id);
  if (!f) return;
  drawerId = id;
  $("drawer").innerHTML = `
    <div class="px-4 py-3.5 border-b border-slate-200 flex items-center gap-2.5">
      ${avatar(f)}
      <div class="flex-1"><p class="font-bold text-sm">${escapeHtml(displayName(f))}</p><p class="text-[11px] text-slate-500">${escapeHtml(term(f.course))} · ${shortDate(f.date)}</p></div>
      <button id="closeDrawer" aria-label="${t("close")}" class="w-7 h-7 rounded-md border border-slate-300 hover:bg-slate-50"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="p-4 overflow-auto flex-1">
      ${stars(f.rating)}
      ${f.comment ? `<blockquote class="my-3 text-[13.5px] leading-relaxed bg-slate-50 border-l-3 border-slate-400 px-3.5 py-3 rounded-r-md">“${escapeHtml(f.comment)}”</blockquote>` : ""}
      <h3 class="font-extrabold text-[15px] mt-4 mb-3"><i class="fa-solid fa-wand-magic-sparkles text-slate-400 mr-1"></i> ${t("ai.analysis")}</h3>
      ${analysisHtml(f.ai, f.tags || [])}
    </div>`;
  $("drawer").classList.remove("translate-x-full");
  $("scrim").classList.remove("hidden");
  $("closeDrawer").onclick = closeDrawer;
}

function closeDrawer() {
  drawerId = null;
  $("drawer").classList.add("translate-x-full");
  $("scrim").classList.add("hidden");
}

function renderFormBadges() {
  $("courseBadges").innerHTML = COURSES.map((c) =>
    courseChip(c.name, form.course === c.name, `role="radio" aria-checked="${form.course === c.name}" data-pick-course="${escapeHtml(c.name)}"`)).join("");
  document.querySelectorAll("[data-pick-course]").forEach((b) => (b.onclick = () => { form.course = b.dataset.pickCourse; renderFormBadges(); }));

  const tagButton = ([tag, icon], good) => {
    const on = form.tags.has(tag);
    return `<button type="button" data-tag="${escapeHtml(tag)}" aria-pressed="${on}"
      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold transition active:scale-95 ${on ? "bg-slate-800 border-slate-800 text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}">
      <i class="fa-solid ${on ? "fa-check" : `${icon} ${good ? "text-green-600" : "text-red-600"}`}"></i>${escapeHtml(term(tag))}</button>`;
  };
  $("goodTags").innerHTML = TAGS.good.map((x) => tagButton(x, true)).join("");
  $("badTags").innerHTML = TAGS.bad.map((x) => tagButton(x, false)).join("");
  document.querySelectorAll("[data-tag]").forEach((b) => (b.onclick = () => {
    form.tags.has(b.dataset.tag) ? form.tags.delete(b.dataset.tag) : form.tags.add(b.dataset.tag);
    formError("");
    renderFormBadges();
  }));
  $("tagCount").textContent = form.tags.size ? t("form.selected", { n: form.tags.size }) : t("form.pick");
}

function setRating(value) {
  rating = value;
  document.querySelectorAll("#stars button").forEach((b) => b.classList.toggle("text-amber-400", Number(b.dataset.value) <= rating));
  $("ratingLabel").textContent = t(`rating.${rating}`);
}

function renderResults(error) {
  if (error) {
    $("results").innerHTML = `
      <div class="rounded-lg bg-red-50 border border-red-200 p-3.5 text-[12.5px]">
        <b class="text-red-700"><i class="fa-solid fa-ban mr-1"></i>${t("err.notSaved")}</b>
        <p class="mt-1">${escapeHtml(error)}</p>
      </div>`;
    return;
  }
  if (!resultsCourse) {
    $("results").innerHTML = `
      <div class="border-[1.5px] border-dashed border-slate-300 rounded-lg px-4 py-10 text-center text-slate-500 leading-relaxed">
        <i class="fa-solid fa-chart-simple text-3xl text-slate-300 mb-2"></i><br>${t("results.placeholder")}
      </div>`;
    return;
  }

  const items = feedback.filter((f) => f.course === resultsCourse);
  const avg = average(items);
  const dist = [5, 4, 3, 2, 1].map((r) => [r, items.filter((f) => f.rating === r).length]);
  const max = Math.max(1, ...dist.map(([, c]) => c));
  const tagCounts = countTags(items);
  const topTags = (group) => TAGS[group].map(([x]) => x).filter((x) => tagCounts[x])
    .sort((a, b) => tagCounts[b] - tagCounts[a]).slice(0, 4)
    .map((x) => tagChip(x, ` <b class="ml-0.5">${tagCounts[x]}</b>`)).join("") || `<span class="text-slate-400 text-[11.5px]">${t("results.none")}</span>`;

  $("results").innerHTML = `
    <p class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 mb-4 font-semibold text-slate-700"><i class="fa-solid fa-circle-check text-green-600 mr-1.5"></i>${t("results.thanks")}</p>
    <div class="flex items-center gap-2 mb-3">
      <i class="fa-solid ${courseIcon(resultsCourse)} text-slate-400"></i>
      <span class="font-bold text-[14px]">${escapeHtml(term(resultsCourse))}</span>
      <span class="ml-auto text-[11px] text-slate-500">${t("results.responses", { n: items.length })}</span>
    </div>
    <div class="grid sm:grid-cols-[130px_1fr] gap-4 items-center pb-4 border-b border-slate-100">
      <div class="text-center">
        <p class="text-[38px] leading-none font-extrabold tracking-tight">${avg.toFixed(1)}</p>
        <p class="mt-1.5 text-[13px]">${stars(avg)}</p>
        <p class="text-[11px] text-slate-500 mt-1">${t("results.avg")}</p>
      </div>
      <div>
        <p class="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-1.5">${t("results.distribution")}</p>
        ${dist.map(([r, c]) => `
          <div class="grid grid-cols-[28px_1fr_24px] items-center gap-2 py-0.5 text-[11.5px]">
            <span class="text-slate-600">${r} <i class="fa-solid fa-star text-amber-400 text-[9px]"></i></span>
            <span class="h-2 rounded bg-slate-100 overflow-hidden"><span class="block h-full rounded bg-slate-600" style="width:${(c / max) * 100}%"></span></span>
            <b class="text-right">${c}</b>
          </div>`).join("")}
      </div>
    </div>
    <div class="grid sm:grid-cols-2 gap-4 pt-4">
      <div>
        <p class="text-[11px] font-semibold text-slate-600 mb-1.5"><i class="fa-solid fa-thumbs-up text-green-600 mr-1"></i>${t("form.good")}</p>
        <div class="flex flex-wrap gap-1.5">${topTags("good")}</div>
      </div>
      <div>
        <p class="text-[11px] font-semibold text-slate-600 mb-1.5"><i class="fa-solid fa-thumbs-down text-red-600 mr-1"></i>${t("form.bad")}</p>
        <div class="flex flex-wrap gap-1.5">${topTags("bad")}</div>
      </div>
    </div>`;
}

function formError(message) {
  $("formError").textContent = message;
  $("formError").classList.toggle("hidden", !message);
}

async function submitFeedback(e) {
  e.preventDefault();
  const comment = $("comment").value.trim();
  if (!rating) return formError(t("err.rating"));
  if (!form.tags.size && comment.length < 5) return formError(t("err.content"));
  formError("");

  const btn = $("submitBtn");
  const label = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> ${t("form.sending")}`;
  try {
    const item = await api("/api/feedback", { course: form.course, rating, tags: [...form.tags], comment, name: $("form").name.value });
    feedback.unshift(item);
    resultsCourse = item.course;
    renderResults();
    $("form").reset();
    form.tags.clear();
    setRating(0);
    renderFormBadges();
    $("counter").textContent = "0/1000";
    toast(t("toast.sent"));
  } catch (err) {
    renderResults(err.status === 422 ? t("err.toxic") : err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = label;
    applyLangTo(btn);
  }
}

function applyLangTo(root) {
  root.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
}

async function loadStatus() {
  try {
    status = await api("/api/status");
  } catch {
    status = { offline: true };
  }
  renderStatus();
}

function renderStatus() {
  if (!status) return;
  if (status.offline) {
    $("footerStatus").innerHTML = `<i class="fa-solid fa-circle text-red-600 text-[8px] mr-1"></i>${t("status.offline")}`;
    return;
  }
  $("footerModel").textContent = `(${status.model})`;
  $("modelName").textContent = status.model;
  $("footerStatus").innerHTML = status.aiReady
    ? `<i class="fa-solid fa-circle text-green-600 text-[8px] mr-1"></i>${t("status.ready")}`
    : `<i class="fa-solid fa-circle text-amber-500 text-[8px] mr-1"></i>${t("status.noKey")}`;
}

$("roleSwitch").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  state.role = b.dataset.role;
  state.page = TABS[state.role][0][0];
  closeDrawer();
  render();
  toast(t(`toast.${state.role}`));
};
$("langSwitch").onclick = (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  lang = b.dataset.lang;
  try { localStorage.setItem("lang", lang); } catch {}
  applyLang();
};
$("globalSearch").onkeydown = (e) => {
  if (e.key !== "Enter") return;
  state.role = "professor";
  state.q = e.target.value;
  e.target.value = "";
  e.target.blur();
  go("list");
};
$("search").oninput = (e) => { state.q = e.target.value; renderList(); $("search").focus(); };
document.querySelectorAll("#stars button").forEach((b) => (b.onclick = () => { setRating(Number(b.dataset.value)); formError(""); }));
$("comment").oninput = (e) => ($("counter").textContent = `${e.target.value.length}/1000`);
$("form").onsubmit = submitFeedback;
$("scrim").onclick = closeDrawer;
document.addEventListener("keydown", (e) => e.key === "Escape" && closeDrawer());

applyLang();
loadStatus();
loadFeedback().then(render);
