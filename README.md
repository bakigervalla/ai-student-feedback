# AI Student Feedback

A small web app for the **Grid Computing & Cloud** course.
Students give feedback about a course, **OpenAI** analyses it, and professors see the results on a dashboard.
The app runs in the cloud on **Render**.

## Features

- **Give Feedback**: the student picks a course, gives a 1–5 star rating and writes a comment.
  The AI returns the sentiment (positive / neutral / negative), the topics, a one-line summary and an improvement suggestion.
- **Dashboard**: totals, average rating, a sentiment bar, a filter by course, and an **AI summary** of all feedback
  (overall opinion, strengths, things to improve).

## Tech stack

| Part     | Technology                                 |
|----------|--------------------------------------------|
| Frontend | HTML, Tailwind CSS, Font Awesome (via CDN) |
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
3. The server saves the feedback together with the AI result and returns it.
4. The dashboard loads everything with `GET /api/feedback` and asks for a summary with `POST /api/summary`.

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
public/index.html      Give Feedback page
public/dashboard.html  Dashboard page
data/seed.json         Example feedback loaded on first start
render.yaml            Render deployment settings
```
