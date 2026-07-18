/**
 * data/ai-engineer/advanced-agents.js — Phase 8: Advanced Agent Systems
 */
export default {
  id: 'ai-engineer-advanced-agents',
  subject: 'ai-engineer',
  title: 'Phase 8: Advanced Agent Systems',
  
  difficulty: 'hard',
  estimatedTime: 95,
  prerequisites: ['ai-infra'],

  notes: `
## Phase 8: Advanced Agent Systems

The frontier of AI engineering in 2026 focuses on cross-modal autonomy: agents that research, run web browsers, interact directly with operating system UI, and write/debug production codebases autonomously.

---

### 1. Deep Research Agents

*   **Logic Pattern:** Differs from simple Q&A. A Deep Research Agent dynamically splits a topic into sub-problems, runs search queries, scrapes retrieved pages, evaluates findings, identifies gaps, queries again, and writes a comprehensive report.
*   **Key Techniques:** Query expansion, parallel page scraping, source deduplication, and markdown synthesis.

---

### 2. Browser & Computer Use Agents

#### Browser Use & Playwright
*   **Browser Use:** High-level agent frameworks designed to control headless or headful web browsers (Chrome/Firefox) via LLMs.
*   **Playwright / Puppeteer:** Browser automation APIs. Agents use these tools to scrape sites, click buttons, fill out inputs, and handle authentication flow.
*   **VLM Navigation:** Modern agents read screenshots (via Vision-Language Models) to locate element coordinates rather than relying solely on HTML DOM trees.

#### Computer Use
*   **OSWorld / Anthropic Computer Use:** Exposing OS interfaces (keyboard, mouse, shell terminal) to the model. The model receives screenshots of the screen, outputs mouse coordinates \\\`(x, y)\\\`, keystrokes, and bash commands to run local software.

---

### 3. Coding Agents

*   **SWE-Agent / OpenHands:** Open-source AI software engineering agents.
*   **Logic Loop:**
    1.  Parse repo issue description.
    2.  Use custom CLI tools to search code files (grep, find).
    3.  Edit files using targeted find-and-replace command line utilities.
    4.  Run local test suites.
    5.  Read linter/test error stack traces and iterate until all tests pass.

---

### 4. Agent Benchmarks

To quantify agent capabilities, researchers rely on rigorous, sandboxed environments:
*   **SWE-bench:** Tests models on resolving real GitHub issues from open-source python repositories.
*   **GAIA (General AI Assistants):** A benchmark testing agents on complex, multi-modal tasks requiring web search, code execution, and file reasoning.

---

### 5. Build: Simple Playwright Scraping Tool
A Python function exposing a browser automation tool to an agent:

\\\`\\\`\\\`python
# Install: pip install playwright && playwright install
from playwright.sync_api import sync_playwright

def agent_browse_site(url: str) -> str:
    """Browse a web page, capture screenshot, and return visible page text."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto(url, timeout=15000)
            # Capture screenshot for VLM if needed
            # page.screenshot(path="screenshot.png")
            text_content = page.locator("body").inner_text()
            return text_content[:2000] # Return first 2000 characters
        except Exception as e:
            return f"Error browsing page: {str(e)}"
        finally:
            browser.close()

# Agent calls browse tool to scrape real-time facts
# print(agent_browse_site("https://news.ycombinator.com"))
\\\`\\\`\\\`
  `,

  formulas: [
    { name: 'Resolution Success Rate (SWE-bench)', formula: 'Success_Rate = Resolved_Issues / Total_Tested_Issues · 100', example: 'State-of-the-art models average 30-40% on SWE-bench' },
    { name: 'VLM Mouse Coordinate Map', formula: 'Target_Coordinate = (X_percent · Screen_Width / 100, Y_percent · Screen_Height / 100)', example: 'Translates model percentage predictions to pixel coordinates' }
  ],

  shortcuts: [
    'Expose targeted file-viewer and file-editor tools instead of general terminal shells to avoid destructive script errors.',
    'Always use headless browsers in production environments to run scrape cycles without graphical overhead.',
    'Leverage Vision models alongside HTML parser tools to handle complex canvas or SVG elements in modern web apps.'
  ],

  questions: [
    {
      id: 'agt-q1',
      text: 'Which python automation library is most commonly used by Browser Agents to launch, click, and navigate web apps?',
      options: ['BeautifulSoup', 'Playwright / Selenium', 'Requests', 'FastAPI'],
      answer: 1,
      explanation: 'Playwright and Selenium provide full browser drivers to launch real browser engines, simulate mouse clicks, type text, and capture screenshots.',
      hint: 'It is a modern web-testing and browser automation tool built by Microsoft.',
      difficulty: 'easy',
      tags: ['playwright', 'browser-agents'],
      timeLimit: 45
    },
    {
      id: 'agt-q2',
      text: 'How do Vision-Language Model (VLM) based Computer Use agents navigate screen interfaces?',
      options: [
        'By parsing the entire source code of the operating system kernel',
        'By analyzing screen screenshots, outputting relative (x, y) coordinates to click, and simulating keyboard events',
        'By converting all screen elements to SQL schemas',
        'By training a CNN model on individual buttons beforehand'
      ],
      answer: 1,
      explanation: 'VLM agents receive visual screenshots of the desktop. The model predicts the pixel coordinates (x, y) of the target element, which the system then executes via mouse-driver APIs.',
      hint: 'It behaves like a human: looks at the screen, finds the target, and clicks the coordinates.',
      difficulty: 'medium',
      tags: ['computer-use', 'vlm'],
      timeLimit: 60
    },
    {
      id: 'agt-q3',
      text: 'In coding agents like SWE-agent, what is the core iterative loop used to resolve bugs in a codebase?',
      options: [
        'Fine-tune the model on every single code file in the repo',
        'Parse issue -> search files -> edit target code -> run tests -> read error traces -> repeat until tests pass',
        'Re-compile the repository from scratch using Docker commands',
        'Ask the user to write the code for them'
      ],
      answer: 1,
      explanation: 'Coding agents mimic human software engineers: they read the issue, locate the bug using grep/search tools, modify the code, run local test suites, and debug based on test error messages.',
      hint: 'The agent relies on local compilation and test feedback to verify its edits.',
      difficulty: 'medium',
      tags: ['coding-agents', 'architecture'],
      timeLimit: 60
    },
    {
      id: 'agt-q4',
      text: 'Which benchmark is widely used to evaluate an LLM\'s capability to resolve real GitHub issues in open-source Python repositories?',
      options: ['MMLU', 'GAIA', 'SWE-bench', 'GSM8k'],
      answer: 2,
      explanation: 'SWE-bench is a highly challenging benchmark testing agents on resolving genuine, documented bugs from popular open-source repositories.',
      hint: 'SWE stands for Software Engineering.',
      difficulty: 'easy',
      tags: ['benchmarks', 'swe-bench'],
      timeLimit: 45
    },
    {
      id: 'agt-q5',
      text: 'What is a critical security precaution when executing an autonomous Coding Agent on a local system?',
      options: [
        'Use the latest version of Python',
        'Run the agent inside an isolated Docker container with restricted network scopes to prevent accidental or malicious local data loss',
        'Enable git log tracking',
        'Disable token usage tracing'
      ],
      answer: 1,
      explanation: 'Coding agents can run arbitrary commands or delete local files. Running them inside a sandbox container ensures the main developer machine is isolated and secure.',
      hint: 'Isolate the execution context to prevent local host damage.',
      difficulty: 'medium',
      tags: ['security', 'best-practices'],
      timeLimit: 60
    }
  ],

  aiTutorPrompt: 'You are an Agent Systems Researcher tutoring a student on Phase 8: Advanced Agent Systems. Explain Deep Research flows, Playwright browser navigation, VLM computer use coordinates, SWE-agent logic loops, and the SWE-bench benchmark.'
};
