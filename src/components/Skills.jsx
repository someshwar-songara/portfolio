import { skillsData } from '../data/skills';

function getSkillLogo(name = '') {
  const n = name.toLowerCase();
  if (n === 'java') return '☕';
  if (n === 'python') return '🐍';
  if (n === 'c++' || n === 'c') return '⚡';
  if (n.includes('react')) return '⚛️';
  if (n.includes('javascript') || n === 'js') return '🟡';
  if (n.includes('html')) return '🟧';
  if (n.includes('css')) return '🎨';
  if (n.includes('php')) return '🐘';
  if (n.includes('android')) return '🤖';
  if (n.includes('firebase')) return '🔥';
  if (n.includes('git')) return '🐙';
  if (n.includes('studio')) return '📱';
  if (n.includes('vs code')) return '💻';
  if (n.includes('llm') || n.includes('ai')) return '🧠';
  if (n.includes('speech')) return '🎙️';
  return '✨';
}

export default function Skills() {
  return (
    <section id="skills" className="section section--lined" aria-label="Skills">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">tools of the trade</span>
          <h2 className="section-title">Skills &amp; Tech Stack</h2>
          <p className="section-note">
            Core technologies I use to build real-world web, mobile, and AI solutions.
          </p>
        </header>

        <div className="skills-grid">
          {skillsData.map((group, si) => (
            <div key={group.category} className={`skill-group reveal reveal-delay-${(si % 3) + 1}`}>
              <div className="skill-group-top">
                <span className="skill-group-icon" aria-hidden="true">
                  {group.icon}
                </span>
                <h3 className="skill-group-title">{group.category}</h3>
                <span className="skill-count-badge">{group.items.length}</span>
              </div>

              <ul className="skill-chips" aria-label={`${group.category} skills`}>
                {group.items.map((skill) => (
                  <li key={skill} className="skill-chip" aria-label={skill}>
                    <span className="skill-chip-icon" aria-hidden="true">{getSkillLogo(skill)}</span>
                    <span className="skill-chip-text">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech Highlights Strip */}
        <div className="skills-highlights-bar reveal">
          <div className="highlight-stat">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years Learning &amp; Coding</span>
          </div>
          <div className="highlight-divider" aria-hidden="true"></div>
          <div className="highlight-stat">
            <span className="stat-number">12+</span>
            <span className="stat-label">Technologies &amp; Frameworks</span>
          </div>
          <div className="highlight-divider" aria-hidden="true"></div>
          <div className="highlight-stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">GitHub Repositories</span>
          </div>
          <div className="highlight-divider" aria-hidden="true"></div>
          <div className="highlight-stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Builder Mindset</span>
          </div>
        </div>
      </div>
    </section>
  );
}
