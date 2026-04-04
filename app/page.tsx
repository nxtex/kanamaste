import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { HoverCard } from '@/components/HoverCard'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>

        {/* ── HERO ── */}
        <section style={{
          minHeight: '100dvh',
          background: 'linear-gradient(160deg, #FAFAFA 0%, #F0EFFE 60%, #FAFAFA 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'calc(var(--space-16) + 60px) var(--space-6) var(--space-16)',
        }}>
          {/* Fond violet doux — 1 seul orbe subtil */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,79,212,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,179,130,0.08) 0%, transparent 70%)', filter: 'blur(32px)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--content-default)', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--color-primary-muted)', borderRadius: 'var(--radius-full)', padding: '5px 16px', width: 'fit-content' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>CBD Artisanal Français</span>
            </div>

            {/* Titre */}
            <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.08, maxWidth: '12ch' }}>
              La nature,{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-primary)', fontWeight: 600 }}>distillée.</span>
            </h1>

            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', maxWidth: '42ch', lineHeight: 1.65, fontWeight: 400 }}>
              Fleurs, résines et huiles CBD sélectionnées à la main.
              Qualité artisanale, sourcing responsable.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/produits" className="btn-primary" style={{ textDecoration: 'none' }}>
                Voir la boutique →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ textDecoration: 'none' }}>
                Nous contacter
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-light)', marginTop: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex' }}>
                  {['#C5AEFF','#FFB7CB','#A7EDD6'].map((c, i) => (
                    <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -9 : 0, boxShadow: 'var(--shadow-xs)' }} />
                  ))}
                </div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-muted)' }}>+2 400 clients satisfaits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text)' }}>4.9</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)' }}>/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BANDE VALEURS ── */}
        <section style={{ background: 'var(--color-surface-dark)', padding: 'var(--space-4) var(--space-6)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
            {[
              { dot: 'var(--color-green)', label: 'Naturel & Biologique' },
              { dot: 'var(--color-primary-light)', label: 'THC < 0.3%' },
              { dot: 'var(--color-gold)', label: 'Livraison 24h' },
              { dot: 'var(--color-rose)', label: 'Testé en labo' },
              { dot: 'var(--color-green)', label: 'Sourcing responsable' },
            ].map((item) => (
              <span key={item.label} style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.dot, display: 'inline-block', flexShrink: 0 }} />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* ── PRODUITS FEATURED ── */}
        <section className="fade-in" style={{ padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-6)', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Collection</span>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, marginBottom: 'var(--space-3)' }}>
              Nos{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>sélections</span>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch', fontWeight: 400 }}>
              Chaque produit est soigneusement sélectionné pour ses propriétés botaniques et sa qualité.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
            <HoverCard name="Amnesia Haze CBD" type="Fleur" price="9.90" unit="/ 2g" color="#EDE3FF" emoji="🌿" badge="Bestseller" badgeColor="var(--color-primary)" />
            <HoverCard name="Hash Marocain Premium" type="Résine" price="14.90" unit="/ 3g" color="#FFE4EC" emoji="♜" badge="Nouveau" badgeColor="var(--color-rose)" />
            <HoverCard name="Huile Full Spectrum" type="Huile 10%" price="34.90" unit="/ 10ml" color="#D4F5EB" emoji="💧" badge="Recommandé" badgeColor="var(--color-green)" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/produits" className="btn-primary" style={{ textDecoration: 'none' }}>
              Voir toute la boutique →
            </Link>
          </div>
        </section>

        {/* ── POURQUOI NOUS ── */}
        <section className="fade-in" style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', padding: 'clamp(var(--space-12), 7vw, var(--space-20)) var(--space-6)' }}>
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">Pourquoi nous</span>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1 }}>
                L&apos;artisanat{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>au service du bien-être</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 'var(--space-5)' }}>
              {[
                { icon: '🧪', title: 'Traçabilité totale', text: 'Chaque lot est tracé et testé en laboratoire indépendant.' },
                { icon: '🌱', title: 'Culture biologique', text: 'Sans pesticides, sur des sols vivants, dans le respect du cycle naturel.' },
                { icon: '📦', title: 'Discrétion garantie', text: 'Emballage neutre, expédition rapide, livraison en 24–48h.' },
                { icon: '🌿', title: 'Expertise botanique', text: 'Profils de terpènes sélectionnés pour un effet optimal.' },
              ].map((card) => (
                <div key={card.title} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>{card.icon}</span>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-text)' }}>{card.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ background: 'var(--color-surface-dark)', padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-6)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,79,212,0.18) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          </div>
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <span className="section-label" style={{ color: 'var(--color-primary-light)' }}>Offre de bienvenue</span>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#FAFAFA', lineHeight: 1.1 }}>
              &minus;15% sur votre{' '}
              <span style={{ color: 'var(--color-primary-light)', fontStyle: 'italic' }}>première commande</span>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(250,250,250,0.5)', maxWidth: '42ch', lineHeight: 1.65 }}>
              Inscrivez-vous et recevez un code exclusif ainsi que nos guides bien-être gratuits.
            </p>
            <Link href="/mon-compte" className="btn-primary" style={{ textDecoration: 'none' }}>
              Créer mon compte
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border-light)', padding: 'var(--space-8) var(--space-6)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 700 }}>Kanamaste</span>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', letterSpacing: '0.04em' }}>
              &copy; {new Date().getFullYear()} Kanamaste · Produits légaux ≤ 0.3% THC · Réservé aux adultes
            </p>
            <nav style={{ display: 'flex', gap: 'var(--space-5)' }}>
              {['CGV', 'Mentions légales', 'Contact'].map(link => (
                <a key={link} href="#" style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>{link}</a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </>
  )
}
