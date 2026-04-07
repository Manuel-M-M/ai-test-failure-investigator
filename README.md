# 🚀 AI Test Failure Investigator

> AI-powered developer tool that analyzes failing test logs and returns **root cause, debugging steps, suggested fixes, and improved test snippets**.

🔗 **Live Demo**  
👉 https://ai-test-failure-investigator-web.vercel.app  

---

## ✨ Why this project

Debugging failing tests—especially flaky E2E tests—is one of the most time-consuming and frustrating parts of development.

This tool helps developers:

- ⚡ Understand failures instantly  
- 🧠 Identify likely root causes  
- 🛠 Get actionable debugging steps  
- ✨ Receive improved test implementations  

Instead of manually analyzing logs, developers get structured insights in seconds.

---

## 🧪 Example

### Input (Playwright failure)

```txt
Timeout 5000ms exceeded.

waiting for selector ".submit-button"

Error: page.waitForSelector: Timeout 5000ms exceeded.
```
---

## 🏗 Architecture

### Frontend
- Vue 3 + TypeScript  
- Composition API  
- Local state + localStorage (history)  
- Clean UX (empty, loading, result states)

### Backend
- Node.js + Express  
- OpenAI API integration  
- Structured prompt → structured output  
- CORS configured for local + production environments  

### Deployment
- Frontend → Vercel (Vite)  
- Backend → Vercel (serverless)  
- Environment-based configuration  

---

## 🧠 Key technical decisions

### 1. Structured AI output

Instead of raw text, the AI returns:

- root cause  
- debugging steps  
- suggested fix  
- improved snippet  

👉 This makes the tool usable in real workflows, not just as a demo.

---

### 2. Developer-focused UX

- Minimal friction input  
- Clear output sections  
- Copy-to-clipboard actions  
- Recent investigations history  

👉 Designed as a real developer tool, not just an experiment.

---

### 3. Real-world scenarios

Optimized for:

- Playwright failures  
- Jest / Vitest errors  
- Async bugs  
- Race conditions  
- Flaky tests  

---

## 🛠 Local development

### 1. Clone

```bash
git clone https://github.com/your-username/ai-test-failure-investigator
cd ai-test-failure-investigator
```

### 2. Intall

```bash
pnpm install
```

### 3. Environment variables

```bash
apps/api/.env
```

```env
OPENAI_API_KEY=your_key_here
```

### 4. Run

```env
pnpm dev
```
### 5. URLs

- Frontend → http://localhost:5173
- API → http://localhost:3001

---

## 🔮 Future improvements

- Streaming responses (better UX)  
- Shareable investigation links  
- GitHub Actions integration  
- CI failure auto-analysis  
- Plugin for Playwright / Jest  

---

## 🎯 Why this matters

This project demonstrates:

- Full-stack product thinking  
- AI integration in real developer workflows  
- Understanding of testing pain points  
- Ability to ship and deploy production-ready tools  

---

## 👨‍💻 Author

**Manuel Moraga Molina**  
Senior Software Engineer  

## 💬 Final note

This is not just an AI demo.

It’s a step toward **AI-powered developer tooling that reduces debugging time and improves developer productivity**.