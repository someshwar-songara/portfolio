import { timelineData } from '../data/skills';

export default function Journey() {
  return (
    <section id="journey" className="section" aria-label="Education and journey">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">education &amp; journey</span>
          <h2 className="section-title">My Journey</h2>
          <p className="section-note">Where I've studied and what I've built along the way.</p>
        </header>

        <div className="timeline" role="list">
          {timelineData.map((event, ti) => (
            <div
              key={event.title}
              className={`timeline-item timeline-item--${event.side} reveal reveal-delay-${(ti % 3) + 1}`}
              role="listitem"
            >
              {/* Content note */}
              <div className="timeline-content">
                <div className="timeline-note">
                  <span className="timeline-year">{event.year}</span>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-place">📍 {event.place}</p>
                  <p className="timeline-desc">{event.desc}</p>
                </div>
              </div>

              {/* Centre icon */}
              <div className="timeline-node" aria-hidden="true">
                <div className="timeline-icon">{event.icon}</div>
              </div>

              {/* Spacer for opposite side */}
              <div className="timeline-content timeline-content--spacer" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
