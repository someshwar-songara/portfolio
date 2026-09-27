export default function Hero({ profile }) {
  const publicRepos = profile?.public_repos ?? 5;

  const scrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" aria-label="Introduction">
      <div className="hero-ambient-glow hero-ambient-glow--1" aria-hidden="true"></div>
      <div className="hero-ambient-glow hero-ambient-glow--2" aria-hidden="true"></div>

      <div className="hero-inner">
        {/* LEFT ─ intro text */}
        <div className="hero-left">
          {/* Status badge */}
          <div className="hero-status" title="Actively seeking software engineering internship opportunities">
            <span className="status-beacon" aria-hidden="true">
              <span className="status-beacon-ring"></span>
              <span className="status-dot"></span>
            </span>
            <span className="hero-status-text">Open to Internships (2025–2026)</span>
            <span className="status-badge-sep" aria-hidden="true">·</span>
            <span className="status-remote-tag">Remote / On-site</span>
          </div>

          <p className="hero-greeting">Hi, I'm</p>

          <h1 className="hero-name">
            Someshwar <span className="hero-name-accent">Songara</span>
          </h1>

          <div className="hero-title-wrap">
            <span className="hero-title">Aspiring Software Engineer</span>
            <span className="hero-marker-stroke" aria-hidden="true"></span>
          </div>

          <div className="hero-tags" aria-label="Specializations">
            <span className="hero-tag-pill">🎓 B.Tech CSE</span>
            <span className="hero-tag-pill">🌐 Full-Stack Web</span>
            <span className="hero-tag-pill">📱 Native Android</span>
            <span className="hero-tag-pill">🤖 AI / LLM</span>
          </div>

          <p className="hero-description">
            Turning ideas into practical, user-focused products. I build robust web and Android applications, explore local AI/LLM automations, and focus on clean code and software craftsmanship.
          </p>

          {/* CTA buttons */}
          <div className="hero-ctas">
            <a href="#projects" className="btn-primary" onClick={scrollToProjects}>
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              View My Work
              <svg className="btn-arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <button
              type="button"
              className="btn-outline btn-hero-bot"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-chatbot'));
                document.getElementById('chatbot-trigger')?.click();
              }}
              title="Chat with Somesh AI Assistant"
            >
              <span className="btn-bot-icon" aria-hidden="true">🤖</span>
              Ask Somesh AI
            </button>

            <a
              href="https://github.com/someshwar-songara"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-hero-github"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            <span className="btn-outline btn-resume btn--disabled" title="Resume coming soon" aria-label="Resume coming soon" aria-disabled="true">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 16V4m0 12-4-4m4 4 4-4M4 20h16" />
              </svg>
              Resume
            </span>
          </div>
        </div>

        {/* RIGHT ─ avatar + quick-info note */}
        <div className="hero-right">
          <div className="avatar-wrap">
            <div className="avatar-ambient-glow" aria-hidden="true"></div>
            <div className="avatar-frame avatar-frame--square">
              <div className="avatar-pin" aria-hidden="true"></div>
              <picture>
                <source srcSet="/avatar.webp" type="image/webp" />
                <img
                  src="/avatar.jpg"
                  alt="Someshwar Songara"
                  width="220"
                  height="220"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            </div>
            <span className="avatar-location">📍 Ujjain, MP</span>
          </div>

          <div className="hero-info-note" aria-label="Quick Highlights">
            <div className="hero-note-tape" aria-hidden="true"></div>
            <div className="hero-note-pin" aria-hidden="true"></div>
            <div className="hero-note-header">
              <span className="hero-note-badge">Quick Profile</span>
              <span className="hero-note-dot"></span>
            </div>

            <div className="hero-note-list">
              <div className="hero-note-item">
                <span className="note-item-icon">🎓</span>
                <div className="note-item-text">
                  <strong>B.Tech CSE</strong>
                  <span>MIT Group of Institutes, Ujjain</span>
                </div>
              </div>

              <div className="hero-note-item">
                <span className="note-item-icon">💻</span>
                <div className="note-item-text">
                  <strong>Full-Stack &amp; Android</strong>
                  <span>React · PHP · Java · MySQL</span>
                </div>
              </div>

              <div className="hero-note-item">
                <span className="note-item-icon">🤖</span>
                <div className="note-item-text">
                  <strong>AI / Voice Assistant</strong>
                  <span>Python · Local LLM · Speech</span>
                </div>
              </div>

              <div className="hero-note-item">
                <span className="note-item-icon">🚀</span>
                <div className="note-item-text">
                  <strong>{publicRepos} Public Repos</strong>
                  <span>Active Open-Source Builder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="hand">scroll down</span>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
