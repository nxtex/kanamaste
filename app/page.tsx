import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { HoverCard } from '@/components/HoverCard'

/*
 * Hero image: macro photography of a CBD flower bud (Unsplash, free to use)
 * Photo by Crystalweed Cannabis on Unsplash
 * https://unsplash.com/photos/cannabis-flower-I79Pgmhmy5I
 */
const HERO_IMAGE = 'https://images.unsplash.com/photo-1603909223429-69bb7b8a6c4e?w=1800&q=85&fit=crop'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        {/* ─────────────────────────────────────────
            HERO SECTION — full-bleed CBD flower photo
            ───────────────────────────────────────── */}
        <section
          className="retro-grain"
          style={{
            minHeight: '100dvh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          {/* Background photo */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          >
            <img
              src={HERO_IMAGE}
              alt=""
              width={1800}
              height={1200}
              loading="eager"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                display: 'block',
                /* Slight sepia/vintage filter for the retro vibe */
                filter: 'saturate(0.85) contrast(1.05) sepia(0.18)',
              }}
            />
            {/* Dark gradient overlay — bottom-heavy so text pops */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(160deg, oklch(0.18 0.06 155 / 0.82) 0%, oklch(0.12 0.04 155 / 0.55) 50%, oklch(0.08 0.02 155 / 0.30) 100%)',
            }} />
            {/* Retro halftone dot texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, oklch(1 0 0 / 0.035) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Decorative frame lines */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
            <div style={{ position: 'absolute', top: '4%', left: '3%', right: '3%', height: 1, background: 'oklch(from #f5f0e8 l c h / 0.14)' }} />
            <div style={{ position: 'absolute', bottom: '4%', left: '3%', right: '3%', height: 1, background: 'oklch(from #f5f0e8 l c h / 0.14)' }} />
            <div style={{ position: 'absolute', top: '4%', bottom: '4%', left: '3%', width: 1, background: 'oklch(from #f5f0e8 l c h / 0.10)' }} />
            <div style={{ position: 'absolute', top: '4%', bottom: '4%', right: '3%', width: 1, background: 'oklch(from #f5f0e8 l c h / 0.10)' }} />
            {/* Corner accents */}
            {[
              { top: 'calc(4% + 0px)', left: 'calc(3% + 0px)', borderTop: '2px solid', borderLeft: '2px solid' },
              { top: 'calc(4% + 0px)', right: 'calc(3% + 0px)', borderTop: '2px solid', borderRight: '2px solid' },
              { bottom: 'calc(4% + 0px)', left: 'calc(3% + 0px)', borderBottom: '2px solid', borderLeft: '2px solid' },
              { bottom: 'calc(4% + 0px)', right: 'calc(3% + 0px)', borderBottom: '2px solid', borderRight: '2px solid' },
            ].map((s, i) => (
              <div key={i} aria-hidden="true" style={{ position: 'absolute', width: 24, height: 24, borderColor: 'oklch(from #f5f0e8 l c h / 0.30)', ...s }} />
            ))}
          </div>

          {/* Hero content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 'var(--content-default)',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-gold)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}>
                &#9670;&nbsp;CBD Artisanal Fran&ccedil;ais&nbsp;&#9670;
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 900,
              color: '#f5f0e8',
              lineHeight: 1.05,
              textShadow: '0 2px 24px oklch(0 0 0 / 0.4)',
            }}>
              La nature,<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>distill&eacute;e.</em>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'oklch(from #f5f0e8 l c h / 0.78)',
              maxWidth: '44ch',
              lineHeight: 1.65,
              textShadow: '0 1px 8px oklch(0 0 0 / 0.3)',
            }}>
              Fleurs, r&eacute;sines et huiles CBD s&eacute;lectionn&eacute;es &agrave; la main.
              Qualit&eacute; artisanale, sourcing responsable,
              bien-&ecirc;tre au quotidien.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                href="/produits"
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'var(--color-gold)',
                  color: 'var(--color-text)',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  border: '2px solid var(--color-text)',
                  boxShadow: '3px 3px 0 oklch(0 0 0 / 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  whiteSpace: 'nowrap',
                }}
              >
                D&eacute;couvrir la boutique <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  color: '#f5f0e8',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  border: '2px solid oklch(from #f5f0e8 l c h / 0.4)',
                  boxShadow: '0 0 0 0',
                  whiteSpace: 'nowrap',
                }}
              >
                Nous contacter
              </Link>
            </div>

            {/* Small trust badges below CTAs */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
              {[
                '&#9752; Bio certifi\u00e9',
                '&#9670; THC &lt; 0.3%',
                '&#10022; Livraison 24h',
              ].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'oklch(from #f5f0e8 l c h / 0.60)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                  dangerouslySetInnerHTML={{ __html: tag }}
                />
              ))}
            </div>
          </div>

          {/* Retro wax-stamp circle bottom-right */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '6%',
              width: 108,
              height: 108,
              borderRadius: '50%',
              border: '3px solid oklch(from #f5f0e8 l c h / 0.28)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              transform: 'rotate(14deg)',
              zIndex: 2,
              background: 'oklch(from var(--color-primary) l c h / 0.18)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'oklch(from #f5f0e8 l c h / 0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Qualit&eacute;</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'oklch(from #f5f0e8 l c h / 0.45)', lineHeight: 1 }}>CBD</span>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'oklch(from #f5f0e8 l c h / 0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Premium</span>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute',
            bottom: 'calc(4% + 16px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            opacity: 0.45,
          }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f5f0e8' }}>Défiler</span>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="12" height="18" rx="6" stroke="#f5f0e8" strokeWidth="1.5"/>
              <circle cx="7" cy="6" r="2" fill="#f5f0e8">
                <animate attributeName="cy" values="6;12;6" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* VALUES BAND */}
        <section style={{ background: 'var(--color-gold)', borderTop: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)', padding: 'var(--space-4) var(--space-4)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
            {[
              { icon: '&#9752;', label: 'Naturel & Biologique' },
              { icon: '&#9670;', label: 'Sans THC' },
              { icon: '&#10022;', label: 'Livraison Rapide' },
              { icon: '&#9820;', label: 'Test Laboratoire' },
              { icon: '&#9650;', label: 'Sourcing Responsable' },
            ].map((item) => (
              <span key={item.label} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap' }}>
                <span dangerouslySetInnerHTML={{ __html: item.icon }} style={{ fontSize: 16 }} />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS TEASER */}
        <section className="fade-in" style={{ padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>&#9670; Collection</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1 }}>
              Nos <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>s&eacute;lections</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch' }}>
              Chaque produit est soigneusement s&eacute;lectionn&eacute; pour ses propri&eacute;t&eacute;s botaniques et sa qualit&eacute; sup&eacute;rieure.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}>
            <HoverCard name="Amnesia Haze CBD" type="Fleur" price="9.90" unit="/ 2g" color="#e8f4e8" emoji="&#127807;" badge="Bestseller" badgeColor="var(--color-primary)" />
            <HoverCard name="Hash Marocain Premium" type="R&eacute;sine" price="14.90" unit="/ 3g" color="#f4ede0" emoji="&#9793;" badge="Nouveau" badgeColor="var(--color-gold)" />
            <HoverCard name="Huile Full Spectrum" type="Huile 10%" price="34.90" unit="/ 10ml" color="#fdf0d8" emoji="&#128167;" badge="Recommand&eacute;" badgeColor="var(--color-terracotta)" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/produits" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '14px 36px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', border: '2px solid var(--color-text)', boxShadow: 'var(--shadow-card)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              Voir toute la boutique <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* WHY KANAMASTE */}
        <section className="fade-in" style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', borderBottom: '2px solid var(--color-border)', padding: 'clamp(var(--space-12), 7vw, var(--space-20)) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>&#9670; Pourquoi nous &#9670;</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: 'var(--space-3)', color: 'var(--color-text)' }}>
                L&apos;artisanat<br /><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>au service du bien-&ecirc;tre</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 'var(--space-5)' }}>
              {[
                { num: '01', title: 'Tra&ccedil;abilit&eacute; totale', text: 'Du plant &agrave; votre porte, chaque lot est trac&eacute; et test&eacute; en laboratoire ind&eacute;pendant.' },
                { num: '02', title: 'Culture biologique', text: 'Nos partenaires cultivent sans pesticides, sur des sols vivants, dans le respect du cycle naturel.' },
                { num: '03', title: 'Discr&eacute;tion garantie', text: 'Emballage neutre, exp&eacute;dition rapide depuis la France, livraison en 24&ndash;48h.' },
                { num: '04', title: 'Expertise botanique', text: 'Notre &eacute;quipe s&eacute;lectionne chaque ar&ocirc;me et profil de terp&egrave;nes pour un effet optimal.' },
              ].map((card) => (
                <div key={card.num} className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--color-primary-muted)', lineHeight: 1, letterSpacing: '-0.02em' }}>{card.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }} dangerouslySetInnerHTML={{ __html: card.title }} />
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: card.text }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="retro-grain" style={{ background: 'var(--color-surface-dark, #1a1a14)', padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)', textAlign: 'center' }}>
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>&#9670; Offre de bienvenue &#9670;</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.1 }}>
              &minus;15% sur votre<br />
              <em style={{ color: 'var(--color-gold)' }}>premi&egrave;re commande</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(245,240,232,0.6)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Inscrivez-vous &agrave; notre liste et recevez un code promo exclusif ainsi que nos guides bien-&ecirc;tre gratuits.
            </p>
            <Link href="/mon-compte" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-gold)', color: 'var(--color-text)', padding: '14px 32px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', border: '2px solid #f5f0e8', boxShadow: '3px 3px 0 rgba(245,240,232,0.2)' }}>
              Cr&eacute;er mon compte
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 700 }}>Kanamaste</span>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.06em' }}>
              &copy; {new Date().getFullYear()} Kanamaste. Produits l&eacute;gaux &le; 0.3% THC. R&eacute;serv&eacute; aux adultes.
            </p>
            <nav style={{ display: 'flex', gap: 'var(--space-4)' }} aria-label="Liens footer">
              {['CGV', 'Mentions l&eacute;gales', 'Contact'].map(link => (
                <a key={link} href="#" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: 3 }} dangerouslySetInnerHTML={{ __html: link }} />
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </>
  )
}
