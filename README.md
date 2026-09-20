# Someshwar Songara — Dev Journal Portfolio 📓

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Performance](https://img.shields.io/badge/Lighthouse-Optimized-00CC96?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developer.chrome.com/docs/lighthouse/)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

> A handcrafted, dev-journal inspired personal portfolio website with sticky notes, corkboard pinboard physics, live GitHub synchronization, and dark mode. Built with **React 18** and **Vite**, engineered for high performance and optimal Core Web Vitals.

🌐 **Live Demo:** [portfolio-chi-eight-36.vercel.app](https://portfolio-chi-eight-36.vercel.app/)
---
<img width="1912" height="908" alt="image" src="https://github.com/user-attachments/assets/4b0a7356-65fe-437c-b4a4-ac40800c85d7" />
---

## ✨ Features

- 📓 **Dev-Journal Aesthetic**: Lined paper textures, pushpin corkboard, handwritten fonts (`Caveat`, `Patrick Hand`), and sticky-note tilt effects.
- 🌓 **Day & Dark Theme**: Deep midnight paper mode (`#0b0f17`) with luminous sticky notes, customized ink tones, and auto-persisted theme preferences.
- ⚡ **Engineered for Core Web Vitals**:
  - **FCP & LCP ≤ 0.9s**: Preloaded high-efficiency WebP assets and non-blocking asynchronous Google Fonts.
  - **Zero Forced Reflows**: Pure asynchronous `IntersectionObserver` scroll reveals without DOM layout thrashing.
  - **Minimal Total Blocking Time (TBT)**: Sliced React hydration workload with `requestAnimationFrame` for buttery-smooth interactivity.
  - **GPU-Composited Animations**: 60fps animations driven solely by `transform` and `opacity`.
- 🔄 **Live GitHub Synchronization**: Real-time stats and project sync with the GitHub REST API, featuring instant offline cache fallbacks.
- ✏️ **Pencil Cursor & Ink Trail**: Custom desktop physics cursor with 6-dot lerp trail, interactive element hovering, and click ripples.
- 🧭 **Modern 4-Column Footer**: Streamlined footer with personal branding, status pill, structured site links, social media cards, and back-to-top smooth scrolling.
- 🕹️ **Konami Code Easter Egg**: Try typing the classic code (`↑ ↑ ↓ ↓ ← → ← → B A`) anywhere on the site!

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System with CSS variables & responsive layout tokens)
- **Data & APIs**: GitHub REST API v3 with bundled JSON cache fallbacks
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── avatar.webp          # High-efficiency LCP avatar image (5.4 KB)
│   ├── avatar.jpg           # Progressive JPEG fallback
│   └── robots.txt           # Search engine crawling rules
├── src/
│   ├── components/
│   │   ├── About.jsx        # Warm book-page journal letter & facts
│   │   ├── Contact.jsx      # Interactive note contact form & links
│   │   ├── Footer.jsx       # Modern 4-column clean grid footer
│   │   ├── Hero.jsx         # Intro banner, picture tag & quick-info note
│   │   ├── Journey.jsx      # Alternating timeline milestone notes
│   │   ├── KonamiEgg.jsx    # Secret Easter egg overlay
│   │   ├── Navbar.jsx       # Responsive header with scrollspy & theme toggle
│   │   ├── PencilCursor.jsx # Custom pen nib & physics ink trail
│   │   ├── Projects.jsx     # Pinned corkboard sticky note grid
│   │   ├── Skills.jsx       # Ruled notebook paper with categorized skill chips
│   │   └── WhatIBring.jsx   # Mindset & approach sticky cards
│   ├── data/
│   │   ├── githubCache.json        # Trimmed initial repository metadata
│   │   ├── githubProfileCache.json # Cached profile statistics
│   │   ├── projects.js             # Curated showcase project definitions
│   │   └── skills.js               # Technical skills list
│   ├── hooks/
│   │   ├── useGitHubData.js        # Dynamic GitHub sync with idle deferral
│   │   ├── useScrollReveal.js      # Non-blocking IntersectionObserver
│   │   └── useTheme.js             # Theme switching with localStorage persistence
│   ├── App.jsx              # App root with progressive two-stage hydration
│   ├── index.css            # Complete dev-journal aesthetic stylesheet
│   └── main.jsx             # React DOM entrypoint
├── index.html               # Semantic HTML shell with critical resource preloads
├── package.json             # Scripts & dependencies
└── vite.config.js           # Vite development and preview configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/someshwar-songara/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 👤 Author

**Someshwar Songara**
- 🎓 B.Tech Computer Science Engineering student from Ujjain, MP
- 💻 Web & Android Developer | Exploring AI / LLM
- 🌐 Portfolio: [portfolio-chi-eight-36.vercel.app](https://portfolio-chi-eight-36.vercel.app/)
- 🐙 GitHub: [@someshwar-songara](https://github.com/someshwar-songara)
- 🤝 Open to software engineering internships and collaborations!

---

