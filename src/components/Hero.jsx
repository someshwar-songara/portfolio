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
      <div className="hero-inner">
        {/* LEFT ─ intro text */}
        <div className="hero-left">
          {/* Status badge */}
          <div className="hero-status">
            <span className="status-dot" aria-hidden="true"></span>
            Open to Internships
          </div>

          <p className="hero-greeting">Hi, I'm</p>

          <h1 className="hero-name">Someshwar Songara</h1>

          <p className="hero-title">Aspiring Software Engineer</p>

          <p className="hero-subtitle">
            B.Tech CSE Student&nbsp;&nbsp;·&nbsp;&nbsp;Web Developer&nbsp;&nbsp;·&nbsp;&nbsp;Android Developer
          </p>

          <p className="hero-description">
            I build practical web and Android applications and explore AI/LLM technologies.
          </p>

          {/* CTA buttons */}
          <div className="hero-ctas">
            <a href="#projects" className="btn-primary" onClick={scrollToProjects}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              View My Work
            </a>

            <span className="btn-outline btn-resume btn--disabled" title="Resume coming soon">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 16V4m0 12-4-4m4 4 4-4M4 20h16" />
              </svg>
              Resume — Soon
            </span>

            <a
              href="https://github.com/someshwar-songara"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* RIGHT ─ avatar + quick-info note */}
        <div className="hero-right">
          <div className="avatar-wrap">
            <div className="avatar-frame avatar-frame--square">
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

          <div className="hero-info-note">
            <p>🎓 <strong>B.Tech CSE</strong> · MIT Group of Institutes, Ujjain</p>
            <p>📅 <strong>2025 – 2028</strong></p>
            <p>💻 Web + Android Developer</p>
            <p>🤖 Exploring AI / LLM</p>
            <p>🚀 <strong>{publicRepos} Public Repos</strong> on GitHub</p>
            <p>🤝 Open to internships &amp; collaborations</p>
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
