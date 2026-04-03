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
    bgColor: '#F0EAFF',
    badge: 'Populaire',
    badgeClass: 'badge-popular',
    emoji: '🎁',
  },
  {
    id: 'relaxation',
    name: 'Coffret Relaxation',
    subtitle: 'Pour se ressourcer',
    contents: ['5g Northern Lights CBD', 'Huile Sommeil 15%', '2g Charas Artisanal', 'Bougie CBD lavande'],
    price: 69.9,
    bgColor: '#FFF0F6',
    badge: 'Coup de cœur',
    badgeClass: 'badge-sale',
    emoji: '🌸',
  },
  {
    id: 'connaisseur',
    name: 'Coffret Connaisseur',
    subtitle: 'Pour les amateurs éclairés',
    contents: ['10g Amnesia Haze', '14g Hash Marocain', 'Huile Full Spectrum 30ml', 'Carnet tasting'],
    price: 119.9,
    bgColor: '#E8FBF8',
    badge: 'Premium',
    badgeClass: 'badge-new',
    emoji: '🏆',
  },
]

const niveaux = [
  { id: 'graine',  label: 'Graine',  emoji: '🌱', desc: 'Premiers achats — bienvenue dans la famille',      color: '#F0EAFF', pts: '0 pts' },
  { id: 'pousse',  label: 'Pousse',  emoji: '🌿', desc: 'La plante grandit, tes avantages aussi',            color: '#E8FBF8', pts: '250 pts' },
  { id: 'fleur',   label: 'Fleur',   emoji: '🌸', desc: 'Accès aux offres exclusives et avant-premières',   color: '#FFF0F6', pts: '600 pts' },
  { id: 'mure',    label: 'Mûre',    emoji: '🫐', desc: 'Livraison express offerte + cadeaux surprises',     color: '#EDE8FF', pts: '1 200 pts' },
  { id: 'resine',  label: 'Résine',  emoji: '✨', desc: 'Statut VIP — accès privé, tarifs connaisseur',     color: '#FFF9E6', pts: '2 500 pts' },
]

export default function CadeauxPage() {
  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height, 90px) + 80px)' }}>

        {/* ── HERO ── */}
        <section
          className="retro-grain retro-grid-bg"
          style={{
            background: 'linear-gradient(135deg, var(--color-surface-lavande) 0%, var(--color-rose-muted, #FFD6E7) 60%, var(--color-bg) 100%)',
            padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)',
            paddingTop: 'calc(clamp(var(--space-12), 8vw, var(--space-20)) + 70px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg aria-hidden style={{ position: 'absolute', top: '15%', right: '10%', opacity: 0.35 }} width="22" height="22" viewBox="0 0 24 24"><path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="#BD90FD"/></svg>
          <svg aria-hidden style={{ position: 'absolute', bottom: '15%', left: '8%', opacity: 0.3 }} width="14" height="14" viewBox="0 0 24 24"><path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="#FF6B9D"/></svg>
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'rgba(189,144,253,0.15)', border: '1px solid rgba(189,144,253,0.35)', borderRadius: 'var(--radius-full)', padding: '6px 16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>✦ Idées Cadeaux ✦</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.1 }}>
              Offrez du <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>bien-être</em>
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Nos coffrets sont assemblés à la main, emballés avec soin. Livraison discrète avec carte personnalisée.
            </p>
          </div>
        </section>

        {/* ── SECTION NAV TABS ── */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(255,253,249,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)', padding: 'var(--space-3) var(--space-4)', display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
          {[
            { label: '🎁 Récompenses', href: '#recompenses' },
            { label: '🌱 Niveaux',      href: '#niveaux' },
            { label: '📋 Historique',   href: '#historique' },
          ].map(tab => (
            <a
              key={tab.href}
              href={tab.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                background: 'var(--color-primary-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '7px 16px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 150ms, box-shadow 150ms',
              }}
            >{tab.label}</a>
          ))}
        </div>

        {/* ── COFFRETS ── */}
        <section id="recompenses" style={{ padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)', maxWidth: 'var(--content-default)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✦ Récompenses ✦</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 400, marginTop: 'var(--space-2)' }}>Nos Coffrets</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-6)' }}>
            {giftBoxes.map((box) => (
              <div
                key={box.id}
                style={{
                  background: box.bgColor,
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  transition: 'transform var(--transition), box-shadow var(--transition)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 48, lineHeight: 1 }}>{box.emoji}</span>
                  <span className={`badge ${box.badgeClass}`}>{box.badge}</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 4 }}>{box.subtitle}</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400 }}>{box.name}</h2>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 0, listStyle: 'none' }}>
                  {box.contents.map((item) => (
                    <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ color: 'var(--color-lavande)', fontSize: 10 }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-divider)', paddingTop: 'var(--space-4)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--color-primary)' }}>{box.price.toFixed(2)}€</span>
                  <Link
                    href="/panier"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase',
                      background: 'var(--color-primary)', color: '#fff',
                      padding: '10px 20px', borderRadius: 'var(--radius-lg)',
                      textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                      boxShadow: 'var(--glow-cta)',
                    }}
                  >
                    Offrir →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NIVEAUX ── */}
        <section
          id="niveaux"
          style={{
            background: 'linear-gradient(160deg, var(--color-surface-lavande) 0%, var(--color-bg) 70%)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✦ Programme Fidélité ✦</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 400, marginTop: 'var(--space-2)', lineHeight: 1.15 }}>Ton niveau de<br /><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>connaisseur</em></h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)', maxWidth: '46ch', marginInline: 'auto', lineHeight: 1.65 }}>Accumule des points à chaque commande et progresse dans les rangs. Plus tu montes, plus tes avantages sont précieux.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
              {/* Vertical connector line */}
              <div aria-hidden style={{ position: 'absolute', left: 35, top: 36, bottom: 36, width: 2, background: 'linear-gradient(to bottom, var(--color-lavande), var(--color-rose))', opacity: 0.4, zIndex: 0 }} />
              {niveaux.map((niv, i) => (
                <div key={niv.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', paddingBottom: i < niveaux.length - 1 ? 'var(--space-6)' : 0, position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 70, height: 70, borderRadius: 'var(--radius-full)', background: niv.color, border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0, position: 'relative', zIndex: 2 }}>
                    {niv.emoji}
                  </div>
                  <div style={{ flex: 1, background: niv.color, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4) var(--space-5)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400 }}>{niv.label}</h3>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(124,79,212,0.1)', color: 'var(--color-primary)', letterSpacing: '0.06em' }}>{niv.pts}</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{niv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HISTORIQUE ── */}
        <section id="historique" style={{ padding: 'clamp(var(--space-10), 7vw, var(--space-14)) var(--space-4)', maxWidth: 'var(--content-default)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✦ Historique ✦</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 400, marginTop: 'var(--space-2)' }}>Tes derniers points</h2>
          </div>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', textAlign: 'center' }}>
            <span style={{ fontSize: 48, lineHeight: 1 }}>🌱</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400 }}>Commence ton parcours</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '38ch', lineHeight: 1.65 }}>
              Connecte-toi ou crée un compte pour voir ton historique de points et ton niveau actuel.
            </p>
            <Link href="/mon-compte" style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'var(--color-primary)', color: '#fff',
              padding: '12px 28px', borderRadius: 'var(--radius-lg)',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              boxShadow: 'var(--glow-cta)',
            }}>
              Mon compte →
            </Link>
          </div>
        </section>

        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '1px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 400, textDecoration: 'none' }}>Kanamaste</Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>© {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
