'use client';

import { useMemo } from 'react';

const BUBBLE_COUNT = 128;

const SECTIONS = [
  {
    title: 'Navigation',
    links: ['Accueil', 'Paiement', 'Connexion', 'Inscription', 'Tableau de bord'],
  },
  {
    title: 'Légal',
    links: ["Conditions d'utilisation", 'Mentions légales', 'Cookies', 'Licences'],
  },
  {
    title: 'Confidentialité',
    links: ['Politique de confidentialité', 'Données personnelles', 'RGPD', 'Sécurité'],
  },
  {
    title: 'Support',
    links: ['Aide', 'Contact', 'FAQ', 'Signaler un problème'],
  },
];

type Bubble = { size: string; distance: string; position: string; time: string; delay: string };

export default function BubbleFooter() {
  const bubbles = useMemo<Bubble[]>(() =>
    Array.from({ length: BUBBLE_COUNT }, () => ({
      size:     `${2 + Math.random() * 4}rem`,
      distance: `${6 + Math.random() * 4}rem`,
      position: `${-5 + Math.random() * 110}%`,
      time:     `${2 + Math.random() * 2}s`,
      delay:    `${-1 * (2 + Math.random() * 2)}s`,
    })),
  []);

  return (
    <>
      <svg style={{ position: 'fixed', top: '100vh' }} aria-hidden>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob" />
          </filter>
        </defs>
      </svg>

      <style>{`
        @keyframes bubble-size {
          0%, 75% { width: var(--size, 4rem); height: var(--size, 4rem); }
          100%     { width: 0; height: 0; }
        }
        @keyframes bubble-move {
          0%   { bottom: -4rem; }
          100% { bottom: var(--distance, 10rem); }
        }
        .bf-strip {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1rem;
          background: #ff9900;
          filter: url("#blob");
          z-index: 0;
          pointer-events: none;
        }
        .bf-bubble {
          position: absolute;
          left: var(--position, 50%);
          background: #ff9900;
          border-radius: 100%;
          width: var(--size, 4rem);
          height: var(--size, 4rem);
          transform: translate(-50%, 100%);
          animation:
            bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
            bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
        }
        .bf-content {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <footer style={{ position: 'relative', background: '#ff9900', marginTop: '10rem', zIndex: 1 }}>

        {/* Bubble strip — absolute top of footer, behind content */}
        <div className="bf-strip">
          {bubbles.map((b, i) => (
            <div key={i} className="bf-bubble" style={{
              ['--size' as string]:     b.size,
              ['--distance' as string]: b.distance,
              ['--position' as string]: b.position,
              ['--time' as string]:     b.time,
              ['--delay' as string]:    b.delay,
            }} />
          ))}
        </div>

        {/* Content — z-index 1 so always above bubbles */}
        <div className="bf-content" style={{ padding: '2.5rem 2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {SECTIONS.map((section) => (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <b style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{section.title}</b>
                {section.links.map((link) => (
                  <a key={link} href="#" style={{ color: '#F5F7FA', textDecoration: 'none', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
            <p style={{ color: '#F5F7FA', margin: 0, fontSize: '0.75rem', textAlign: 'center' }}>
              © 2026 monbedo — Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
