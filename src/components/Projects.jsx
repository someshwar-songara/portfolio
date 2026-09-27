import { getProjectEmoji } from '../data/projects';

// Helper to provide tech icons for visual distinction
function getTechIcon(name = '') {
  const n = name.toLowerCase();
  if (n.includes('react')) return '⚛️';
  if (n.includes('javascript') || n === 'js') return '⚡';
  if (n.includes('php')) return '🐘';
  if (n.includes('mysql') || n.includes('sql')) return '🗄️';
  if (n.includes('node')) return '🟢';
  if (n.includes('socket')) return '💬';
  if (n.includes('android')) return '📱';
  if (n.includes('java')) return '☕';
  if (n.includes('firebase')) return '🔥';
  if (n.includes('python')) return '🐍';
  if (n.includes('weather api')) return '🌦️';
  if (n.includes('css') || n.includes('html')) return '🎨';
  if (n.includes('speech')) return '🎙️';
  if (n.includes('llm') || n.includes('ai')) return '🤖';
  return '⚙️';
}

export default function Projects({
  projects = [],
  syncStatus = 'synced',
  lastSynced = null,
  syncNow = () => {},
  rateLimitReset = null,
}) {
  const formatTime = (ts) => {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const getSyncTooltip = () => {
    if (syncStatus === 'syncing') return 'Fetching latest repository data from GitHub API...';
    if (syncStatus === 'rate-limited') {
      const resetTime = rateLimitReset ? formatTime(rateLimitReset * 1000) : '';
      return `GitHub API rate limit reached for this network${resetTime ? ` (resets ~${resetTime})` : ''}. Displaying verified cached project data. Click to recheck.`;
    }
    if (lastSynced) {
      return `Live synchronized with GitHub (Last checked: ${formatTime(lastSynced)}). Click to refresh now.`;
    }
    return 'Live sync connected to GitHub API. Click to refresh projects.';
  };

  return (
    <section id="projects" className="section section--cork" aria-label="Projects">
      <div className="container">
        <header className="section-header reveal">
          <div className="section-badge-row">
            <span className="section-label section-label--light">📌 pinned to the board</span>
            <button
              type="button"
              className={`sync-badge sync-badge--${syncStatus}`}
              onClick={() => syncNow()}
              disabled={syncStatus === 'syncing'}
              title={getSyncTooltip()}
              aria-label={getSyncTooltip()}
            >
              <span className={`sync-badge-dot sync-badge-dot--${syncStatus}`} aria-hidden="true"></span>
              <span className="sync-badge-label">
                {syncStatus === 'syncing'
                  ? 'Syncing GitHub...'
                  : syncStatus === 'rate-limited'
                  ? 'Live GitHub (Cached)'
                  : 'Live GitHub Sync'}
              </span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`sync-badge-icon ${syncStatus === 'syncing' ? 'sync-icon--spin' : ''}`}
                aria-hidden="true"
              >
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
            </button>
          </div>
          <h2 className="section-title section-title--light">Things I've Built</h2>
          <p className="section-note section-note--light">
            Real code. Real problems. Practical engineering projects from full-stack web to mobile &amp; edge AI.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <article
              key={`${project.name}-${i}`}
              className={`project-card ${project.color || 'sticky-yellow'}${
                project.wip ? ' project-card--wip' : ''
              } reveal reveal-delay-${(i % 3) + 1}`}
              style={{ '--card-rotate': project.rotate || '0deg' }}
              aria-label={`Project: ${project.name}`}
            >
              {/* Pushpin with realistic 3D shadow */}
              <div className={`project-pin ${project.pin_color || 'pin-red'}`} aria-hidden="true"></div>

              {project.wip && (
                <div className="wip-ribbon" aria-label="Under construction">
                  🚧 Active Build
                </div>
              )}

              {/* Card top mini window bar */}
              <div className="project-top-bar" aria-hidden="true">
                <div className="window-dots">
                  <span className="window-dot dot--red"></span>
                  <span className="window-dot dot--yellow"></span>
                  <span className="window-dot dot--green"></span>
                </div>
                <span className="project-branch-tag">git:main</span>
              </div>

              {/* Card header */}
              <div className="project-header">
                <span className="project-emoji" aria-hidden="true" title={project.name}>
                  {project.emoji || getProjectEmoji(project.name, project.description, project.tech)}
                </span>
                <div className="project-meta-tags">
                  {Boolean(project.stars) && (
                    <span className="project-star-tag" title={`${project.stars} GitHub stars`}>
                      ⭐ {project.stars}
                    </span>
                  )}
                  <span className="project-tag">{project.tag}</span>
                </div>
              </div>

              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.description}</p>

              {/* Tech badges with icons */}
              <div className="tech-badges" aria-label="Technologies used">
                {project.tech?.map((tech) => (
                  <span key={tech} className="tech-badge">
                    <span className="tech-badge-icon" aria-hidden="true">{getTechIcon(tech)}</span>
                    <span className="tech-badge-text">{tech}</span>
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="project-actions">
                {project.github_url ? (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn--github"
                    aria-label={`View ${project.name} source on GitHub`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                ) : (
                  <span className="project-btn project-btn--disabled" aria-label="GitHub link coming soon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Code Soon
                  </span>
                )}

                {project.demo_url ? (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn--demo"
                    aria-label={`View live demo of ${project.name}`}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                ) : (
                  <span className="project-btn project-btn--disabled" aria-label="Demo coming soon">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Demo Soon
                  </span>
                )}
              </div>

              {/* Corner fold decoration */}
              <span className="card-fold" aria-hidden="true"></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
