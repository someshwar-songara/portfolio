import { useState, useEffect } from 'react';

export default function KonamiEgg() {
  const [show, setShow] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const code = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let idx = 0;

    function handleKeyDown(e) {
      idx = e.key.toLowerCase() === code[idx].toLowerCase() ? idx + 1 : 0;
      if (idx === code.length) {
        idx = 0;
        setOpacity(1);
        setShow(true);

        setTimeout(() => {
          setOpacity(0);
          setTimeout(() => {
            setShow(false);
          }, 500);
        }, 2800);
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('keydown', handleKeyDown);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-2deg)',
        background: '#fef08a',
        padding: '2rem 2.5rem',
        borderRadius: '4px',
        boxShadow: '6px 8px 24px rgba(0,0,0,.28)',
        fontFamily: 'Caveat, cursive',
        fontSize: '1.35rem',
        textAlign: 'center',
        zIndex: 10000,
        maxWidth: '340px',
        lineHeight: '1.55',
        color: '#1c1917',
        transition: 'opacity .45s ease',
        opacity: opacity,
        pointerEvents: 'none',
      }}
    >
      🎉 <strong>Easter egg found!</strong>
      <br />
      Someshwar approves of your curiosity.
      <br />
      Now go build something. 🚀
    </div>
  );
}
