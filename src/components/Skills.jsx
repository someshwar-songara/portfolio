import { skillsData } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="section section--lined" aria-label="Skills">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">tools of the trade</span>
          <h2 className="section-title">Skills &amp; Stack</h2>
          <p className="section-note">Organised by category — always learning more.</p>
        </header>

        <div className="skills-grid">
          {skillsData.map((group, si) => (
            <div key={group.category} className={`skill-group reveal reveal-delay-${(si % 3) + 1}`}>
              <h3 className="skill-group-title">
                <span className="skill-group-icon" aria-hidden="true">
                  {group.icon}
                </span>
                {group.category}
              </h3>
              <div className="skill-chips" role="list" aria-label={`${group.category} skills`}>
                {group.items.map((skill) => (
                  <span key={skill} className="skill-chip" role="listitem" aria-label={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
