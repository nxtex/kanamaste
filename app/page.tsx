import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        {/* ─── HERO SECTION ─── */}
        <section
          className="retro-grain"
          style={{
            minHeight: '100dvh',
            background: 'var(--color-primary)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          {/* Decorative circles */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute', top: '-10%', right: '-8%',
              width: '55vw', height: '55vw', maxWidth: 600, maxHeight: 600,
              borderRadius: '50%',
              border: '2px solid oklch(from #f5f0e8 l c h / 0.12)',
            }} />
            <div style={{
              position: 'absolute', top: '-5%', right: '-3%',
              width: '38vw', height: '38vw', maxWidth: 420, maxHeight: 420,
              borderRadius: '50%',
              border: '1.5px solid oklch(from #f5f0e8 l c h / 0.08)',
            }} />
            <div style={{
              position: 'absolute', bottom: '8%', left: '-6%',
              width: '32vw', height: '32vw', maxWidth: 340, maxHeight: 340,
              borderRadius: '50%',
              border: '1.5px solid oklch(from #f5f0e8 l c h / 0.08)',
            }} />
            {/* Vintage horizontal rules */}
            <div style={{
              position: 'absolute', top: '18%', left: 0, right: 0,
              height: 1, background: 'oklch(from #f5f0e8 l c h / 0.06)',
            }} />
            <div style={{
              position: 'absolute', bottom: '22%', left: 0, right: 0,
              height: 1, background: 'oklch(from #f5f0e8 l c h / 0.06)',
            }} />
          </div>

          {/* Hero content */}
          <div
            style={{
              position: 'relative', zIndex: 1,
              maxWidth: 'var(--content-default)',
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-gold-light)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                &#9670; CBD Artisanal Français &#9670;
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 900,
              color: 'var(--color-text-inverse)',
              lineHeight: 1.05,
              maxWidth: 14,
            }}>
              La nature,
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>distillée.</em>
            </h1>

            {/* Subheading */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'oklch(from #f5f0e8 l c h / 0.72)',
              maxWidth: '46ch',
              lineHeight: 1.6,
            }}>
              Fleurs, résines et huiles CBD sélectionnées à la main.
              Qualité artisanale, sourcing responsable, effet garantissant
              votre bien-être quotidien.
            </p>

            {/* CTA buttons */}
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
                  boxShadow: '3px 3px 0 var(--color-text)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  whiteSpace: 'nowrap',
                }}
              >
                Découvrir la boutique
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  color: 'var(--color-text-inverse)',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  border: '2px solid oklch(from #f5f0e8 l c h / 0.35)',
                  whiteSpace: 'nowrap',
                }}
              >
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Hero badge stamp */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '12%',
              right: '5%',
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: '3px solid oklch(from #f5f0e8 l c h / 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              transform: 'rotate(12deg)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 9,
              color: 'oklch(from #f5f0e8 l c h / 0.45)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>Qualité</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 900,
              color: 'oklch(from #f5f0e8 l c h / 0.4)',
            }}>CBD</span>
            <span style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 9,
              color: 'oklch(from #f5f0e8 l c h / 0.45)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>Premium</span>
          </div>
        </section>

        {/* ─── VALUES BAND ─── */}
        <section
          style={{
            background: 'var(--color-gold)',
            borderTop: '2px solid var(--color-text)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'var(--space-4) var(--space-4)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex',
            gap: 'var(--space-8)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 'var(--content-wide)',
            margin: '0 auto',
          }}>
            {[
              { icon: '&#9752;', label: 'Naturel & Biologique' },
              { icon: '&#9670;', label: 'Sans THC' },
              { icon: '&#10022;', label: 'Livraison Rapide' },
              { icon: '&#9820;', label: 'Test Laboratoire' },
              { icon: '&#9650;', label: 'Sourcing Responsable' },
            ].map((item) => (
              <span
                key={item.label}
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: item.icon }} style={{ fontSize: 16 }} />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* ─── FEATURED PRODUCTS TEASER ─── */}
        <section
          className="fade-in"
          style={{
            padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)',
            maxWidth: 'var(--content-wide)',
            margin: '0 auto',
          }}
        >
          <div style={{ marginBottom: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-primary)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}>&#9670; Collection</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.1,
            }}>
              Nos <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>sélections</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch' }}>
              Chaque produit est soigneusement sélectionné pour ses propriétés botaniques
              et sa qualité supérieure.
            </p>
          </div>

          {/* Product teasers grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-10)',
          }}>
            {[
              {
                name: 'Amnesia Haze CBD',
                type: 'Fleur',
                price: '9.90',
                unit: '/ 2g',
                color: '#e8f4e8',
                emoji: '&#127807;',
                badge: 'Bestseller',
                badgeColor: 'var(--color-primary)',
              },
              {
                name: 'Hash Marocain Premium',
                type: 'Résine',
                price: '14.90',
                unit: '/ 3g',
                color: '#f4ede0',
                emoji: '&#9793;',
                badge: 'Nouveau',
                badgeColor: 'var(--color-gold)',
              },
              {
                name: 'Huile Full Spectrum',
                type: 'Huile 10%',
                price: '34.90',
                unit: '/ 10ml',
                color: '#fdf0d8',
                emoji: '&#128167;',
                badge: 'Recommandé',
                badgeColor: 'var(--color-terracotta)',
              },
            ].map((product) => (
              <Link
                key={product.name}
                href="/produits"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="retro-grain"
                  style={{
                    background: product.color,
                    border: '2px solid var(--color-text)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-5)',
                    boxShadow: 'var(--shadow-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    cursor: 'pointer',
                    transition: 'transform var(--transition), box-shadow var(--transition)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 var(--color-text)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span dangerouslySetInnerHTML={{ __html: product.emoji }} style={{ fontSize: 36, lineHeight: 1 }} />
                    <span
                      className="badge"
                      style={{
                        background: product.badgeColor,
                        color: '#f5f0e8',
                        borderColor: 'transparent',
                        fontFamily: 'var(--font-stamp)',
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>
                      {product.type}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)' }}>
                      {product.name}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>
                      {product.price}€
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--color-text-muted)' }}>
                        {' '}{product.unit}
                      </span>
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-stamp)',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.06em',
                      color: 'var(--color-primary)',
                      textDecoration: 'underline',
                    }}>Voir →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/produits"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                padding: '14px 36px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                border: '2px solid var(--color-text)',
                boxShadow: 'var(--shadow-card)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              Voir toute la boutique
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* ─── WHY KANAMASTE ─── */}
        <section
          className="fade-in"
          style={{
            background: 'var(--color-surface-offset)',
            borderTop: '2px solid var(--color-border)',
            borderBottom: '2px solid var(--color-border)',
            padding: 'clamp(var(--space-12), 7vw, var(--space-20)) var(--space-4)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-primary)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}>&#9670; Pourquoi nous &#9670;</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                marginTop: 'var(--space-3)',
                color: 'var(--color-text)',
              }}>L&apos;artisanat<br /><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>au service du bien-être</em></h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
              gap: 'var(--space-5)',
            }}>
              {[
                { num: '01', title: 'Traçabilité totale', text: 'Du plant à votre porte, chaque lot est tracé et testé en laboratoire indépendant.' },
                { num: '02', title: 'Culture biologique', text: 'Nos partenaires cultivent sans pesticides, sur des sols vivants, dans le respect du cycle naturel.' },
                { num: '03', title: 'Discrétion garantie', text: 'Emballage neutre, expédition rapide depuis la France, livraison en 24–48h.' },
                { num: '04', title: 'Expertise botanique', text: "Notre équipe sélectionne chaque arôme et profil de terpènes pour un effet optimal." },
              ].map((card) => (
                <div
                  key={card.num}
                  className="retro-grain"
                  style={{
                    background: 'var(--color-surface)',
                    border: '2px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 900,
                    color: 'var(--color-primary-muted)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>{card.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>{card.title}</h3>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-surface-dark, #1a1a14)',
            padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>&#9670; Offre de bienvenue &#9670;</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 900,
              color: '#f5f0e8',
              lineHeight: 1.1,
            }}>
              &minus;15% sur votre<br />
              <em style={{ color: 'var(--color-gold)' }}>première commande</em>
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(245,240,232,0.6)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Inscrivez-vous à notre liste et recevez un code promo exclusif
              ainsi que nos guides bien-être gratuits.
            </p>
            <Link
              href="/mon-compte"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--color-gold)',
                color: 'var(--color-text)',
                padding: '14px 32px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                border: '2px solid #f5f0e8',
                boxShadow: '3px 3px 0 rgba(245,240,232,0.2)',
              }}
            >
              Créer mon compte
            </Link>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer
          style={{
            background: 'var(--color-surface-offset)',
            borderTop: '2px solid var(--color-border)',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          <div style={{
            maxWidth: 'var(--content-wide)',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-primary)',
              fontWeight: 700,
            }}>Kanamaste</span>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-faint)',
              fontFamily: 'var(--font-stamp)',
              letterSpacing: '0.06em',
            }}>
              &copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.
            </p>
            <nav style={{ display: 'flex', gap: 'var(--space-4)' }} aria-label="Liens footer">
              {['CGV', 'Mentions légales', 'Contact'].map(link => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </>
  )
}
