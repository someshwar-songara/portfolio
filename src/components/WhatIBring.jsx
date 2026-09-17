import { bringCardsData } from '../data/skills';

export default function WhatIBring() {
  return (
    <section id="bring" className="section" aria-label="What I bring">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">what I bring</span>
          <h2 className="section-title">My Approach</h2>
          <p className="section-note">The mindset behind the code.</p>
        </header>

        <div className="bring-grid">
          {bringCardsData.map((card, bi) => (
            <div
              key={card.title}
              className={`bring-card ${card.color} reveal reveal-delay-${(bi % 4) + 1}`}
            >
              <span className="bring-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="bring-title">{card.title}</h3>
              <p className="bring-body">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
