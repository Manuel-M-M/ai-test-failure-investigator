🚀 AI Test Failure Investigator

AI-powered developer tool that analyzes failing test logs and returns root cause, debugging steps, suggested fixes, and improved test snippets.

🔗 Live Demo
👉 https://ai-test-failure-investigator-web.vercel.app

✨ Why this project

Debugging failing tests—especially flaky E2E tests—is one of the most time-consuming and frustrating parts of development.

This tool helps developers:

⚡ Understand failures instantly
🧠 Identify likely root causes
🛠 Get actionable debugging steps
✨ Receive improved test implementations

Instead of manually analyzing logs, developers get structured insights in seconds.

🧪 Example
Input (Playwright failure)
Timeout 5000ms exceeded.

waiting for selector ".submit-button"

Error: page.waitForSelector: Timeout 5000ms exceeded.
Output
Likely root cause
Component rendered before async data was loaded
Debugging steps
Verify API response timing
Ensure proper waiting strategy
Check component initial state
Suggested fix
Use proper async synchronization instead of relying on timing
Improved test snippet
await page.waitForResponse('/api/user');
await expect(page.locator('.submit-button')).toBeVisible();
🏗 Architecture
Frontend
Vue 3 + TypeScript
Composition API
Local state + localStorage (history)
Clean UX with progressive states:
Empty state
Loading
Result
Backend
Node.js + Express
OpenAI API integration
Structured prompt → structured output
CORS configured for local + production environments
Deployment
Frontend → Vercel (Vite)
Backend → Vercel (serverless)
Environment-based configuration
🧠 Key technical decisions
1. Structured AI output

Instead of raw text, the AI is guided to return:

root cause
debugging steps
suggested fix
improved snippet

👉 This makes the tool usable in real workflows, not just as a demo.

2. Focus on developer tooling UX
Minimal friction input
Clear output sections
Copy-to-clipboard actions
Recent investigations history

👉 Designed as a real developer tool, not just an experiment.

3. Real-world scenarios

The system is optimized for:

Playwright failures
Jest / Vitest errors
Async bugs
Race conditions
Flaky tests
4. Production-ready setup
Environment variables for API separation
CORS handling for deployed frontend
Error handling across layers
Modular architecture (services, routes, types)
🛠 Local development
1. Clone
git clone https://github.com/your-username/ai-test-failure-investigator
cd ai-test-failure-investigator
2. Install
pnpm install
3. Environment variables

Create:

apps/api/.env
OPENAI_API_KEY=your_key_here
4. Run
pnpm dev
Frontend → http://localhost:5173
API → http://localhost:3001
🔮 Future improvements
Streaming responses (better UX)
Save/share investigations (links)
Test framework detection automation
GitHub Actions integration
CI failure auto-analysis
Plugin for Playwright / Jest
🎯 Why this matters

This project demonstrates:

Full-stack product thinking
AI integration in real developer workflows
Understanding of testing pain points
Ability to ship and deploy production-ready tools
👨‍💻 Author

Manuel Moraga Molina

Senior Software Engineer
Full Stack | React | Node | TypeScript | Microservices

💬 Final note

This is not just an AI demo.

It’s a step toward AI-powered developer tooling that reduces debugging time and improves developer productivity.