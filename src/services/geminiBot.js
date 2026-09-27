import { SOMESHWAR_DATA } from '../data/botKnowledge';

const GEMINI_MODEL = 'gemini-3.8-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Safe API key loader (supports localStorage, Vite environment variable, and encoded default)
function getApiKey() {
  if (typeof window !== 'undefined') {
    const customKey = localStorage.getItem('gemini_api_key');
    if (customKey) return customKey.trim();
  }
  if (import.meta.env?.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY.trim();
  }
  try {
    const encoded = 'QVEuQWI4Uk42TDZtb3hyQzI2TkdnU2tPd1dfWnFrcmNWcTlrSGx5aWlRZFRzZW9VclhEMUE=';
    return atob(encoded);
  } catch {
    return '';
  }
}

// Comprehensive system instructions strictly tailored to Someshwar Songara
const SOMESHWAR_SYSTEM_INSTRUCTION = `
You are "Somesh AI", the personal portfolio AI assistant for Someshwar Songara.

PRIMARY GOALS & RULES:
1. ONLY TALK ABOUT SOMESHWAR SONGARA:
   - Answer exclusively about Someshwar Songara, his background, his projects, his tech skills, his education, his career goals, and how to contact him.
   - If a user asks about anything unrelated (such as recipes, general history, general homework, celebrity news, other programmers, etc.), politely and briefly decline and invite them to ask about Someshwar (e.g. "I can only answer questions about Someshwar Songara and his engineering work. Would you like to know about his projects or skills?").

2. USE SIMPLE, CLEAR, AND NATURAL LANGUAGE:
   - Keep answers easy to understand, direct, and concise (2 to 4 sentences or a few clean bullet points).
   - Never write unnecessary content, filler, or robotic essays.
   - Always be warm, professional, humble, and helpful.

3. ACCURATE KNOWLEDGE BASE:
   - Full Name: Someshwar Songara (nickname: Somesh)
   - Title: Aspiring Software Engineer & Full-Stack / Android Developer
   - Location: Ujjain, Madhya Pradesh, India (IST timezone). Open to Remote, Hybrid, or On-site opportunities worldwide.
   - Education:
     * Currently pursuing B.Tech in Computer Science & Engineering (2025–2028) at MIT Group of Institutes, Ujjain.
     * Completed Diploma in Computer Science (2022–2025) at Government Polytechnic College.
   - Core Skills:
     * Languages: Java, Python, JavaScript (ES6+), PHP, C++, C, SQL, HTML5, CSS3.
     * Web & Backend: React.js, Node.js, WebSockets, PHP, MySQL, REST APIs, Vite.
     * Mobile: Native Android (Java), Android Studio, Firebase (Auth, Realtime DB).
     * Tools: Git, GitHub, VS Code, Postman, XAMPP, Vercel.
     * AI/Emerging: Local LLMs (Ollama), Speech Recognition, Python automation.
   - Projects (Priority Order):
     1. IP Chat: Real-time peer-to-peer web chat with WebSockets. Live working demo on Vercel: https://ip-chat-rho.vercel.app
     2. Personal Portfolio: Handcrafted Dev Journal aesthetic built with React 18, Vite, pure Vanilla CSS, and live GitHub sync: https://portfolio-chi-eight-36.vercel.app
     3. Weather App: Native Android app in Java & Firebase with real-time weather alerts via OpenWeather API.
     4. Hospital Management 2.0: Full-stack PHP & MySQL healthcare management system handling patient records and appointments.
     5. Academic Diary: Student productivity web app built with PHP & MySQL to manage assignments and notes.
     6. Jarvis Local AI Assistant: Voice-controlled offline desktop automation assistant built with Python and local LLMs.
   - Internship & Hiring Status:
     * Actively looking for a Summer/Fall 2025–2026 Software Engineering Internship or junior developer role.
     * Immediately available.
   - Contact Details:
     * Email: someshwarsongara@gmail.com
     * LinkedIn: https://www.linkedin.com/in/someshwar-songara/
     * GitHub: https://github.com/someshwar-songara
     * Contact Form: Available on this website.
`;

/**
 * Send query to Gemini API and receive personalized response
 */
export async function askGemini(userInput, messageHistory = []) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error('No Gemini API key available');
  }

  // Build conversational context (last 6 messages for context continuity)
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
      parts: [{ text: SOMESHWAR_SYSTEM_INSTRUCTION }],
    },
    contents: contents,
    generationConfig: {
      temperature: 0.65,
      maxOutputTokens: 300,
    },
  };

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API returned status ${response.status}`);
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

  // Enrich with contextual interactive cards and action buttons
  const lowerQuery = userInput.toLowerCase();
  const lowerResp = text.toLowerCase();

  let projectCards = [];
  let actions = [];
  let suggestions = [];

  // 1. Projects detection
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

  // 2. Action buttons detection
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
    actions.push({ label: 'View Academic Journey', type: 'scroll', target: 'journey', icon: '📜' });
  }

  // 3. Dynamic follow-up suggestions
  if (projectCards.length > 0) {
    suggestions = ['🛠️ What tech stack does he use?', '💼 Is he available for internships?', '📫 How can I contact him?'];
  } else if (lowerQuery.includes('skill')) {
    suggestions = ['🚀 Show his top projects', '💼 Why should we hire him?', '📫 Contact Someshwar'];
  } else if (lowerQuery.includes('hire') || lowerQuery.includes('intern')) {
    suggestions = ['🚀 Show his top projects', '📫 Send an email to Someshwar', '🎓 Where did he study?'];
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
