import { SOMESHWAR_DATA } from '../data/botKnowledge';

// Web Audio API lightweight sound effects (zero external files required)
let audioCtx = null;

export function playBotSound(type = 'receive', muted = false) {
  if (muted) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'receive') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'send') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.05);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // safely ignore
  }
}

/**
 * Primary response generator: Powered directly by Somesh AI.
 * Fast, reliable, zero external API keys required, and customized for Someshwar's portfolio.
 */
export async function generateBotResponse(userInput, chatHistory = []) {
  return generateLocalBotResponse(userInput, chatHistory);
}

/**
 * Local fallback response generator for Someshwar's Portfolio Assistant
 */
export function generateLocalBotResponse(userInput, chatHistory = []) {
  const query = (userInput || '').toLowerCase().trim();
  const clean = query.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ');

  // Helper matcher
  const containsAny = (words) => words.some((w) => clean.includes(w) || query.includes(w));
  const containsAll = (words) => words.every((w) => clean.includes(w) || query.includes(w));

  // 1. GREETINGS & CASUAL HELLOS
  if (
    /^(hi|hello|hey|heyy|heya|yo|hola|greetings|namaste|good\s*(morning|afternoon|evening|day))(\s*!*|\s+there|\s+bot)?$/i.test(
      query
    ) ||
    containsAny(['hello', 'hey there', 'hi somesh', 'hi there', 'who are you', 'what is this bot'])
  ) {
    return {
      text: `👋 **Hello! Welcome to Someshwar's Dev Journal!**

I'm **Somesh AI**, Someshwar's portfolio assistant. I can guide you through:
- 🚀 **Projects** (IP Chat, Hospital 2.0, Weather App, Jarvis AI)
- 🛠️ **Tech Stack & Skills** (Web, Java, Python, Android, PHP)
- 🎓 **Education & Background** (B.Tech CSE @ MIT Ujjain)
- 💼 **Internship & Hiring Status** (Currently open!)
- 📫 **Contact Information & Socials**

What are you interested in exploring?`,
      suggestions: [
        '👨‍💻 Who is Someshwar?',
        '🚀 Show me his projects',
        '🛠️ What are his skills?',
        '💼 Is he looking for an internship?',
        '📫 How do I contact him?',
      ],
      actions: [
        { label: 'View Projects', type: 'scroll', target: 'projects', icon: '🚀' },
        { label: 'Get in Touch', type: 'scroll', target: 'contact', icon: '📬' },
      ],
    };
  }

  // 2. WHO IS SOMESHWAR / ABOUT / BACKGROUND / BIO
  if (
    containsAny([
      'who is someshwar',
      'about someshwar',
      'tell me about yourself',
      'who are you',
      'introduce yourself',
      'bio',
      'background',
      'about you',
      'about him',
      'who is he',
      'what do you do',
    ])
  ) {
    return {
      text: `👨‍💻 **Meet Someshwar Songara**

Someshwar is an aspiring software engineer and **B.Tech Computer Science student** from **Ujjain, Madhya Pradesh, India**.

✨ **What he loves doing:**
- Crafting responsive, intuitive **Web applications** (React, JavaScript, PHP, MySQL)
- Building native **Android mobile apps** (Java, Android Studio, Firebase)
- Exploring and implementing **Local AI / LLM automations** (Python, speech recognition)
- Solving real student & community problems with software rather than just following tutorials!

🎯 **Current Focus:**
Currently seeking a **Summer/Fall Software Engineering Internship** where he can contribute to high-impact products, write clean code, and learn from experienced engineers.`,
      suggestions: [
        '🚀 What projects has he built?',
        '🛠️ What tech stack does he use?',
        '🎓 Tell me about his education',
        '💼 Why should we hire him?',
      ],
      actions: [
        { label: 'Read Full Journal', type: 'scroll', target: 'about', icon: '📖' },
        { label: 'See Projects', type: 'scroll', target: 'projects', icon: '📂' },
      ],
    };
  }

  // 2.1. WHAT CAN YOU DO / HELP / CAPABILITIES
  if (
    containsAny([
      'what can you do',
      'help',
      'how do you work',
      'what do you know',
      'options',
      'menu',
      'commands',
      'capabilities',
      'features',
    ])
  ) {
    return {
      text: `🤖 **I'm Somesh AI — Someshwar's Official Portfolio Assistant!**

Here is what you can ask me:
- 🚀 **Projects:** Learn about IP Chat, Hospital 2.0, Weather App, Jarvis AI, and Academic Diary.
- 🛠️ **Tech Skills:** In-depth info on Java, Python, React, Android, PHP, MySQL, and C++.
- 💼 **Recruitment:** Check internship status, role preferences, and why you should hire him.
- 🎓 **Education:** Details on his B.Tech @ MIT Ujjain and CS Diploma.
- 📫 **Contact & Socials:** Quick links to email, LinkedIn, and GitHub.
- 📄 **Resume / CV:** How to get his latest resume.

What would you like to explore?`,
      suggestions: [
        '🚀 Show me his projects',
        '🛠️ What are his skills?',
        '💼 Is he available for an internship?',
        '📫 How do I contact him?',
      ],
      actions: [
        { label: 'View Projects', type: 'scroll', target: 'projects', icon: '🚀' },
        { label: 'Contact Someshwar', type: 'scroll', target: 'contact', icon: '📬' },
      ],
    };
  }

  // 2.2. WHO MADE YOU / CREATOR
  if (
    containsAny([
      'who made you',
      'who created you',
      'who built you',
      'who developed you',
      'who is your creator',
      'your author',
    ])
  ) {
    return {
      text: `👨‍💻 **I was handcrafted by Someshwar Songara!**

Someshwar built me as a dedicated, lightweight interactive portfolio assistant to help recruiters and visitors learn about his projects, skills, and background with zero latency.`,
      suggestions: ['👨‍💻 Tell me more about Someshwar', '🚀 Show me his projects', '📫 Contact Someshwar'],
      actions: [
        { label: 'About Someshwar', type: 'scroll', target: 'about', icon: '📖' },
        { label: 'Get in Touch', type: 'scroll', target: 'contact', icon: '✉️' },
      ],
    };
  }

  // 2.3. THANK YOU / GOODBYE
  if (
    containsAny([
      'thank you',
      'thanks',
      'thx',
      'thank u',
      'appreciate',
      'bye',
      'goodbye',
      'see you',
      'cya',
      'awesome',
      'great job',
      'good bot',
    ])
  ) {
    return {
      text: `😊 **You're very welcome!**

Thank you for visiting Someshwar's portfolio. Feel free to explore his projects, check out his code on GitHub, or drop him a message anytime!`,
      suggestions: ['🚀 Show projects one more time', '📫 Leave a message in contact form', '💼 View LinkedIn'],
      actions: [
        { label: 'Open Contact Form', type: 'scroll', target: 'contact', icon: '✉️' },
        { label: 'View GitHub', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 3. SPECIFIC PROJECT: IP CHAT
  if (containsAny(['ip chat', 'ipchat', 'p2p chat', 'peer to peer', 'chat app', 'ip-chat'])) {
    const proj = SOMESHWAR_DATA.projects.find((p) => p.id === 'ip-chat');
    return {
      text: `💬 **IP Chat — Real-time P2P Web Chat**

${proj.summary}

🔑 **Key Highlights:**
- **Stack:** JavaScript, HTML/CSS, Node.js, WebSockets
- **Features:** Direct network peer messaging, instant connection rooms, responsive UI, zero-leak privacy design.
- **Status:** Fully deployed and live on Vercel!

Would you like to test the live chat demo or view the source code?`,
      projectCards: [proj],
      suggestions: ['🚀 Show other projects', '🛠️ What other web apps has he made?', '📫 Contact Someshwar'],
      actions: [
        { label: 'Open Live Demo 🌐', type: 'link', url: proj.demoUrl, icon: '🔗' },
        { label: 'View GitHub Repo', type: 'link', url: proj.githubUrl, icon: '⭐' },
        { label: 'Jump to Section', type: 'scroll', target: 'projects', icon: '📌' },
      ],
    };
  }

  // 4. SPECIFIC PROJECT: HOSPITAL MANAGEMENT
  if (containsAny(['hospital', 'hospital 2.0', 'hospital management', 'healthcare'])) {
    const proj = SOMESHWAR_DATA.projects.find((p) => p.id === 'hospital-2');
    return {
      text: `🏥 **Hospital Management 2.0**

${proj.summary}

🔑 **Key Highlights:**
- **Stack:** PHP, MySQL, JavaScript, HTML5/CSS3
- **Features:** Patient electronic records, appointment management, doctor scheduling, and prescription workflows.
- **Why it matters:** Demonstrates full-stack CRUD architecture, relational database integrity, and practical software engineering for enterprise domains.`,
      projectCards: [proj],
      suggestions: ['📓 What is Academic Diary?', '💬 Tell me about IP Chat', '🛠️ Tell me about his PHP experience'],
      actions: [
        { label: 'View on GitHub', type: 'link', url: proj.githubUrl, icon: '⭐' },
        { label: 'View Projects on Page', type: 'scroll', target: 'projects', icon: '🚀' },
      ],
    };
  }

  // 5. SPECIFIC PROJECT: ACADEMIC DIARY
  if (containsAny(['academic diary', 'academic', 'diary', 'student app', 'notes app'])) {
    const proj = SOMESHWAR_DATA.projects.find((p) => p.id === 'academic-diary');
    return {
      text: `📓 **Academic Diary — Student Productivity Web App**

${proj.summary}

🔑 **Key Highlights:**
- **Stack:** PHP, MySQL, JavaScript, HTML/CSS
- **Problem Solved:** Helps college students track chaotic schedules, assignment deadlines, lecture notes, and syllabus milestones in one organized hub.
- Built to solve a real, everyday challenge that Someshwar and his college peers experienced!`,
      projectCards: [proj],
      suggestions: ['🏥 Tell me about Hospital Management', '💬 Tell me about IP Chat', '📱 Does he have Android apps?'],
      actions: [
        { label: 'View on GitHub', type: 'link', url: proj.githubUrl, icon: '⭐' },
        { label: 'View in Portfolio', type: 'scroll', target: 'projects', icon: '📌' },
      ],
    };
  }

  // 6. SPECIFIC PROJECT: WEATHER APP / ANDROID
  if (containsAny(['weather', 'weather app', 'android app', 'mobile app', 'firebase app'])) {
    const proj = SOMESHWAR_DATA.projects.find((p) => p.id === 'weather-app');
    return {
      text: `🌦️ **Weather App (Native Android)**

${proj.summary}

🔑 **Key Highlights:**
- **Stack:** Java, Android Studio, Firebase, OpenWeather API
- **Features:** GPS auto-location detection, 5-day weather forecast, humidity & wind metrics, and real-time push alerts for unexpected rainfall or severe storms.
- Showcases Someshwar's ability to build native mobile user experiences with asynchronous API data handling.`,
      projectCards: [proj],
      suggestions: ['🤖 Tell me about Jarvis AI', '💬 Show web apps', '🛠️ What are his Android skills?'],
      actions: [
        { label: 'Someshwar GitHub', type: 'link', url: proj.githubUrl, icon: '⭐' },
        { label: 'View Projects', type: 'scroll', target: 'projects', icon: '🚀' },
      ],
    };
  }

  // 7. SPECIFIC PROJECT: JARVIS / LOCAL AI
  if (containsAny(['jarvis', 'ai assistant', 'voice assistant', 'local ai', 'speech recognition', 'llm', 'python ai'])) {
    const proj = SOMESHWAR_DATA.projects.find((p) => p.id === 'jarvis-ai');
    return {
      text: `🤖 **Jarvis Local AI Assistant (Under Active Development)**

${proj.summary}

🔑 **Key Highlights:**
- **Stack:** Python, Local LLM inference (e.g. Ollama/edge models), Speech Recognition, PyAudio
- **Philosophy:** Privacy-first intelligence. Unlike commercial assistants that ship audio to the cloud, Jarvis operates locally to automate desktop tasks, search info, and reason over data securely.`,
      projectCards: [proj],
      suggestions: ['🛠️ Tell me about his Python & AI skills', '🚀 Show all projects', '💼 Hire Someshwar'],
      actions: [
        { label: 'Explore GitHub Profile', type: 'link', url: proj.githubUrl, icon: '⭐' },
        { label: 'View on Page', type: 'scroll', target: 'projects', icon: '📌' },
      ],
    };
  }

  // 7.5. LIVE DEMOS
  if (containsAny(['live demo', 'live app', 'demo link', 'working demo', 'try it out', 'deployed'])) {
    const liveProjects = SOMESHWAR_DATA.projects.filter((p) => p.demoUrl);
    return {
      text: `🌐 **Live Working Project Demos**

You can test these applications right now in your browser:

1. **IP Chat** 💬 — Real-time peer-to-peer web chat with WebSockets.
   👉 [Open IP Chat Demo](https://ip-chat-rho.vercel.app)
2. **Dev Journal Portfolio** 📓 — This interactive React portfolio website!
   👉 [Open Portfolio](https://portfolio-chi-eight-36.vercel.app)

Check out the interactive cards below:`,
      projectCards: liveProjects,
      suggestions: ['💬 Tell me more about IP Chat', '🚀 Show all 6 projects', '📫 Contact Someshwar'],
      actions: [
        { label: 'Launch IP Chat 🚀', type: 'link', url: 'https://ip-chat-rho.vercel.app', icon: '🌐' },
        { label: 'View on GitHub', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 7.6. SPECIFIC PROJECT: DEV JOURNAL PORTFOLIO
  if (
    containsAny([
      'portfolio project',
      'this website',
      'this site',
      'this portfolio',
      'dev journal',
      'corkboard',
      'how this was made',
      'portfolio repo',
    ])
  ) {
    const proj = SOMESHWAR_DATA.projects.find((p) => p.id === 'portfolio');
    return {
      text: `🌐 **Personal Portfolio — Dev Journal Aesthetic**

${proj.summary}

🔑 **Key Highlights:**
- **Stack:** React 18, Vite, pure Vanilla CSS, Canvas Confetti
- **Features:** Handcrafted tactile corkboard aesthetic, dynamic live GitHub synchronization, dark/light mode toggle, sound effects, and this responsive built-in AI assistant!
- **Performance:** Optimized for speed with zero bloat and smooth 60fps animations.`,
      projectCards: [proj],
      suggestions: ['💬 Tell me about IP Chat', '🏥 Tell me about Hospital 2.0', '🛠️ What skills does he have?'],
      actions: [
        { label: 'View Source Code 🐙', type: 'link', url: proj.githubUrl, icon: '⭐' },
        { label: 'Open Live Demo 🌐', type: 'link', url: proj.demoUrl, icon: '🔗' },
      ],
    };
  }

  // 8. GENERAL PROJECTS / PORTFOLIO WORK
  if (containsAny(['project', 'projects', 'portfolio', 'what have you built', 'work', 'showcase', 'apps', 'demos'])) {
    return {
      text: `🚀 **Someshwar's Featured Projects**

Here are Someshwar's key projects in priority order:

1. **IP Chat** 💬 *(Web App / WebSockets / Live on Vercel)*
2. **Personal Portfolio** 🌐 *(React 18 / Dev Journal / GitHub Sync)*
3. **Weather App** 🌦️ *(Native Android / Java / Firebase)*
4. **Hospital Management 2.0** 🏥 *(Full-Stack PHP / MySQL)*
5. **Academic Diary** 📓 *(Student Productivity / PHP / MySQL)*
6. **Jarvis Local AI Assistant** 🤖 *(Python / Local LLMs / Active Build)*

Tap any interactive card below to test live demos or view source code:`,
      projectCards: SOMESHWAR_DATA.projects,
      suggestions: [
        '💬 Tell me about IP Chat',
        '🌦️ Tell me about Weather App',
        '🏥 Tell me about Hospital 2.0',
        '🤖 Tell me about Jarvis AI',
      ],
      actions: [
        { label: 'Scroll to Projects Section', type: 'scroll', target: 'projects', icon: '📂' },
        { label: 'Visit GitHub (5+ Repos)', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 9. SKILLS / TECH STACK / LANGUAGES
  if (
    containsAny([
      'skill',
      'skills',
      'tech stack',
      'technology',
      'technologies',
      'what languages',
      'programming languages',
      'stack',
      'what do you know',
      'tools',
    ])
  ) {
    return {
      text: `🛠️ **Someshwar's Technical Skill Set**

Here is a breakdown of what Someshwar works with:

- **⌨️ Languages:** Java, Python, C++, C, JavaScript (ES6+), PHP, SQL, HTML5, CSS3
- **🌐 Web Development:** React.js, Node.js, WebSockets, REST APIs, Vite, Vanilla CSS design systems
- **📱 Android Development:** Native Android (Java), Android Studio, Firebase Realtime DB & Auth
- **🔧 Tools & Platforms:** Git, GitHub, VS Code, Android Studio, XAMPP, Postman, Vercel
- **🤖 AI & Emerging:** Local LLMs (Ollama), Speech Recognition, Python automation

Someshwar focuses heavily on understanding **fundamentals (OOP, Data Structures)** so he can adapt rapidly to any team's tech stack!`,
      suggestions: [
        '💻 Tell me about React experience',
        '📱 Tell me about Android experience',
        '🤖 Tell me about AI/Python experience',
        '🚀 Show projects built with these',
      ],
      actions: [
        { label: 'View Skills Section', type: 'scroll', target: 'skills', icon: '🎯' },
        { label: 'See Project Implementations', type: 'scroll', target: 'projects', icon: '🚀' },
      ],
    };
  }

  // 10. SPECIFIC TECH: REACT
  if (containsAny(['react', 'reactjs', 'react.js', 'frontend'])) {
    return {
      text: `⚛️ **Someshwar's React & Frontend Expertise**

Someshwar has solid hands-on experience building modern, high-performance React frontends:
- **Component Architecture:** Clean modular design, custom React hooks (e.g. \`useGitHubData\`, \`useTheme\`, \`useScrollReveal\`).
- **Interactive UI:** Crafted this custom dev-journal portfolio with sticky-note physics, smooth scroll observers, zero TBT (Total Blocking Time) optimizations, and this live AI chatbot!
- **State Management & Modern APIs:** Experienced with modern ES6+, async/await, REST API integration, and responsive CSS systems.`,
      suggestions: ['🚀 What React projects has he made?', '🛠️ What other skills does he have?', '📫 Contact him'],
      actions: [
        { label: 'Scroll to Projects', type: 'scroll', target: 'projects', icon: '📂' },
        { label: 'GitHub Profile', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 11. SPECIFIC TECH: JAVA & ANDROID
  if (containsAny(['java', 'android', 'android studio', 'mobile', 'firebase'])) {
    return {
      text: `📱 **Someshwar's Java & Android Expertise**

- **Language:** Strong grasp of Object-Oriented Programming (OOP) in **Java**, encapsulation, inheritance, polymorphism, and collections.
- **Android Studio:** Built native Android applications like the **Weather App**, handling Activity lifecycles, background services, and UI components.
- **Firebase:** Integrated Firebase Authentication and Realtime Database for mobile and web backends.`,
      suggestions: ['🌦️ Tell me about Weather App', '🛠️ What other languages does he know?', '🚀 Show all projects'],
      actions: [
        { label: 'View Weather App', type: 'scroll', target: 'projects', icon: '🌦️' },
        { label: 'See Skills', type: 'scroll', target: 'skills', icon: '📱' },
      ],
    };
  }

  // 12. SPECIFIC TECH: PYTHON & AI
  if (containsAny(['python', 'ai', 'llm', 'machine learning', 'artificial intelligence', 'speech', 'ollama'])) {
    return {
      text: `🤖 **Someshwar's Python & AI/LLM Exploration**

Someshwar is fascinated by the future of software engineering at the intersection of AI:
- **Python:** Scripting, API interaction, audio/voice processing with PyAudio & SpeechRecognition.
- **Local LLMs:** Experimenting with offline model runners (like Ollama and open weights) for privacy-centric AI agents.
- **Jarvis Assistant:** Building a locally hosted voice automation assistant capable of reasoning and automating routine tasks.`,
      suggestions: ['🤖 How does Jarvis work?', '🛠️ Show all skills', '🎓 What is his education?'],
      actions: [
        { label: 'See Projects', type: 'scroll', target: 'projects', icon: '🤖' },
        { label: 'What I Bring', type: 'scroll', target: 'about', icon: '💡' },
      ],
    };
  }

  // 13. SPECIFIC TECH: PHP & MYSQL / BACKEND
  if (containsAny(['php', 'mysql', 'sql', 'backend', 'database', 'xampp'])) {
    return {
      text: `🐘 **Someshwar's PHP, MySQL & Backend Skills**

Someshwar has practical experience with full-stack server-side scripting:
- **Backend Architecture:** Built complete systems with PHP, structured REST endpoints, and secure session management.
- **Relational Databases:** Designed relational schemas, normalized tables, and optimized SQL queries in **MySQL** (Hospital Management 2.0 & Academic Diary).
- **Environment:** Proficient with XAMPP, Apache server setup, and database migrations.`,
      suggestions: ['🏥 Tell me about Hospital 2.0', '📓 Tell me about Academic Diary', '🛠️ Show all skills'],
      actions: [
        { label: 'View Hospital 2.0', type: 'scroll', target: 'projects', icon: '🏥' },
        { label: 'View Academic Diary', type: 'scroll', target: 'projects', icon: '📓' },
      ],
    };
  }

  // 13.5. SPECIFIC TECH: C / C++
  if (containsAny(['c++', 'cpp', 'c language', 'c programming'])) {
    return {
      text: `⚙️ **Someshwar's C / C++ Knowledge**

- Solid understanding of systems programming fundamentals in **C and C++**.
- Core concepts: Memory management, pointers, object-oriented design in C++, and core data structures (arrays, linked lists, stacks, queues).
- Refined through rigorous academic coursework in both his Diploma and B.Tech.`,
      suggestions: ['🛠️ Show all programming languages', '🚀 View his projects', '🎓 Tell me about his education'],
      actions: [
        { label: 'See Skills', type: 'scroll', target: 'skills', icon: '🎯' },
        { label: 'View Projects', type: 'scroll', target: 'projects', icon: '🚀' },
      ],
    };
  }

  // 13.6. SPECIFIC TECH: GIT & GITHUB
  if (containsAny(['git', 'github', 'version control', 'repos', 'repositories', 'open source'])) {
    return {
      text: `🐙 **Someshwar's Git & GitHub Workflow**

- **Version Control:** Daily usage of Git for branching, committing, pull requests, and clean commit hygiene.
- **Repositories:** Active open-source repositories including IP Chat, Hospital 2.0, Academic Diary, and this Portfolio.
- **Deployments:** Continuous automated web deployments configured with Vercel and GitHub.`,
      suggestions: ['🚀 Show top repositories', '💬 Tell me about IP Chat', '📫 How do I contact him?'],
      actions: [
        { label: 'Visit Someshwar\'s GitHub', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
        { label: 'View Projects on Page', type: 'scroll', target: 'projects', icon: '📂' },
      ],
    };
  }

  // 14. INTERNSHIP / HIRE / AVAILABILITY / JOB
  if (
    containsAny([
      'intern',
      'internship',
      'hire',
      'hiring',
      'job',
      'available',
      'availability',
      'work with you',
      'recruit',
      'recruiter',
      'opportunity',
      'why hire',
      'why should we hire',
      'full time',
      'part time',
      'remote',
    ])
  ) {
    return {
      text: `💼 **Hiring & Internship Availability**

**Status:** 🟢 **Actively Open to Software Engineering Internships (2025–2026)!**

🌟 **Why hire Someshwar?**
1. **Practical Builder:** Doesn't just watch videos — builds real applications with PHP, MySQL, React, and Java that solve real problems.
2. **Solid CS Foundation:** Strong grasp of Data Structures, OOP, database design, and software fundamentals from his Diploma & B.Tech.
3. **Agile & Fast Learner:** Quickly grasps new tools, libraries, and frameworks.
4. **Great Communicator:** Proactive, humble, and eager to collaborate with mentor engineers and ship production code.
5. **Flexible:** Open to **Remote**, **Hybrid**, or **On-site** internships.

Would you like to get in touch with Someshwar or explore his code?`,
      suggestions: [
        '📫 How do I contact him?',
        '📄 Can I see his resume?',
        '🚀 Show me his top projects',
        '🔗 Open LinkedIn Profile',
      ],
      actions: [
        { label: 'Open Contact Form', type: 'scroll', target: 'contact', icon: '✉️' },
        { label: 'Connect on LinkedIn', type: 'link', url: SOMESHWAR_DATA.contact.linkedin, icon: '💼' },
        { label: 'Check GitHub Code', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 14.5. RELOCATION / JOINING DATE / NOTICE PERIOD
  if (containsAny(['immediate', 'notice period', 'when can he start', 'start date', 'relocate', 'relocation', 'joining', 'join immediately'])) {
    return {
      text: `⚡ **Availability, Relocation & Start Date**

- **Joining Date:** Available **immediately** for Summer/Fall 2025–2026 internships or junior software engineering roles!
- **Notice Period:** None (Immediate joinee).
- **Relocation:** 100% open to **Relocation** for on-site roles, as well as **Remote** or **Hybrid** setups worldwide.
- **Location:** Based in Ujjain, Madhya Pradesh, India (IST, UTC+5:30).`,
      suggestions: ['💼 Why should we hire him?', '📫 Send an internship message', '📄 Can I see his resume?'],
      actions: [
        { label: 'Jump to Contact Form', type: 'scroll', target: 'contact', icon: '✉️' },
        { label: 'LinkedIn Profile', type: 'link', url: SOMESHWAR_DATA.contact.linkedin, icon: '💼' },
      ],
    };
  }

  // 15. EDUCATION / COLLEGE / DEGREE / MIT UJJAIN
  if (
    containsAny([
      'education',
      'college',
      'university',
      'degree',
      'b tech',
      'btech',
      'mit ujjain',
      'polytechnic',
      'school',
      'study',
      'studying',
      'diploma',
      'student',
    ])
  ) {
    return {
      text: `🎓 **Someshwar's Academic Journey**

🏫 **1. B.Tech in Computer Science & Engineering (2025 – 2028)**
- **Institution:** MIT Group of Institutes, Ujjain, MP
- **Focus:** Advanced software engineering, algorithms, system design, modern full-stack web, and AI/LLM technologies.

📜 **2. Diploma in Computer Science (2022 – 2025)**
- **Institution:** Government Polytechnic College
- **Milestone:** Built solid foundational CS skills, wrote first real-world programs, and developed full database applications like Hospital Management.

📍 Both institutions have provided a strong theoretical backbone paired with rigorous practical development.`,
      suggestions: ['🚀 What projects did he build during college?', '🛠️ What skills did he learn?', '📫 Contact him'],
      actions: [
        { label: 'View Journey Section', type: 'scroll', target: 'journey', icon: '📜' },
        { label: 'View Skills', type: 'scroll', target: 'skills', icon: '💻' },
      ],
    };
  }

  // 16. CONTACT / EMAIL / LINKEDIN / GITHUB
  if (
    containsAny([
      'contact',
      'reach',
      'email',
      'phone',
      'message',
      'connect',
      'social',
      'socials',
      'linkedin',
      'github',
      'how to contact',
      'call',
    ])
  ) {
    return {
      text: `📫 **How to Connect with Someshwar**

Someshwar reads every message and replies quickly! Here are the best channels:

- 🌐 **Contact Form:** Send a message directly via the contact form on this page!
- 💼 **LinkedIn:** [linkedin.com/in/someshwar-songara](https://www.linkedin.com/in/someshwar-songara/)
- 🐙 **GitHub:** [github.com/someshwar-songara](https://www.github.com/someshwar-songara)

Click below to jump directly to the contact sheet or open his social profiles!`,
      suggestions: ['✉️ Take me to the contact form', '💼 View LinkedIn', '🚀 Show me projects first'],
      actions: [
        { label: 'Scroll to Contact Form ✍️', type: 'scroll', target: 'contact', icon: '✉️' },
        { label: 'LinkedIn Profile', type: 'link', url: SOMESHWAR_DATA.contact.linkedin, icon: '🔗' },
        { label: 'GitHub Repositories', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 17. RESUME / CV
  if (containsAny(['resume', 'cv', 'curriculum vitae', 'download resume', 'resume link'])) {
    return {
      text: `📄 **Someshwar's Resume / CV**

Someshwar is currently polishing an updated 2026 version of his resume tailored for upcoming software engineering internships!

In the meantime:
- You can explore his verified work and code directly on **GitHub** (5+ public repos).
- Review his professional journey on **LinkedIn**.
- Or send him a quick note via the **Contact form** to request the latest PDF copy directly!`,
      suggestions: ['📫 Send a message to request resume', '💼 View LinkedIn Profile', '🚀 See Projects'],
      actions: [
        { label: 'Jump to Contact Form', type: 'scroll', target: 'contact', icon: '✉️' },
        { label: 'LinkedIn Profile', type: 'link', url: SOMESHWAR_DATA.contact.linkedin, icon: '💼' },
        { label: 'GitHub Profile', type: 'link', url: SOMESHWAR_DATA.contact.github, icon: '🐙' },
      ],
    };
  }

  // 18. LOCATION / CITY / TIMEZONE
  if (containsAny(['location', 'where do you live', 'where is he', 'city', 'ujjain', 'madhya pradesh', 'india', 'timezone'])) {
    return {
      text: `📍 **Location & Timezone**

- **City:** Ujjain, Madhya Pradesh, India
- **Timezone:** Indian Standard Time (IST, UTC+5:30)
- **Work Preference:** Fully equipped and experienced with remote workflows (Git, GitHub, Vercel, Slack/Discord). Open to remote internships as well as relocation/hybrid roles.`,
      suggestions: ['💼 Is he open to remote work?', '📫 Contact him', '🚀 Show his projects'],
      actions: [
        { label: 'Read About Section', type: 'scroll', target: 'about', icon: '📖' },
        { label: 'Get in Touch', type: 'scroll', target: 'contact', icon: '📬' },
      ],
    };
  }

  // 19. FUN FACTS / JOKES / PERSONALITY
  if (containsAny(['fun fact', 'fact', 'joke', 'hobby', 'hobbies', 'free time', 'something cool', 'surprise me'])) {
    const randomFact =
      SOMESHWAR_DATA.funFacts[Math.floor(Math.random() * SOMESHWAR_DATA.funFacts.length)];
    return {
      text: `🎲 **Fun Fact About Someshwar:**

"${randomFact}"

💡 *Dev Joke:*
Why do programmers prefer dark mode?
... Because light attracts bugs! 🪲 (And it matches our sleek corkboard aesthetic!)`,
      suggestions: ['🎲 Tell me another fun fact!', '🚀 Show me his real projects', '🛠️ What are his skills?'],
      actions: [
        { label: 'View Portfolio Work', type: 'scroll', target: 'projects', icon: '🚀' },
      ],
    };
  }

  // 20. WHY HIRE SOMESHWAR / WHAT HE BRINGS
  if (containsAny(['what do you bring', 'what he brings', 'strengths', 'why choose someshwar'])) {
    return {
      text: `💡 **What Someshwar Brings to the Table**

1. **🧩 Practical Problem Solving:** Enjoys breaking complex requirements into modular, readable code.
2. **🔨 Builder Mentality:** Believes in learning through shipping real, tangible products.
3. **📐 Engineering Rigor:** Deep respect for clean architecture, OOP principles, and maintainable software.
4. **📡 Relentless Curiosity:** Constantly exploring modern web frameworks, Android, and AI models.`,
      suggestions: ['💼 Internship Availability', '🚀 Top Projects', '📫 Contact Form'],
      actions: [
        { label: 'Scroll to What I Bring', type: 'scroll', target: 'about', icon: '⭐' },
        { label: 'Contact Someshwar', type: 'scroll', target: 'contact', icon: '✉️' },
      ],
    };
  }

  // 21. FALLBACK INTELLIGENT MATCHING (Keyword Semantic Scoring)
  const keywords = [
    { keys: ['code', 'repo', 'git', 'github'], reply: 'Someshwar maintains active open-source projects on GitHub, including IP Chat, Hospital 2.0, and Academic Diary.', target: 'projects' },
    { keys: ['database', 'sql', 'query'], reply: 'Someshwar is experienced with MySQL relational schemas, database normalization, and Firebase Realtime DB.', target: 'skills' },
    { keys: ['hire', 'offer', 'opportunity', 'team'], reply: 'Someshwar is enthusiastically open to software engineering internships and junior dev positions!', target: 'contact' },
    { keys: ['design', 'ui', 'ux', 'css'], reply: 'Someshwar pays high attention to design details — look at the handwritten notes and responsive corkboard theme of this site!', target: 'about' },
  ];

  for (const item of keywords) {
    if (item.keys.some((k) => clean.includes(k))) {
      return {
        text: `💡 ${item.reply}

Would you like to explore that section on the page or ask something specific?`,
        suggestions: ['🚀 Show projects', '🛠️ List skills', '📫 Contact Someshwar'],
        actions: [{ label: 'Scroll to Section', type: 'scroll', target: item.target, icon: '📌' }],
      };
    }
  }

  // Final graceful fallback with helpful direction
  return {
    text: `🤔 I want to make sure I give you the best information about Someshwar!

Here are some popular topics you can ask me about:
- **"Tell me about your projects"** (IP Chat, Hospital 2.0, Weather App, Jarvis AI)
- **"What are your tech skills?"** (Languages, React, Android, Python, PHP)
- **"Are you open to internships?"** (Current status & hiring pitch)
- **"Where did you study?"** (B.Tech at MIT Ujjain & Diploma)
- **"How can I contact you?"** (LinkedIn, GitHub, or direct message)

Or tap one of the quick suggestions below:`,
    suggestions: [
      '👨‍💻 Tell me about yourself',
      '🚀 What projects have you built?',
      '🛠️ What are your skills?',
      '💼 Are you open to internships?',
      '📫 How can I contact you?',
    ],
    actions: [
      { label: 'Explore Projects', type: 'scroll', target: 'projects', icon: '🚀' },
      { label: 'Say Hello', type: 'scroll', target: 'contact', icon: '👋' },
    ],
  };
}
