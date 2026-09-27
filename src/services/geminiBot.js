import { SOMESHWAR_DATA } from '../data/botKnowledge';

// Gemini API Endpoint requested by user (gemini-flash-latest)
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
const DEFAULT_KEY_SECRET = 'QVEuQWI4Uk42TDZtb3hyQzI2TkdnU2tPd1dfWnFrcmNWcTlrSGx5aWlRZFRzZW9VclhEMUE=';

function getActiveApiKey() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  if (typeof window !== 'undefined' && localStorage.getItem('gemini_api_key')) {
    return localStorage.getItem('gemini_api_key');
  }
  try {
    return atob(DEFAULT_KEY_SECRET);
  } catch {
    return '';
  }
}

// System prompt strictly scoped to Someshwar Songara, simple language, no unnecessary content
const SOMESHWAR_SYSTEM_PROMPT = `
You are "Somesh AI", the personal portfolio assistant for Someshwar Songara.

STRICT INSTRUCTIONS:
1. FOCUS ONLY ON SOMESHWAR SONGARA:
   - You only answer questions about Someshwar Songara, his projects, his tech skills, his education, his background, his internship availability, and how to contact him.
   - If the user asks about ANYTHING unrelated (e.g. recipes, general coding homework, general science, other people, movies, weather in random cities), politely decline in one short sentence and steer back to Someshwar (for example: "I can only answer questions about Someshwar Songara and his projects. How can I help you learn about his work?").

2. SIMPLE, DIRECT, AND CONCISE LANGUAGE:
   - Use simple, easy-to-understand words.
   - Do NOT write long essays, fluff, or unnecessary content.
   - Keep answers short, helpful, and natural (typically 2 to 3 sentences or a quick bullet list).
   - Never say robotic phrases like "As an AI language model". Speak warmly as Someshwar's portfolio assistant.

3. ACCURATE FACTS ABOUT SOMESHWAR:
   - Name: Someshwar Songara (nickname: Somesh).
   - Role: Aspiring Software Engineer & Full-Stack / Android Developer.
   - Location: Ujjain, Madhya Pradesh, India. Open to Remote, Hybrid, or On-site positions worldwide.
   - Education:
     * Currently pursuing B.Tech in Computer Science & Engineering (2025–2028) at MIT Group of Institutes, Ujjain.
     * Completed Diploma in Computer Science (2022–2025) at Government Polytechnic College.
   - Key Skills:
     * Languages: Java, Python, JavaScript (ES6+), PHP, C++, C, SQL, HTML5, CSS3.
     * Web: React.js, Node.js, WebSockets, PHP, MySQL, REST APIs, Vite, Vanilla CSS.
     * Mobile: Native Android (Java), Android Studio, Firebase (Auth, Realtime DB).
     * Tools: Git, GitHub, VS Code, Postman, XAMPP, Vercel.
   - Projects (in priority order):
     1. IP Chat: Real-time peer-to-peer web chat with WebSockets and Node.js. Live demo on Vercel: https://ip-chat-rho.vercel.app
     2. Personal Portfolio: Handcrafted Dev Journal aesthetic built with React 18, Vite, pure Vanilla CSS, and live GitHub sync: https://portfolio-chi-eight-36.vercel.app
     3. Weather App: Native Android app in Java & Firebase with real-time location-based weather alerts.
     4. Hospital Management 2.0: Full-stack PHP & MySQL healthcare management system for patient records and doctor appointments.
     5. Academic Diary: Student productivity web app built with PHP & MySQL to manage assignments and notes.
     6. Jarvis Local AI Assistant: Voice-controlled offline desktop automation assistant built with Python and local LLMs.
   - Internship & Hiring:
     * Actively looking for a Summer/Fall 2025–2026 Software Engineering Internship or junior developer role.
     * Immediately available.
   - Contact Info:
     * Email: someshwarsongara@gmail.com
     * LinkedIn: https://www.linkedin.com/in/someshwar-songara/
     * GitHub: https://github.com/someshwar-songara
     * Contact Form: Available on this website.
`;

/**
 * Ask Gemini AI using the exact curl specification provided by user:
 * POST https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent
 * Headers: Content-Type: application/json, X-goog-api-key: <key>
 */
