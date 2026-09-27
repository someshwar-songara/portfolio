import { useState } from 'react';
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

function getSkillClass(name = '') {
  const n = name.toLowerCase();
  if (n.includes('react')) return 'skill-react';
  if (n.includes('javascript') || n === 'js') return 'skill-js';
  if (n === 'python') return 'skill-python';
  if (n === 'java') return 'skill-java';
  if (n.includes('php')) return 'skill-php';
  if (n.includes('android')) return 'skill-android';
  if (n.includes('firebase')) return 'skill-firebase';
  if (n.includes('git')) return 'skill-git';
  if (n.includes('llm') || n.includes('ai')) return 'skill-ai';
  return 'skill-default';
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: '✨' },
    ...skillsData.map((s) => ({ id: s.category, label: s.category, icon: s.icon })),
  ];

  const displayedGroups =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section section--lined" aria-label="Skills">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">tools of the trade</span>
          <h2 className="section-title">Skills &amp; Tech Stack</h2>
          <p className="section-note">
            Core technologies I use to build real-world web, mobile, and AI solutions.
          </p>

          {/* Interactive Category Filter */}
          <div className="skills-filter-nav" role="tablist" aria-label="Filter skills by domain">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`skills-filter-pill ${isActive ? 'skills-filter-pill--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="skills-filter-icon" aria-hidden="true">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="skills-grid">
          {displayedGroups.map((group, si) => (
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
                  <li
                    key={skill}
                    className={`skill-chip ${getSkillClass(skill)}`}
                    aria-label={skill}
                  >
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
