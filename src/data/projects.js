// Curated project metadata mapping
export const curatedMap = {
  'ip-chat': {
    name: 'IP Chat',
    description: 'Real-time peer-to-peer web chat application with live messaging and direct network connectivity.',
    tech: ['JavaScript', 'HTML/CSS', 'Node.js', 'WebSockets'],
    tag: 'Web App',
    emoji: '💬',
    color: 'sticky-blue',
    pin_color: 'pin-blue',
    rotate: '-1.5deg',
    demo_url: 'https://ip-chat-rho.vercel.app',
  },
  'Hospital-2.0': {
    name: 'Hospital Management 2.0',
    description: 'Comprehensive hospital management system designed to streamline patient records, appointments, and staff workflows.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    tag: 'Web App',
    emoji: '🏥',
    color: 'sticky-green',
    pin_color: 'pin-green',
    rotate: '1.2deg',
  },
  'academic-diary': {
    name: 'Academic Diary',
    description: 'Academic management web app to track assignments, deadlines, and notes — built to solve real student productivity problems.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    tag: 'Web App',
    emoji: '📓',
    color: 'sticky-yellow',
    pin_color: 'pin-red',
    rotate: '-2deg',
  },
  'portfolio': {
    name: 'Personal Portfolio',
    description: 'This dev journal portfolio — handcrafted with sticky-note physics, dynamic GitHub sync, and dark theme polish.',
    tech: ['React', 'CSS', 'JavaScript', 'PHP'],
    tag: 'Personal',
    emoji: '🌐',
    color: 'sticky-purple',
    pin_color: 'pin-blue',
    rotate: '-1deg',
    demo_url: 'https://portfolio-chi-eight-36.vercel.app',
  },
  'Weather-App': {
    name: 'Weather App',
    description: 'Location-aware Android weather monitoring application with real-time forecast alerts and notification triggers.',
    tech: ['Java', 'Android Studio', 'Firebase', 'Weather API'],
    tag: 'Android App',
    emoji: '🌦️',
    color: 'sticky-blue',
    pin_color: 'pin-blue',
    rotate: '1.5deg',
    demo_url: null,
  },
  'weather-app': {
    name: 'Weather App',
    description: 'Location-aware Android weather monitoring application with real-time forecast alerts and notification triggers.',
    tech: ['Java', 'Android Studio', 'Firebase', 'Weather API'],
    tag: 'Android App',
    emoji: '🌦️',
    color: 'sticky-blue',
    pin_color: 'pin-blue',
    rotate: '1.5deg',
    demo_url: null,
  },
};

