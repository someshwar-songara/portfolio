export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="modern-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main 4-column modern grid */}
        <div className="footer-grid">
          {/* Column 1: Personal Branding */}
          <div className="footer-col footer-col--brand">
            <a
              href="#hero"
              className="footer-brand-logo"
              onClick={(e) => handleNavClick(e, 'hero')}
              aria-label="Someshwar Songara — Home"
            >
              <span className="footer-brand-name">
                Someshwar<span className="brand-dot">.</span>
              </span>
              <span className="footer-brand-badge">dev journal</span>
            </a>

            <p className="footer-brand-desc">
              B.Tech CSE student &amp; aspiring software engineer building practical web,
              Android, and AI-driven applications.
            </p>

            <div className="footer-status-pill">
              <span className="status-indicator"></span>
              <span>Open to internships &amp; collaborations</span>
            </div>

            <p className="footer-brand-location">
              📍 Ujjain, Madhya Pradesh, India &nbsp;&middot;&nbsp; ☕ Made with coffee &amp; curiosity
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col footer-col--nav">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list" role="list">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills & Stack' },
                { id: 'journey', label: 'Journey' },
                { id: 'contact', label: 'Contact' },
              ].map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="footer-nav-link"
                    onClick={(e) => handleNavClick(e, id)}
                  >
                    <span className="footer-link-arrow" aria-hidden="true">
                      →
                    </span>
                    <span className="footer-link-text">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media & Connect */}
          <div className="footer-col footer-col--social">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-social-links" role="list">
              <a
                href="https://github.com/someshwar-songara"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-card"
                role="listitem"
                aria-label="GitHub — someshwar-songara"
              >
                <div className="social-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div className="social-card-info">
                  <span className="social-card-name">GitHub</span>
                  <span className="social-card-handle">@someshwar-songara</span>
                </div>
                <svg className="social-card-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/someshwar-songara/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-card"
                role="listitem"
                aria-label="LinkedIn — someshwar-songara"
              >
                <div className="social-card-icon social-card-icon--linkedin">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="social-card-info">
                  <span className="social-card-name">LinkedIn</span>
                  <span className="social-card-handle">in/someshwar-songara</span>
                </div>
                <svg className="social-card-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="footer-social-card"
                role="listitem"
                aria-label="Send direct message"
              >
                <div className="social-card-icon social-card-icon--mail">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="social-card-info">
                  <span className="social-card-name">Quick Message</span>
                  <span className="social-card-handle">Drop me a note</span>
                </div>
                <svg className="social-card-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 4: Philosophy & Back to Top */}
          <div className="footer-col footer-col--motto">
            <h4 className="footer-col-title">Philosophy</h4>
            <blockquote className="footer-motto-card">
              <span className="motto-quote-mark">“</span>
              <p className="motto-text">
                Code is not just syntax — it's creativity, logic, and passion woven together.
              </p>
              <footer className="motto-author">— Someshwar Songara</footer>
            </blockquote>

            <div className="footer-tech-stack">
              <span className="tech-pill">⚡ React 18</span>
              <span className="tech-pill">⚡ Vite</span>
              <span className="tech-pill">🎨 Vanilla CSS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, details, and Scroll to Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {currentYear} <strong className="copyright-name">Someshwar Songara</strong>. Handcrafted with passion.
          </p>

          <p className="footer-academic">
            B.Tech CSE 2025–2028 &nbsp;&middot;&nbsp; MIT Group of Institutes, Ujjain
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
