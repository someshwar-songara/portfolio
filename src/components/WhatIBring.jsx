import { bringCardsData } from '../data/skills';
import { useTilt3D } from '../hooks/useTilt3D';

function BringCardItem({ card, index }) {
  const tiltRef = useTilt3D({ max: 8, scale: 1.025, perspective: 900, glare: true });

  return (
    <div
      ref={tiltRef}
      className={`bring-card ${card.color} has-3d-glare reveal reveal-delay-${(index % 4) + 1}`}
    >
      <div className="bring-card-tape" aria-hidden="true"></div>
      <div className="glare-layer" aria-hidden="true"></div>
      <div className="bring-card-header">
        <span className="bring-icon" aria-hidden="true">
          {card.icon}
        </span>
        <span className="bring-number">0{index + 1}</span>
      </div>
      <h3 className="bring-title">{card.title}</h3>
      <p className="bring-body">{card.body}</p>
    </div>
  );
}

export default function WhatIBring() {
  return (
    <section id="bring" className="section" aria-label="What I bring">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">what I bring</span>
          <h2 className="section-title">My Approach &amp; Values</h2>
          <p className="section-note">The engineering mindset behind every line of code.</p>
        </header>

        <div className="bring-grid">
          {bringCardsData.map((card, bi) => (
            <BringCardItem key={card.title} card={card} index={bi} />
          ))}
        </div>
      </div>
    </section>
  );
}
