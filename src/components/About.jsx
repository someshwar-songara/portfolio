export default function About() {
  return (
    <section id="about" className="section" aria-label="About Someshwar">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">journal entry</span>
          <h2 className="section-title">About Me</h2>
        </header>

        <div className="about-grid">
          {/* Journal letter */}
          <article className="journal-entry reveal" aria-label="Personal introduction">
            <p className="journal-date">Ujjain, Madhya Pradesh · 2026</p>
            <h3 className="journal-salutation">Hi, I'm Someshwar —</h3>
            <div className="journal-body">
              <p>
                A Computer Science student and aspiring software engineer from Ujjain. I enjoy building web and Android applications and exploring AI/LLM technologies.
              </p>
              <p>
                I like turning ideas into practical, <span className="journal-highlight">user-focused products</span> while continuously improving my programming and software engineering skills.
              </p>
              <p>
                I don't just follow tutorials — I build real things. A hospital management system, an academic diary app, a local AI assistant. Stuff that solves actual problems.
              </p>
              <p>
                The goal right now: <span className="journal-highlight">land a meaningful internship</span> where I can contribute, learn from experienced engineers, and ship things that matter.
              </p>
              <p className="journal-sign">— Someshwar</p>
            </div>
          </article>

          {/* Info cards column */}
          <div className="about-cards" aria-label="Quick facts">
            <div className="info-card reveal reveal-delay-1">
              <span className="info-card-icon" aria-hidden="true">🎓</span>
              <div>
                <p className="info-card-title">B.Tech CSE</p>
                <p className="info-card-sub">MIT Group of Institutes, Ujjain</p>
              </div>
            </div>

            <div className="info-card reveal reveal-delay-2">
              <span className="info-card-icon" aria-hidden="true">📍</span>
              <div>
                <p className="info-card-title">Ujjain, India</p>
                <p className="info-card-sub">Available remotely</p>
              </div>
            </div>

            <div className="info-card reveal reveal-delay-3">
              <span className="info-card-icon" aria-hidden="true">💻</span>
              <div>
                <p className="info-card-title">Web + Android</p>
                <p className="info-card-sub">PHP, Java, JavaScript, React</p>
              </div>
            </div>

            <div className="info-card reveal reveal-delay-4">
              <span className="info-card-icon" aria-hidden="true">🤖</span>
              <div>
                <p className="info-card-title">AI / LLM</p>
                <p className="info-card-sub">Python, Speech Recognition, Local AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
