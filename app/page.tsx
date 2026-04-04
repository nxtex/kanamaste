import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { HoverCard } from '@/components/HoverCard'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>

        {/* ── HERO ── */}
        <section
          className="retro-grain retro-grid-bg"
          style={{
            minHeight: '100dvh',
            background: 'var(--color-bg)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'calc(var(--space-16) + 60px) var(--space-6) var(--space-16)',
          }}
        >
          {/* Orbs décoratifs doux */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,158,232,0.22) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: '-5%', left: '-6%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,84,122,0.1) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', top: '45%', left: '2%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(44,197,160,0.1) 0%, transparent 70%)' }} />
            {/* étoiles décoratives */}
            {[[18, '10%', 'right', null, 0.22, 28], [40, '6%', 'right', null, 0.14, 16], [25, '7%', null, '25%', 0.16, 20]].map(([top, h, right, left, opacity, size], i) => (
              <svg key={i} style={{ position: 'absolute', top: `${top}%`, right: right as string | undefined, left: left as string | undefined, opacity: opacity as number }} width={size as number} height={size as number} viewBox="0 0 24 24">
                <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5Z" fill="var(--color-primary)" />
              </svg>
            ))}
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--content-default)', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
            {/* Badge label */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'rgba(124,79,212,0.1)', backdropFilter: 'blur(8px)', borderRadius: 'var(--radius-full)', padding: '6px 18px', width: 'fit-content', border: '1px solid rgba(124,79,212,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>✦ CBD Artisanal Français ✦</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.05, maxWidth: '14ch' }}>
              La nature,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>distillée.</em>
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)', maxWidth: '46ch', lineHeight: 1.65, fontWeight: 300 }}>
              Fleurs, résines et huiles CBD sélectionnées à la main.
              Qualité artisanale, sourcing responsable.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/produits" className="btn-primary" style={{ textDecoration: 'none', fontSize: 'var(--text-sm)', padding: '15px 32px' }}>
                Découvrir la boutique →
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
                Nous contacter
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', paddingTop: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex' }}>
                  {['#E8D4FF','#FFD0E0','#C8F0E8'].map((c, i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid var(--color-surface)', marginLeft: i > 0 ? -8 : 0 }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>+2 400 clients satisfaits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>4.9 / 5</span>
              </div>
            </div>
          </div>

          {/* Stamp qualité */}
          <div aria-hidden style={{ position: 'absolute', bottom: '8%', right: '4%', width: 90, height: 90, borderRadius: '50%', border: '1.5px dashed rgba(124,79,212,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, transform: 'rotate(12deg)', background: 'rgba(250,246,240,0.7)', backdropFilter: 'blur(6px)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Qualité</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--color-primary)' }}>CBD</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Premium</span>
          </div>
        </section>

        {/* VALUES BAND */}
        <section style={{ background: 'var(--color-surface-dark)', padding: 'var(--space-4) var(--space-6)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
            {[
              { icon: '✦', label: 'Naturel & Biologique' },
              { icon: '◆', label: 'THC < 0.3%' },
              { icon: '★', label: 'Livraison 24h' },
              { icon: '♟', label: 'Testé en labo' },
              { icon: '▲', label: 'Sourcing responsable' },
            ].map((item) => (
              <span key={item.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap' }}>
                <span style={{ color: 'var(--color-lavande)', opacity: 0.8 }}>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="fade-in" style={{ padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-6)', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>✦ Collection</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.1 }}>
              Nos <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>sélections</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch', fontWeight: 300 }}>
              Chaque produit est soigneusement sélectionné pour ses propriétés botaniques et sa qualité supérieure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
            <HoverCard name="Amnesia Haze CBD" type="Fleur" price="9.90" unit="/ 2g" color="#EDE3FF" emoji="🌿" badge="Bestseller" badgeColor="var(--color-primary)" />
            <HoverCard name="Hash Marocain Premium" type="Résine" price="14.90" unit="/ 3g" color="#FDEDF2" emoji="♜" badge="Nouveau" badgeColor="var(--color-rose)" />
            <HoverCard name="Huile Full Spectrum" type="Huile 10%" price="34.90" unit="/ 10ml" color="#D6F7EF" emoji="💧" badge="Recommandé" badgeColor="var(--color-teal)" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/produits" className="btn-primary" style={{ textDecoration: 'none', fontSize: 'var(--text-sm)' }}>
              Voir toute la boutique →
            </Link>
          </div>
        </section>

        {/* WHY KANAMASTE */}
        <section className="fade-in retro-grain" style={{ background: 'var(--color-surface-offset)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'clamp(var(--space-12), 7vw, var(--space-20)) var(--space-6)' }}>
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>✦ Pourquoi nous</span>
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
                <div key={card.num} style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'box-shadow var(--transition), transform var(--transition)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; (e.currentTarget as HTMLElement).style.transform = '' }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontStyle: 'italic', color: 'var(--color-lavande)', lineHeight: 1, opacity: 0.7 }}>{card.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400 }}>{card.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.65, fontWeight: 300 }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="retro-grain" style={{ background: 'var(--color-surface-dark)', padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-6)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,79,212,0.22) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '-20%', left: '-8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,84,122,0.14) 0%, transparent 60%)' }} />
          </div>
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-lavande)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ Offre de bienvenue</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text-inverse)', lineHeight: 1.1 }}>
              &minus;15% sur votre<br />
              <em style={{ color: 'var(--color-lavande)', fontStyle: 'italic' }}>première commande</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(250,246,240,0.55)', maxWidth: '42ch', lineHeight: 1.65, fontWeight: 300 }}>
              Inscrivez-vous et recevez un code exclusif ainsi que nos guides bien-être gratuits.
            </p>
            <Link href="/mon-compte" style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'var(--text-sm)',
              background: 'var(--color-lavande)',
              color: '#1E1030',
              padding: '15px 36px',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 20px rgba(185,158,232,0.45)',
              transition: 'all var(--transition)',
            }}>
              Créer mon compte
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '1px solid var(--color-border)', padding: 'var(--space-8) var(--space-6)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 400 }}>Kanamaste</span>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              &copy; {new Date().getFullYear()} Kanamaste · Produits légaux ≤ 0.3% THC · Réservé aux adultes
            </p>
            <nav style={{ display: 'flex', gap: 'var(--space-5)' }} aria-label="Liens footer">
              {['CGV', 'Mentions légales', 'Contact'].map(link => (
                <a key={link} href="#" style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textDecoration: 'none', letterSpacing: '0.02em' }}>{link}</a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </>
  )
}
