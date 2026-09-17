import { useState, useEffect } from 'react';

export default function Navbar({ isDark, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Resume configuration: replace null with URL if ready
  const resumeUrl = null;

  useEffect(() => {
    let ticking = false;
    function updateScroll() {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 32);

      const sectionIds = ['hero', 'about', 'projects', 'skills', 'journey', 'contact'];
      let current = 'hero';
      for (const id of sectionIds) {
        const sec = document.getElementById(id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top < 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`main-nav ${isScrolled ? 'scrolled' : ''}`}
      id="main-nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        {/* Logo */}
        <a
          href="#hero"
          className="nav-logo"
          aria-label="Someshwar Songara — Home"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <span className="nav-logo-text">
            Someshwar<span className="dot">.</span>
          </span>
          <span className="nav-tagline">dev journal</span>
        </a>

        {/* Hamburger (mobile) */}
        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="nav-links"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="nav-links" role="list">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'journey', label: 'Journey' },
            { id: 'contact', label: 'Contact' },
          ].map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side CTAs */}
        <div className="nav-actions" style={{ display: isOpen ? 'flex' : '' }}>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume"
              aria-label="Download Resume"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 16V4m0 12-4-4m4 4 4-4M4 20h16" />
              </svg>
              Resume
            </a>
          ) : (
            <span
              className="nav-resume nav-resume--disabled"
              title="Resume coming soon"
              aria-label="Resume coming soon"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 16V4m0 12-4-4m4 4 4-4M4 20h16" />
              </svg>
              Resume
            </span>
          )}

          <button
            className="theme-toggle"
            id="theme-toggle"
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            <svg
              className="theme-icon theme-icon--sun"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
            <svg
              className="theme-icon theme-icon--moon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 0 1 11.21 3a9 9 0 1 0 9.79 9.79Z"></path>
            </svg>
          </button>

          <a
            href="https://github.com/someshwar-songara"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            aria-label="View GitHub profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