export async function askGemini(userInput, messageHistory = []) {
  const apiKey = getActiveApiKey();

  if (!apiKey) {
    throw new Error('Missing Gemini API key');
  }

  // Build conversation contents (include recent relevant history for context)
  const recentHistory = messageHistory.slice(-6).filter((m) => m.id !== 'msg-welcome');
  const contents = [];

  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    });
  }

  // Append current user message
  contents.push({
    role: 'user',
    parts: [{ text: userInput }],
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: SOMESHWAR_SYSTEM_PROMPT }],
    },
    contents: contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 250,
    },
  };

  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error (${response.status})`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .filter(Boolean)
    .join('\n')
    ?.trim();

  if (!text) {
    throw new Error('Empty response from Gemini API');
  }

  // Detect relevant interactive project cards and action shortcuts
  const lowerQuery = userInput.toLowerCase();
  const lowerResp = text.toLowerCase();

  let projectCards = [];
  let actions = [];
  let suggestions = [];

  // Match relevant projects
  if (lowerQuery.includes('ip chat') || lowerResp.includes('ip chat')) {
    const p = SOMESHWAR_DATA.projects.find((proj) => proj.id === 'ip-chat');
    if (p) projectCards.push(p);
  } else if (lowerQuery.includes('weather') || lowerResp.includes('weather app')) {
    const p = SOMESHWAR_DATA.projects.find((proj) => proj.id === 'weather-app');
    if (p) projectCards.push(p);
  } else if (lowerQuery.includes('hospital') || lowerResp.includes('hospital management')) {
    const p = SOMESHWAR_DATA.projects.find((proj) => proj.id === 'hospital-2');
    if (p) projectCards.push(p);
  } else if (lowerQuery.includes('academic') || lowerResp.includes('academic diary')) {
    const p = SOMESHWAR_DATA.projects.find((proj) => proj.id === 'academic-diary');
    if (p) projectCards.push(p);
  } else if (lowerQuery.includes('jarvis') || lowerResp.includes('jarvis')) {
    const p = SOMESHWAR_DATA.projects.find((proj) => proj.id === 'jarvis-ai');
    if (p) projectCards.push(p);
  } else if (lowerQuery.includes('demo') || lowerQuery.includes('live')) {
    projectCards = SOMESHWAR_DATA.projects.filter((p) => p.demoUrl);
  } else if (lowerQuery.includes('project') || lowerResp.includes('project')) {
    projectCards = SOMESHWAR_DATA.projects;
  }

  // Match actions
  if (lowerQuery.includes('contact') || lowerQuery.includes('hire') || lowerQuery.includes('email') || lowerResp.includes('someshwarsongara@gmail.com')) {
    actions.push({ label: 'Open Contact Form ✍️', type: 'scroll', target: 'contact', icon: '✉️' });
    actions.push({ label: 'LinkedIn Profile', type: 'link', url: SOMESHWAR_DATA.contact.linkedin, icon: '💼' });
  } else if (lowerQuery.includes('project') || projectCards.length > 0) {
    actions.push({ label: 'View on Corkboard', type: 'scroll', target: 'projects', icon: '📌' });
    actions.push({ label: 'GitHub Profile', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' });
  } else if (lowerQuery.includes('skill') || lowerQuery.includes('stack')) {
    actions.push({ label: 'View Skills', type: 'scroll', target: 'skills', icon: '🎯' });
    actions.push({ label: 'Explore Projects', type: 'scroll', target: 'projects', icon: '🚀' });
  } else if (lowerQuery.includes('education') || lowerQuery.includes('college')) {
    actions.push({ label: 'View Journey', type: 'scroll', target: 'journey', icon: '📜' });
  }

  // Quick suggestions
  if (projectCards.length > 0) {
    suggestions = ['🛠️ What tech stack does he use?', '💼 Is he available for internships?', '📫 How can I contact him?'];
  } else if (lowerQuery.includes('skill')) {
    suggestions = ['🚀 Show top projects', '💼 Why should we hire him?', '📫 Contact Someshwar'];
  } else if (lowerQuery.includes('hire') || lowerQuery.includes('intern')) {
    suggestions = ['🚀 Show top projects', '📫 Send an email to Someshwar', '🎓 Where did he study?'];
  } else {
    suggestions = ['🚀 What projects has he built?', '🛠️ What are his skills?', '💼 Is he open for internships?'];
  }

  return {
    text: text,
    projectCards: projectCards,
    actions: actions,
    suggestions: suggestions,
    isGemini: true,
  };
}
