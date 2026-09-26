export default function About() {
  return (
    <section id="about" className="section" aria-label="About Someshwar">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">journal entry</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-note">A glimpse into my background, mindset, and what drives me to build.</p>
        </header>

        <div className="about-grid">
          {/* Journal letter */}
          <article className="journal-entry reveal" aria-label="Personal introduction">
            <div className="journal-top-row">
              <p className="journal-date">📍 Ujjain, Madhya Pradesh · 2026</p>
              <div className="journal-stamp" aria-hidden="true">
                <span className="stamp-inner">PASSIONATE BUILDER</span>
              </div>
            </div>

            <h3 className="journal-salutation">Hi, I'm Someshwar —</h3>

            <div className="journal-body">
              <p>
                A Computer Science student and aspiring software engineer from Ujjain. I enjoy building high-performance web and Android applications and exploring AI/LLM technologies.
              </p>
              <p>
                I like turning complex ideas into practical, <span className="journal-highlight">user-focused products</span> while continuously improving my programming, system design, and software craftsmanship skills.
              </p>
              <p>
                I don't just follow tutorials — I build real things. A hospital management system, an academic productivity diary, and a local voice AI assistant. Software that solves actual daily challenges.
              </p>
              <p>
                The goal right now: <span className="journal-highlight">land a meaningful software engineering internship</span> where I can contribute to production software, collaborate with mentor engineers, and ship code that matters.
              </p>
              <p className="journal-sign">— Someshwar Songara</p>
            </div>
          </article>

          {/* Info cards column */}
          <div className="about-cards" aria-label="Quick facts">
            <div className="info-card reveal reveal-delay-1">
              <span className="info-card-icon" aria-hidden="true">🎓</span>
              <div>
                <p className="info-card-title">B.Tech CSE</p>
                <p className="info-card-sub">MIT Group of Institutes, Ujjain (2025–2028)</p>
              </div>
            </div>

            <div className="info-card reveal reveal-delay-2">
              <span className="info-card-icon" aria-hidden="true">📍</span>
              <div>
                <p className="info-card-title">Ujjain, India</p>
                <p className="info-card-sub">Available Remotely &amp; Relocation</p>
              </div>
            </div>

            <div className="info-card reveal reveal-delay-3">
              <span className="info-card-icon" aria-hidden="true">💻</span>
              <div>
                <p className="info-card-title">Full-Stack &amp; Android</p>
                <p className="info-card-sub">React, PHP, Java, JavaScript, MySQL</p>
              </div>
            </div>

            <div className="info-card reveal reveal-delay-4">
              <span className="info-card-icon" aria-hidden="true">🤖</span>
              <div>
                <p className="info-card-title">AI &amp; Speech Tech</p>
                <p className="info-card-sub">Python, Local LLMs, Edge Automations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
