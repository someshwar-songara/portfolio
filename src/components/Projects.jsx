export default function Projects({ projects }) {
  return (
    <section id="projects" className="section section--cork" aria-label="Projects">
      <div className="container">
        <header className="section-header reveal">
          <div className="section-badge-row">
            <span className="section-label section-label--light">📌 pinned to the board</span>
            <span className="sync-badge" title="Live sync enabled with GitHub API">
              <span className="sync-badge-dot"></span> Live GitHub Sync
            </span>
          </div>
          <h2 className="section-title section-title--light">Things I've Built</h2>
          <p className="section-note section-note--light">
            Real code. Real problems. Auto-synced with GitHub repositories.
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
              {/* Pin */}
              <div className={`project-pin ${project.pin_color || 'pin-red'}`} aria-hidden="true"></div>

              {project.wip && (
                <div className="wip-ribbon" aria-label="Under construction">
                  🚧 Under Construction
                </div>
              )}

              {/* Card header */}
              <div className="project-header">
                <span className="project-emoji" aria-hidden="true">
                  {project.emoji || '⚡'}
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

              {/* Tech badges */}
              <div className="tech-badges" aria-label="Technologies used">
                {project.tech?.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
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
                    GitHub
                  </a>
                ) : (
                  <span className="project-btn project-btn--disabled" aria-label="GitHub link coming soon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
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