export const emojiRules = [
  // Weather & Climate
  { match: [/\b(weather|climate|rain|monsoon|forecast|temp|temperature|cloud|sky|sunny|storm)\b/i], emoji: '🌦️' },
  // Medical & Healthcare
  { match: [/\b(hospital|clinic|doctor|patient|medical|health|healthcare|medicine|medic|pharmacy|nurse)\b/i], emoji: '🏥' },
  // Chat & Messaging
  { match: [/\b(chat|chats|message|messages|messaging|messenger|talk|forum|discuss|discussion|social|p2p|webrtc|socket|sockets)\b/i], emoji: '💬' },
  // AI, LLM, Assistant, Robots
  { match: [/\b(jarvis|assistant|ai|bot|voice|speech|speech-rec|llm|gpt|neural|nlp|ml)\b/i, /machine[\s_-]?learning/i, /deep[\s_-]?learning/i], emoji: '🤖' },
  // Crypto & Blockchain
  { match: [/\b(crypto|coin|coins|blockchain|token|tokens|wallet|btc|eth|solana|web3|bitcoin|ethereum)\b/i], emoji: '🪙' },
  // Finance & Banking
  { match: [/\b(finance|money|budget|expense|expenses|bank|banking|cash|pay|payment|invest|investment|stock|stocks)\b/i], emoji: '💰' },
  // Fitness & Gym
  { match: [/\b(fitness|gym|workout|exercise|training|running|steps|athlete|calisthenics)\b/i], emoji: '🏋️' },
  // Music & Audio
  { match: [/\b(music|audio|sound|song|songs|spotify|beats|podcast|melody|track|tracks|guitar|piano)\b/i], emoji: '🎵' },
  // Video & Movies
  { match: [/\b(video|videos|movie|movies|film|stream|streaming|youtube|cinema|media|clip)\b/i], emoji: '🎬' },
  // Gaming
  { match: [/\b(game|games|gaming|gamer|arcade|quest|rpg|unity|unreal|playstation|xbox)\b/i], emoji: '🎮' },
  // E-commerce & Shopping
  { match: [/\b(shop|store|cart|market|marketplace|ecommerce|checkout|retail|buy|sell)\b/i, /e[\s_-]?commerce/i], emoji: '🛒' },
  // Food & Restaurant
  { match: [/\b(food|restaurant|recipe|recipes|cook|cooking|meal|meals|kitchen|pizza|burger|dining|cafe|coffee)\b/i], emoji: '🍔' },
  // Academic, Diary, Notes & Education
  { match: [/\b(academic|diary|journal|student|study|school|college|book|books|notes|note|education|syllabus|assignment|homework)\b/i], emoji: '📓' },
  // Portfolio, Dev Site, Resume
  { match: [/\b(portfolio|resume|cv|bio|personal|website|profile)\b/i], emoji: '🌐' },
  // Productivity, Task & Todo
  { match: [/\b(task|tasks|todo|todos|kanban|planner|productivity|tracker|organize|checklist)\b/i], emoji: '📋' },
  // Math & Calculator
  { match: [/\b(calc|calculator|math|mathematics|formula|equation|matrix)\b/i], emoji: '🧮' },
  // Photography & Camera
  { match: [/\b(camera|photo|photos|photography|image|images|gallery|picture|pictures|vision|lens)\b/i], emoji: '📸' },
  // Security & Authentication
  { match: [/\b(security|auth|authentication|password|cipher|protect|shield|vault|safe|login|cyber)\b/i], emoji: '🛡️' },
  // Clock & Timer
  { match: [/\b(clock|timer|stopwatch|alarm|time|countdown)\b/i], emoji: '⏱️' },
  // Travel & Maps
  { match: [/\b(map|maps|gps|travel|tour|navigation|guide|places|compass|trip)\b/i], emoji: '🗺️' },
  // Quiz & Trivia
  { match: [/\b(quiz|quizzes|trivia|exam|test|mcq)\b/i], emoji: '❓' },
  // News & Blog
  { match: [/\b(news|blog|blogs|article|articles|feed|rss|paper|post|posts)\b/i], emoji: '📰' },
  // Email & Mailing
  { match: [/\b(email|mail|inbox|newsletter)\b/i], emoji: '📧' },
  // Vehicles & Automotive
  { match: [/\b(car|cars|vehicle|vehicles|auto|traffic|parking|drive|driving)\b/i], emoji: '🚗' },
  // Mobile Apps
  { match: [/\b(android|flutter|mobile|ios|phone|kotlin|swift)\b/i, /react[\s_-]?native/i], emoji: '📱' },
  // Code & Development tools
  { match: [/\b(code|dev|compiler|editor|ide|snippet|terminal|cli|script|debugger)\b/i], emoji: '💻' },
  // Cloud & Backend
  { match: [/\b(cloud|server|database|storage|sync|backend|docker|kubernetes|aws)\b/i], emoji: '☁️' },
  // Design & Creative
  { match: [/\b(art|design|drawing|draw|paint|painting|canvas|figma|ui|ux|graphic|creative)\b/i], emoji: '🎨' },
  // Tools & Utilities
  { match: [/\b(tool|tools|utility|utilities|settings|config|generator|converter)\b/i], emoji: '🛠️' },
];

