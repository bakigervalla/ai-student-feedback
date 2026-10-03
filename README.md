# AI Student Feedback

A small web app for the **Grid Computing & Cloud** course.
Students give feedback about a course, **OpenAI** analyses it, and professors see the results on a dashboard.
The app runs in the cloud on **Render**.

## Features

A **Student / Professor** switch in the header changes the view.

- **Student › Give Feedback**: pick a course, rate it with 1–5 stars, choose quick-feedback badges
  (*What went well* / *What could be better*) and optionally add a comment, then **Submit feedback**.
  The right panel then shows the class results for that course: average rating, rating distribution and the most picked badges.
  **AI moderation**: offensive comments are rejected and not saved.
- **Professor › Dashboard**: total feedback, average rating, % positive, comments that need attention,
  sentiment overview, sentiment per course, top topics (AI), most picked badges and latest feedback. Clickable course badges narrow everything to one course.
- **Professor › Feedback**: all comments in a table with search and course / sentiment badge filters;
  click a row for the full AI analysis (sentiment, score, topics, tone check, summary, suggested improvement).
- **How it works**: architecture diagram, request flow and tech stack.
- **English / Albanian**: the EN / SQ switch in the header translates the whole interface (AI texts stay in English).
- The status bar shows whether the server is online and whether the OpenAI key is set.

## Tech stack

| Part     | Technology                                 |
|----------|--------------------------------------------|
| Frontend | HTML, Tailwind CSS, Font Awesome, vanilla JavaScript (via CDN) |
| Backend  | Node.js + Express                          |
| AI       | OpenAI API (`gpt-4o-mini` by default)      |
| Storage  | JSON file (`data/feedback.json`)           |
| Cloud    | Render (free web service)                  |

## How it works

```
Browser ──HTTP──> Node.js + Express (Render) ──API key──> OpenAI
                         │
                         └── data/feedback.json
```

1. The browser sends the feedback to `POST /api/feedback`.
2. The server sends the comment to OpenAI and asks for a JSON answer.
3. Offensive comments are rejected; otherwise the server saves the feedback together with the AI result and returns it.
4. The dashboard loads everything with `GET /api/feedback`; only professors see the AI results.
   `GET /api/status` tells the page whether the OpenAI key is configured.

The OpenAI key stays on the server and is never sent to the browser.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env      # then put your OpenAI key in .env
npm run dev
```

Open http://localhost:3000.

## Deploy to Render

1. Sign in at [render.com](https://render.com) with GitHub.
2. Click **New → Blueprint** and choose this repository (Render reads `render.yaml`).
   Or click **New → Web Service** and set build command `npm install` and start command `npm start`.
3. When Render asks for `OPENAI_API_KEY`, paste your OpenAI key
   (later you can change it under **Environment** in the service settings).
4. Click **Deploy**. The app will be available at `https://<your-service>.onrender.com`.

Optional: set `OPENAI_MODEL` to use a different OpenAI model.

> On the free plan the file system is temporary: new feedback is lost when the service restarts or redeploys,
> and the app starts again with the example feedback from `data/seed.json`. This is fine for a demo.

## Project structure

```
server.js              Express server + OpenAI calls
public/index.html      The four pages (dashboard, feedback list, feedback form, how it works)
public/app.js          Frontend logic: dashboard, table, form, AI report
data/seed.json         Example feedback loaded on first start
render.yaml            Render deployment settings
```
