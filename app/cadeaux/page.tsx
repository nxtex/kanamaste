import { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'

export const metadata: Metadata = {
  title: 'Idées Cadeaux',
  description: 'Offrez du bien-être avec nos coffrets CBD artisanaux. Cadeaux personnalisés, emballage soigné.',
}

const giftBoxes = [
  {
    id: 'decouverte',
    name: 'Coffret Découverte',
    subtitle: 'Pour les curieux',
    contents: ['2g Amnesia Haze CBD', '3g Hash Marocain', 'Huile CBD 5% 10ml', 'Guide bien-être'],
    price: 39.9,
    color: '#eaf4e8',
    badge: 'Populaire',
    emoji: '&#127873;',
  },
  {
    id: 'relaxation',
    name: 'Coffret Relaxation',
    subtitle: 'Pour se ressourcer',
    contents: ['5g Northern Lights CBD', 'Huile Sommeil 15%', '2g Charas Artisanal', 'Bougie CBD lavande'],
    price: 69.9,
    color: '#ede8f5',
    badge: 'Coup de cœur',
    emoji: '&#129505;',
  },
  {
    id: 'connaisseur',
    name: 'Coffret Connaisseur',
    subtitle: 'Pour les amateurs éclairés',
    contents: ['10g Amnesia Haze', '14g Hash Marocain', 'Huile Full Spectrum 30ml', 'Carnet tasting'],
    price: 119.9,
    color: '#f4ede0',
    badge: 'Premium',
    emoji: '&#127875;',
  },
]

export default function CadeauxPage() {
  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height) + 80px)' }}>

        {/* Header */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-gold)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative */}
          <div aria-hidden style={{ position: 'absolute', top: '12%', left: '4%', fontSize: 80, opacity: 0.08 }}>&#127873;</div>
          <div aria-hidden style={{ position: 'absolute', bottom: '8%', right: '5%', fontSize: 60, opacity: 0.08 }}>&#10022;</div>

          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text)' }}>&#9670; Idées Cadeaux &#9670;</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--color-text)', lineHeight: 1.1 }}>
              Offrez du <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>bien-être</em>
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Nos coffrets sont assemblés à la main, emballés avec soin. Livraison discrète avec carte personnalisée.
            </p>
          </div>
        </section>

        {/* Gift boxes */}
        <section style={{ padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)', maxWidth: 'var(--content-default)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-6)' }}>
            {giftBoxes.map((box) => (
              <div
                key={box.id}
                className="retro-grain"
                style={{
                  background: box.color,
                  border: '2px solid var(--color-text)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span dangerouslySetInnerHTML={{ __html: box.emoji }} style={{ fontSize: 48, lineHeight: 1 }} />
                  <span className="badge" style={{ fontFamily: 'var(--font-stamp)', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>{box.badge}</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 4 }}>{box.subtitle}</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>{box.name}</h2>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 0, listStyle: 'none' }}>
                  {box.contents.map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ color: 'var(--color-primary)', fontSize: 10 }}>&#9670;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{box.price.toFixed(2)}€</span>
                  <Link
                    href="/panier"
                    style={{
                      fontFamily: 'var(--font-stamp)',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: 'var(--color-primary)',
                      color: 'var(--color-text-inverse)',
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid var(--color-text)',
                      boxShadow: '2px 2px 0 var(--color-text)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                    }}
                  >
                    Offrir &#10148;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Kanamaste</Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.06em' }}>&copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