export function normalizeProjectKey(name = '') {
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function findCuratedProject(repoName = '') {
  if (!repoName) return null;
  if (curatedMap[repoName]) return curatedMap[repoName];
  const normalized = normalizeProjectKey(repoName);
  for (const [key, val] of Object.entries(curatedMap)) {
    if (normalizeProjectKey(key) === normalized || normalizeProjectKey(val.name) === normalized) {
      return val;
    }
  }
  return null;
}

export function getProjectEmoji(name = '', description = '', tech = []) {
  // 1. Direct curated match check
  const curated = findCuratedProject(name);
  if (curated?.emoji) return curated.emoji;

  // 2. Keyword matching from name, description, and technologies
  const techStr = Array.isArray(tech) ? tech.join(' ') : String(tech || '');
  const text = `${name} ${description} ${techStr}`.replace(/[-_.]/g, ' ');

  for (const rule of emojiRules) {
    if (rule.match.some((regex) => regex.test(text))) {
      return rule.emoji;
    }
  }

  // 3. Fallback deterministic emoji based on project name so each project gets a unique, consistent emoji
  const fallbackEmojis = ['⚡', '💡', '🚀', '🔥', '✨', '🎯', '🛠️', '📦', '🔮', '🌟'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return fallbackEmojis[Math.abs(hash) % fallbackEmojis.length];
}

// Additional projects (e.g. Android apps, AI tools)
export const customProjects = [
  {
    name: 'Weather App',
    description: 'Location-aware Android weather monitoring application with real-time forecast alerts and notification triggers.',
    tech: ['Java', 'Android Studio', 'Firebase', 'Weather API'],
    tag: 'Android App',
    emoji: '🌦️',
    color: 'sticky-blue',
    pin_color: 'pin-blue',
    rotate: '1.5deg',
    github_url: 'https://github.com/someshwar-songara',
    demo_url: null,
    year: '2025',
  },
  {
    name: 'Jarvis Local AI Assistant',
    description: 'Local voice assistant that processes voice commands, triggers automations, and reasons via a local LLM backend.',
    tech: ['Python', 'Local LLM', 'Speech Recognition'],
    tag: '🚧 Under Construction',
    emoji: '🤖',
    color: 'sticky-pink',
    pin_color: 'pin-red',
    rotate: '2deg',
    github_url: 'https://github.com/someshwar-songara',
    demo_url: null,
    year: '2026',
    wip: true,
  },
];

export const paletteCycle = [
  { color: 'sticky-yellow', pin_color: 'pin-red', rotate: '-1.8deg' },
  { color: 'sticky-blue', pin_color: 'pin-blue', rotate: '1.4deg' },
  { color: 'sticky-green', pin_color: 'pin-green', rotate: '-1.2deg' },
  { color: 'sticky-pink', pin_color: 'pin-red', rotate: '1.8deg' },
  { color: 'sticky-purple', pin_color: 'pin-blue', rotate: '-1.5deg' },
];

export const defaultProjects = [
  {
    name: 'Academic Diary',
    description: 'Academic management web app to track assignments, deadlines and notes — built to solve real student productivity problems.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    tag: 'Web App',
    emoji: '📓',
    color: 'sticky-yellow',
    pin_color: 'pin-red',
    rotate: '-2deg',
    github_url: 'https://github.com/someshwar-songara/academic-diary',
    demo_url: null,
    year: '2026',
  },
  {
    name: 'Hospital Management 2.0',
    description: 'Comprehensive hospital management system designed to streamline patient records, appointments, and staff workflows.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    tag: 'Web App',
    emoji: '🏥',
    color: 'sticky-green',
    pin_color: 'pin-green',
    rotate: '1.2deg',
    github_url: 'https://github.com/someshwar-songara/Hospital-2.0',
    demo_url: null,
    year: '2026',
  },
  {
    name: 'IP Chat',
    description: 'Real-time peer-to-peer web chat application with live messaging and direct network connectivity.',
    tech: ['JavaScript', 'HTML/CSS', 'Node.js', 'WebSockets'],
    tag: 'Web App',
    emoji: '💬',
    color: 'sticky-blue',
    pin_color: 'pin-blue',
    rotate: '-1.5deg',
    github_url: 'https://github.com/someshwar-songara/ip-chat',
    demo_url: 'https://ip-chat-rho.vercel.app',
    year: '2026',
  },
  {
    name: 'Weather App',
    description: 'Android weather monitoring app that sends real-time notifications based on location-aware weather data.',
    tech: ['Java', 'Android', 'Firebase', 'Weather API'],
    tag: 'Android App',
    emoji: '🌦️',
    color: 'sticky-blue',
    pin_color: 'pin-blue',
    rotate: '1.5deg',
    github_url: 'https://github.com/someshwar-songara',
    demo_url: null,
    year: '2025',
  },
  {
    name: 'Personal Portfolio',
    description: 'This portfolio — a handwritten dev journal built in React with sticky-note cards, notebook textures and craft-style design.',
    tech: ['React', 'CSS', 'JavaScript'],
    tag: 'Personal',
    emoji: '🌐',
    color: 'sticky-purple',
    pin_color: 'pin-blue',
    rotate: '-1deg',
    github_url: 'https://github.com/someshwar-songara/portfolio',
    demo_url: 'https://portfolio-chi-eight-36.vercel.app',
    year: '2026',
  },
  {
    name: 'Jarvis Local AI Assistant',
    description: 'Local AI voice assistant that responds to voice commands using speech recognition and an LLM backend.',
    tech: ['Python', 'LLM', 'Speech Recognition'],
    tag: '🚧 Under Construction',
    emoji: '🤖',
    color: 'sticky-pink',
    pin_color: 'pin-red',
    rotate: '2deg',
    github_url: 'https://github.com/someshwar-songara',
    demo_url: null,
    year: '2026',
    wip: true,
  },
];
