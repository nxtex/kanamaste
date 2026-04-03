import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { HoverCard } from '@/components/HoverCard'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>

        {/* ── HERO ──
            Flat cream background + retro dot-grid pattern.
            NO gradient — the grid lines + grain texture create all the texture. */}
        <section
          className="retro-grain retro-grid-bg"
          style={{
            minHeight: '100dvh',
            /* Flat warm cream — no gradient */
            background: 'var(--color-bg)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'calc(var(--space-16) + 60px) var(--space-4) var(--space-12)',
            /* Hard retro bottom border */
            borderBottom: '3px solid var(--color-text)',
          }}
        >
          {/* Four-pointed star decorations — retro stamp style */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <svg style={{ position: 'absolute', top: '18%', right: '10%', opacity: 0.18 }} width="32" height="32" viewBox="0 0 24 24">
              <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="var(--color-primary)"/>
            </svg>
            <svg style={{ position: 'absolute', top: '40%', right: '6%', opacity: 0.12 }} width="18" height="18" viewBox="0 0 24 24">
              <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="var(--color-rose)"/>
            </svg>
            <svg style={{ position: 'absolute', bottom: '25%', left: '7%', opacity: 0.14 }} width="22" height="22" viewBox="0 0 24 24">
              <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="var(--color-lavande)"/>
            </svg>
            <svg style={{ position: 'absolute', top: '14%', left: '14%', opacity: 0.10 }} width="12" height="12" viewBox="0 0 24 24">
              <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="var(--color-primary)"/>
            </svg>
            {/* Large retro circle accent — top right corner */}
            <div style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: '2px solid rgba(124,79,212,0.12)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 220,
              height: 220,
              borderRadius: '50%',
              border: '2px solid rgba(124,79,212,0.08)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Hero content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--content-default)', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

            {/* Retro label badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--color-text)', borderRadius: 'var(--radius-full)', padding: '5px 16px', width: 'fit-content' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-bg)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>✶ CBD Artisanal Français ✶</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.05 }}>
              La nature,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>distillée.</em>
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', maxWidth: '46ch', lineHeight: 1.6 }}>
              Fleurs, résines et huiles CBD sélectionnées à la main.
              Qualité artisanale, sourcing responsable, effet garantissant votre bien-être quotidien.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/produits" style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', letterSpacing: '0.06em', textTransform: 'uppercase',
                background: 'var(--color-primary)', color: '#fff',
                padding: '14px 28px', borderRadius: 'var(--radius-lg)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap',
                border: '2px solid var(--color-text)',
                boxShadow: '3px 3px 0 var(--color-text)',
              }}>
                Découvrir la boutique →
              </Link>
              <Link href="/contact" style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', letterSpacing: '0.06em', textTransform: 'uppercase',
                background: 'transparent', color: 'var(--color-text)',
                padding: '14px 28px', borderRadius: 'var(--radius-lg)', textDecoration: 'none',
                border: '2px solid var(--color-text)', whiteSpace: 'nowrap',
              }}>
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Retro quality stamp — bottom right */}
          <div aria-hidden style={{ position: 'absolute', bottom: '10%', right: '5%', width: 96, height: 96, borderRadius: '50%', border: '2px dashed rgba(124,79,212,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transform: 'rotate(12deg)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Qualité</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--color-primary)', opacity: 0.8 }}>CBD</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Premium</span>
          </div>
        </section>

        {/* VALUES BAND */}
        <section style={{ background: 'var(--color-surface-dark)', borderBottom: '3px solid var(--color-text)', padding: 'var(--space-4) var(--space-4)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
            {[
              { icon: '✶', label: 'Naturel & Biologique' },
              { icon: '◆', label: 'Sans THC' },
              { icon: '★', label: 'Livraison Rapide' },
              { icon: '♟', label: 'Test Laboratoire' },
              { icon: '▲', label: 'Sourcing Responsable' },
            ].map((item) => (
              <span key={item.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 16, opacity: 0.7, color: 'var(--color-lavande)' }}>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="fade-in" style={{ padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>✶ Collection</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.1 }}>
              Nos <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>sélections</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch' }}>
              Chaque produit est soigneusement sélectionné pour ses propriétés botaniques et sa qualité supérieure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
            <HoverCard name="Amnesia Haze CBD" type="Fleur" price="9.90" unit="/ 2g" color="#F0EAFF" emoji="🌿" badge="Bestseller" badgeColor="var(--color-primary)" />
            <HoverCard name="Hash Marocain Premium" type="Résine" price="14.90" unit="/ 3g" color="#FFF0F6" emoji="♜" badge="Nouveau" badgeColor="var(--color-rose)" />
            <HoverCard name="Huile Full Spectrum" type="Huile 10%" price="34.90" unit="/ 10ml" color="#E8FBF8" emoji="💧" badge="Recommandé" badgeColor="var(--color-cyan)" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/produits" style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'var(--color-primary)', color: '#fff',
              padding: '14px 36px', borderRadius: 'var(--radius-lg)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              border: '2px solid var(--color-text)',
              boxShadow: '3px 3px 0 var(--color-text)',
            }}>
              Voir toute la boutique →
            </Link>
          </div>
        </section>

        {/* WHY KANAMASTE — flat surface-offset, no gradient */}
        <section className="fade-in retro-grain" style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', borderBottom: '2px solid var(--color-border)', padding: 'clamp(var(--space-12), 7vw, var(--space-20)) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>✶ Pourquoi nous ✶</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, marginTop: 'var(--space-3)', color: 'var(--color-text)' }}>
                L&apos;artisanat<br /><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>au service du bien-être</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 'var(--space-5)' }}>
              {[
                { num: '01', title: 'Traçabilité totale', text: 'Du plant à votre porte, chaque lot est tracé et testé en laboratoire indépendant.' },
                { num: '02', title: 'Culture biologique', text: 'Nos partenaires cultivent sans pesticides, sur des sols vivants, dans le respect du cycle naturel.' },
                { num: '03', title: 'Discrétion garantie', text: 'Emballage neutre, expédition rapide depuis la France, livraison en 24–48h.' },
                { num: '04', title: 'Expertise botanique', text: 'Notre équipe sélectionne chaque arôme et profil de terpènes pour un effet optimal.' },
              ].map((card) => (
                <div key={card.num} style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', boxShadow: '3px 3px 0 var(--color-text)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 500, color: 'var(--color-lavande)', lineHeight: 1 }}>{card.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400 }}>{card.title}</h3>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER — flat dark, no gradient */}
        <section className="retro-grain" style={{ background: 'var(--color-surface-dark)', borderTop: '3px solid var(--color-text)', padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)', textAlign: 'center' }}>
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <svg aria-hidden style={{ position: 'absolute', top: '10%', right: '8%', opacity: 0.25 }} width="18" height="18" viewBox="0 0 24 24"><path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="#BD90FD"/></svg>
            <svg aria-hidden style={{ position: 'absolute', bottom: '15%', left: '6%', opacity: 0.2 }} width="12" height="12" viewBox="0 0 24 24"><path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="#FF6B9D"/></svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-lavande)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>✶ Offre de bienvenue ✶</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text-inverse)', lineHeight: 1.1 }}>
              &minus;15% sur votre<br />
              <em style={{ color: 'var(--color-lavande)', fontStyle: 'italic' }}>première commande</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,253,249,0.6)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Inscrivez-vous à notre liste et recevez un code promo exclusif ainsi que nos guides bien-être gratuits.
            </p>
            <Link href="/mon-compte" style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'var(--color-lavande)', color: '#2A1A4E',
              padding: '14px 32px', borderRadius: 'var(--radius-lg)', textDecoration: 'none',
              border: '2px solid var(--color-lavande)',
              boxShadow: '3px 3px 0 rgba(255,255,255,0.25)',
            }}>
              Créer mon compte
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 400 }}>Kanamaste</span>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              &copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.
            </p>
            <nav style={{ display: 'flex', gap: 'var(--space-4)' }} aria-label="Liens footer">
              {['CGV', 'Mentions légales', 'Contact'].map(link => (
                <a key={link} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{link}</a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </>
  )
}
