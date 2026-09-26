import { timelineData } from '../data/skills';

export default function Journey() {
  const milestoneTags = {
    'Diploma in Computer Science': ['C / C++', 'Java Fundamentals', 'OOP', 'MySQL', 'First Android App'],
    'B.Tech — Computer Science & Engineering': ['Software Engineering', 'Algorithms', 'Web Architecture', 'Local LLM & AI', 'Android Studio'],
  };

  return (
    <section id="journey" className="section" aria-label="Education and journey">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">academic journey</span>
          <h2 className="section-title">My Journey &amp; Milestones</h2>
          <p className="section-note">Where I've studied and what I've built along the way.</p>
        </header>

        <ul className="timeline">
          {timelineData.map((event, ti) => {
            const isCurrent = event.year.includes('2028');
            const tags = milestoneTags[event.title] || [];

            return (
              <li
                key={event.title}
                className={`timeline-item timeline-item--${event.side} reveal reveal-delay-${(ti % 3) + 1}`}
              >
                {/* Content note */}
                <div className="timeline-content">
                  <div className={`timeline-note ${isCurrent ? 'timeline-note--active' : ''}`}>
                    <div className="timeline-note-top">
                      <span className="timeline-year">{event.year}</span>
                      {isCurrent ? (
                        <span className="timeline-status-badge timeline-status-badge--active">
                          <span className="timeline-pulse-dot" aria-hidden="true"></span>
                          Currently Pursuing
                        </span>
                      ) : (
                        <span className="timeline-status-badge timeline-status-badge--done">
                          Completed
                        </span>
                      )}
                    </div>

                    <h3 className="timeline-title">{event.title}</h3>
                    <p className="timeline-place">📍 {event.place}</p>
                    <p className="timeline-desc">{event.desc}</p>

                    {tags.length > 0 && (
                      <div className="timeline-tags">
                        {tags.map((tag) => (
                          <span key={tag} className="timeline-tag-chip">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Centre icon node with animated glow */}
                <div className="timeline-node" aria-hidden="true">
                  <div className={`timeline-icon ${isCurrent ? 'timeline-icon--active' : ''}`}>
                    {event.icon}
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="timeline-content timeline-content--spacer" aria-hidden="true"></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
