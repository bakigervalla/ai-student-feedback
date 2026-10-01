import express from "express";
import fs from "node:fs";
import OpenAI from "openai";

const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const DATA_FILE = "data/feedback.json";
const SEED_FILE = "data/seed.json";

const openai = process.env.OPENAI_API_KEY ? new OpenAI() : null;

function loadFeedback() {
  if (!fs.existsSync(DATA_FILE)) fs.copyFileSync(SEED_FILE, DATA_FILE);
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveFeedback(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

async function askOpenAI(instructions, input) {
  if (!openai) throw new Error("OPENAI_API_KEY is not set on the server.");
  const res = await openai.chat.completions.create({
    model: MODEL,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: instructions },
      { role: "user", content: input },
    ],
  });
  return JSON.parse(res.choices[0].message.content);
}

const ANALYZE_PROMPT = `You analyse student feedback about a university course.
Reply with JSON only, in this shape:
{"sentiment": "positive" | "neutral" | "negative",
 "score": a number from -1 (very negative) to 1 (very positive),
 "topics": [up to 3 short topics, e.g. "Lectures", "Exams", "Labs", "Materials", "Pace", "Professor"],
 "summary": "one short sentence for the professor",
 "suggestion": "one short, practical improvement for the professor",
 "toxic": true if the comment contains insults or offensive language, otherwise false}`;

const SUMMARY_PROMPT = `You receive a list of student feedback comments about university courses.
Reply with JSON only, in this shape:
{"summary": "3-4 sentences describing the overall student opinion",
 "strengths": [up to 3 short points],
 "improvements": [up to 3 short, practical points]}`;

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
  res.json({ model: MODEL, aiReady: Boolean(openai) });
});

app.get("/api/feedback", (req, res) => {
  res.json(loadFeedback());
});

app.post("/api/feedback", async (req, res) => {
  const { course, rating, comment = "", name } = req.body;
  const tags = Array.isArray(req.body.tags) ? req.body.tags.map(String).slice(0, 12) : [];
  if (!course || !(rating >= 1 && rating <= 5) || (!comment.trim() && !tags.length)) {
    return res.status(400).json({ error: "Choose a course, a rating (1-5) and at least one badge or a comment." });
  }

  try {
    const text = comment.trim().slice(0, 1000);
    const ai = await askOpenAI(ANALYZE_PROMPT,
      `Course: ${course}\nRating: ${rating}/5\nSelected badges: ${tags.join(", ") || "none"}\nComment: ${text || "(no comment)"}`);
    if (ai.toxic) {
      return res.status(422).json({ error: "Your comment contains offensive language. Please rephrase it respectfully." });
    }
    const item = {
      id: Date.now(),
      course,
      rating: Number(rating),
      comment: text,
      tags,
      name: name?.trim() || "Anonymous",
      date: new Date().toISOString(),
      ai,
    };
    const list = loadFeedback();
    list.unshift(item);
    saveFeedback(list);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/summary", async (req, res) => {
  const course = req.body?.course;
  const list = loadFeedback().filter((f) => !course || f.course === course);
  if (!list.length) return res.status(400).json({ error: "There is no feedback to summarise yet." });

  try {
    const lines = list.map((f) => `- [${f.course}, ${f.rating}/5] ${(f.tags || []).join(", ")} ${f.comment}`).join("\n");
    res.json(await askOpenAI(SUMMARY_PROMPT, lines));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI Student Feedback running on http://localhost:${PORT} (model: ${MODEL})`);
  if (!openai) console.warn("Warning: OPENAI_API_KEY is not set, AI features will not work.");
});
