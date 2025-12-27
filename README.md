# Spur Assist — AI Support Chat Widget

Built as part of the **Spur founding full-stack engineer take-home**.

I didn’t want to ship a flashy demo or a “toy chatbot.”
The goal here was simple: **reliable, maintainable, and usable**.
Something you could put in front of users and not worry about it falling apart.

---


---

## How it works (end-to-end)

1. User opens a page with the chat widget
2. User sends a message
3. Backend validates input, persists it, and checks FAQs first
4. LLM runs only if no deterministic answer exists
5. AI response is returned and rendered
6. Conversation persists via `sessionId` (no login required)

This keeps responses **fast, predictable, and hallucination-free** where it matters.

---

## Tech Stack

**Frontend**

* React + TypeScript
* Vite
* Custom hooks for chat logic
* Minimal CSS (UX-focused, not design-heavy)

**Backend**

* Node.js + TypeScript
* Express
* SQLite (`better-sqlite3`)
* Zod for runtime validation
* `express-rate-limit` for abuse protection

**LLM**

* OpenRouter free model
* API key via `.env`
* Strict prompt: Spur-only answers, calm support tone

---

## Running locally

### Backend

```bash
cd backend
npm install
```

Create `.env` inside `backend/`:

```env
PORT=3000
OPENAI_API_KEY=your_openrouter_api_key
```

Run:

```bash
npm run dev
```

You should see:

```
Spur Assist backend running on port 3000
```

---

### Frontend

```bash
cd frontend
npm install
```

Create `.env` inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Run:

```bash
npm run dev
```

Open:
[http://localhost:5173](http://localhost:5173)

---

## Database

* SQLite for simplicity
* Auto-created on server start
* Tables initialized automatically
* Foreign keys enforced
* Writes are transactional

To reset locally:

```bash
rm backend/spur.db
```

Restart the backend.

---

## Architecture 

```txt
routes/        → dumb endpoints
controllers/  → thin handlers
services/     → chat / FAQ / LLM logic
repositories/ → DB access only
data/          → FAQs & prompts
middleware/    → errors, rate limiting, CORS
validators/    → Zod schemas
```

## LLM & FAQ strategy

* FAQ is checked first no need to call AI if we already know the answer
* User input is normalized
  (`what is spur?` = `WHAT IS SPUR!!!`)
* AI only runs when necessary
* Answers are strictly Spur-focused
* Backend never crashes if LLM fails - user sees a friendly error

---

## Sessions & UX

* `sessionId` stored in `localStorage`
* Messages persist across refresh
* No authentication required
* Session expires after inactivity
* Users can manually start a new chat


---

## Edge cases & robustness

Handled intentionally:

* Empty messages
* Very long messages
* Invalid payloads
* Rate limiting
* Backend downtime / LLM failures
* Page refresh mid-chat

No crashes.
No leaked stack traces.
Errors are normalized and user-safe.


---

## If I had more time

* UI polish: smoother animations, streaming responses, mobile-first tweaks
* Redis-based rate limiting
* Basic analytics (latency, errors)
* Abstract chat layer for other channels (WhatsApp / Instagram)
* Optional authentication layer

I intentionally prioritized **reliability, clarity, and correctness** over visual fluff.

