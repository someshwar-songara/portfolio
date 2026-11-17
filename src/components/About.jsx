import { useTilt3D } from '../hooks/useTilt3D';

function InfoCardItem({ icon, title, sub, delay }) {
  const tiltRef = useTilt3D({ max: 6, scale: 1.02, perspective: 800, glare: true });
  return (
    <div ref={tiltRef} className={`info-card has-3d-glare reveal reveal-delay-${delay}`}>
      <div className="info-card-tape" aria-hidden="true"></div>
      <div className="glare-layer" aria-hidden="true"></div>
      <span className="info-card-icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="info-card-title">{title}</p>
        <p className="info-card-sub">{sub}</p>
      </div>
    </div>
  );
}

export default function About() {
  const journalTiltRef = useTilt3D({ max: 3, scale: 1.008, perspective: 1200, glare: true });

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
          <article ref={journalTiltRef} className="journal-entry has-3d-glare reveal" aria-label="Personal introduction">
            <div className="glare-layer" aria-hidden="true"></div>
            {/* Realistic Binder Holes */}
            <div className="journal-binder-holes" aria-hidden="true">
              <span className="binder-hole"></span>
              <span className="binder-hole"></span>
              <span className="binder-hole"></span>
            </div>

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
                The goal right now: <span className="journal-highlight journal-highlight--emerald">land a meaningful software engineering internship</span> where I can contribute to production software, collaborate with mentor engineers, and ship code that matters.
              </p>
              <p className="journal-sign">— Someshwar Songara</p>
            </div>
          </article>

          {/* Info cards column */}
          <div className="about-cards" aria-label="Quick facts">
            <InfoCardItem
              icon="🎓"
              title="B.Tech CSE"
              sub="MIT Group of Institutes, Ujjain (2025–2028)"
              delay={1}
            />
            <InfoCardItem
              icon="📍"
              title="Ujjain, India"
              sub="Available Remotely & Relocation"
              delay={2}
            />
            <InfoCardItem
              icon="💻"
              title="Full-Stack & Android"
              sub="React, PHP, Java, JavaScript, MySQL"
              delay={3}
            />
            <InfoCardItem
              icon="🤖"
              title="AI & Speech Tech"
              sub="Python, Local LLMs, Edge Automations"
              delay={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
