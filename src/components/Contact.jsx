import { useState } from 'react';

export default function Contact() {
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactGithub = 'https://github.com/someshwar-songara';
  const contactLinkedin = 'https://www.linkedin.com/in/someshwar-songara/';
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyWm9_PaLQRyu8Aq6ETTKzrmD3Ut4D8i1BPupZaI6Lj-Bj0Uo-BloCv4qdoHgrrJw/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const data = new URLSearchParams();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);

      await fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString(),
        mode: 'no-cors'
      });

      setIsSent(true);
      setStatusMessage('Thanks! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setIsSent(false);
      }, 4000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatusMessage('Failed to send message. Please try again or reach out on LinkedIn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section section--cork" aria-label="Contact">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label section-label--light">say hello</span>
          <h2 className="section-title section-title--light">Let's Connect</h2>
          <p className="section-note section-note--light">
            Have a project idea, internship opportunity, or just want to connect?
          </p>
        </header>

        <div className="contact-sheet reveal">
          <div className="contact-grid">
            <div className="contact-inner contact-inner--links">
              <span className="contact-badge">Available for work</span>
              <h3 className="contact-heading">Drop me a line ✍️</h3>
              <p className="contact-sub">I read everything. I reply to almost everything.</p>

              <div className="contact-links" role="list">
                {/* GitHub */}
                <a
                  href={contactGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                  role="listitem"
                  aria-label="GitHub profile — github.com/someshwar-songara"
                >
                  <svg className="contact-icon" width="22" height="22" viewBox="0 0 24 24" fill="#1c1917" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <div>
                    <span className="link-label">GitHub</span>
                    <span className="link-value">github.com/someshwar-songara</span>
                  </div>
                  <svg className="link-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={contactLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                  role="listitem"
                  aria-label="LinkedIn profile — linkedin.com/in/someshwar-songara"
                >
                  <svg className="contact-icon" width="22" height="22" viewBox="0 0 24 24" fill="#0077b5" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div>
                    <span className="link-label">LinkedIn</span>
                    <span className="link-value">linkedin.com/in/someshwar-songara</span>
                  </div>
                  <svg className="link-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Email placeholder */}
                <div className="contact-link-item contact-link-item--placeholder" role="listitem" aria-label="Email coming soon">
                  <svg className="contact-icon" width="22" height="22" fill="none" stroke="#a8a29e" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <span className="link-label link-label--muted">Email</span>
                    <span className="link-value">coming soon</span>
                  </div>
                </div>
              </div>

              <div className="contact-cta-note">
                <p>📌 <strong>Open to:</strong> Internships · Collaborations · Open source · Dev conversations</p>
                <p>📍 Based in Ujjain, MP — available remotely</p>
              </div>
            </div>

            <div className="contact-inner contact-inner--form">
              <div className="contact-form-panel">
                <span className="contact-form-tag">Quick message</span>
                <h3 className="contact-form-title">Send a note</h3>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <label className="field">
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </label>

                  <label className="field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </label>

                  <label className="field field--textarea">
                    <span>Your Message</span>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Tell me about your idea, project, or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </label>

                  <button
                    type="submit"
                    className={`contact-submit ${isSent ? 'is-sent' : ''}`}
                    disabled={isSent || isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : isSent ? 'Message sent ✓' : 'Send message'}
                  </button>

                  {statusMessage && (
                    <p className="contact-form-status">{statusMessage}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
