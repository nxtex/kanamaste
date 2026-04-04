'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Gift, Sparkles, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import FloatingNav from '@/components/FloatingNav'
import { useAuth } from '@/context/AuthContext'

const giftBoxes = [
  {
    id: 'decouverte',
    name: 'Coffret D\u00e9couverte',
    subtitle: 'Pour les curieux',
    contents: ['2g Amnesia Haze CBD', '3g Hash Marocain', 'Huile CBD 5% 10ml', 'Guide bien-\u00eatre'],
    price: 39.9,
    bgColor: '#F0EAFF',
    badge: 'Populaire',
    emoji: '\uD83C\uDF81',
  },
  {
    id: 'relaxation',
    name: 'Coffret Relaxation',
    subtitle: 'Pour se ressourcer',
    contents: ['5g Northern Lights CBD', 'Huile Sommeil 15%', '2g Charas Artisanal', 'Bougie CBD lavande'],
    price: 69.9,
    bgColor: '#FFF0F6',
    badge: 'Coup de c\u0153ur',
    emoji: '\uD83C\uDF38',
  },
  {
    id: 'connaisseur',
    name: 'Coffret Connaisseur',
    subtitle: 'Pour les amateurs \u00e9clair\u00e9s',
    contents: ['10g Amnesia Haze', '14g Hash Marocain', 'Huile Full Spectrum 30ml', 'Carnet tasting'],
    price: 119.9,
    bgColor: '#E8FBF8',
    badge: 'Premium',
    emoji: '\uD83C\uDFC6',
  },
]

const niveaux = [
  { id: 'graine',  label: 'Graine',  emoji: '\uD83C\uDF31', desc: 'Premiers achats \u2014 bienvenue dans la famille',      pts: '0 pts',     color: '#F0EAFF' },
  { id: 'pousse',  label: 'Pousse',  emoji: '\uD83C\uDF3F', desc: 'La plante grandit, tes avantages aussi',            pts: '250 pts',   color: '#E8FBF8' },
  { id: 'fleur',   label: 'Fleur',   emoji: '\uD83C\uDF38', desc: 'Acc\u00e8s aux offres exclusives et avant-premi\u00e8res',   pts: '600 pts',   color: '#FFF0F6' },
  { id: 'mure',    label: 'M\u00fbre',    emoji: '\uD83AB0', desc: 'Livraison express offerte + cadeaux surprises',     pts: '1\u00a0200 pts', color: '#EDE8FF' },
  { id: 'resine',  label: 'R\u00e9sine',  emoji: '\u2728',   desc: 'Statut VIP \u2014 acc\u00e8s priv\u00e9, tarifs connaisseur',     pts: '2\u00a0500 pts', color: '#FFF9E6' },
]

// ─── Promo banner shown to logged-out users ─────────────────────────────────────────
function AuthGate() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 'var(--content-narrow)',
        margin: 'var(--space-10) auto',
        padding: '0 var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
      }}
    >
      {/* -20% promo card */}
      <div
        className="retro-grain"
        style={{
          background: 'var(--color-primary)',
          border: '2.5px solid var(--color-text)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '6px 6px 0 var(--color-text)',
          padding: 'clamp(var(--space-6), 6vw, var(--space-10))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative stamp */}
        <div aria-hidden style={{
          position: 'absolute', top: 12, right: 14,
          width: 56, height: 56, borderRadius: '50%',
          border: '2px dashed rgba(255,255,255,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-stamp)', fontSize: 8,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            textAlign: 'center', lineHeight: 1.4,
          }}>EXCLU<br />MEMBRE</span>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.18)',
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: 'var(--radius-full)',
          padding: '10px 18px',
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        }}>
          <span style={{ fontSize: 24 }}>\uD83C\uDF81</span>
          <span style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.95)',
          }}>Offre exclusive</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1,
          textShadow: '3px 3px 0 rgba(0,0,0,0.25)',
        }}>
          -20%
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: '#fff',
          lineHeight: 1.2,
          fontWeight: 700,
        }}>
          sur votre 1\u00e8re commande
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.65,
          maxWidth: '38ch',
        }}>
          Connectez-vous ou cr\u00e9ez un compte pour d\u00e9bloquer l&#8217;acc\u00e8s \u00e0 nos coffrets et profiter de votre remise de bienvenue.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--space-2)' }}>
          <Link
            href="/mon-compte"
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: '#fff',
              color: 'var(--color-primary)',
              padding: '13px 28px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-text)',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontWeight: 700,
            }}
          >
            Se connecter &#8594;
          </Link>
          <Link
            href="/mon-compte"
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: '#fff',
              padding: '13px 28px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid rgba(255,255,255,0.6)',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            }}
          >
            S&#8217;inscrire
          </Link>
        </div>
      </div>

      {/* teaser cards (blurred preview) */}
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
          gap: 'var(--space-4)',
          filter: 'blur(5px)',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.55,
        }}>
          {giftBoxes.map((box) => (
            <div key={box.id} style={{
              background: box.bgColor,
              border: '2px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              minHeight: 220,
            }}>
              <span style={{ fontSize: 40 }}>{box.emoji}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>{box.name}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{box.subtitle}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{box.price.toFixed(2)}\u20ac</div>
            </div>
          ))}
        </div>
        {/* lock overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 'var(--space-3)',
        }}>
          <div style={{
            background: 'var(--color-surface)',
            border: '2px solid var(--color-text)',
            borderRadius: 'var(--radius-full)',
            width: 64, height: 64,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '3px 3px 0 var(--color-text)',
          }}>
            <Lock size={26} color="var(--color-primary)" strokeWidth={1.8} />
          </div>
          <span style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 14px',
          }}>R\u00e9serv\u00e9 aux membres</span>
        </div>
      </div>
    </motion.section>
  )
}

// ─── Coffrets section (logged in) ──────────────────────────────────────────────
function CoffretsGrid() {
  return (
    <section id="recompenses" style={{ padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)', maxWidth: 'var(--content-default)', margin: '0 auto' }}>
      {/* member promo banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '4px 4px 0 var(--color-text)',
          padding: 'var(--space-4) var(--space-6)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{ fontSize: 28 }}>\uD83C\uDF89</span>
          <div>
            <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Membre actif</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              -20% sur votre 1\u00e8re commande appliqu\u00e9 !
            </div>
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', padding: '6px 14px', background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 'var(--radius-full)', color: '#fff', whiteSpace: 'nowrap' }}>Code WELCOME20</span>
      </motion.div>

      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>\u2666 R\u00e9compenses \u2666</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: 'var(--space-2)' }}>Nos Coffrets</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-6)' }}>
        {giftBoxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: '6px 6px 0 var(--color-text)' }}
            className="retro-grain"
            style={{
              background: box.bgColor,
              border: '2px solid var(--color-text)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              boxShadow: '4px 4px 0 var(--color-text)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
              transition: 'box-shadow 200ms, transform 200ms',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 48, lineHeight: 1 }}>{box.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: 'var(--color-primary)', color: '#fff',
                padding: '4px 10px', borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-text)',
              }}>{box.badge}</span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 4 }}>{box.subtitle}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>{box.name}</h2>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 0, listStyle: 'none' }}>
              {box.contents.map((item) => (
                <li key={item} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: 10 }}>\u2666</span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-divider)', paddingTop: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, textDecoration: 'line-through', color: 'var(--color-text-faint)' }}>{(box.price * 1.25).toFixed(2)}\u20ac</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{box.price.toFixed(2)}\u20ac</span>
              </div>
              <Link
                href="/panier"
                style={{
                  fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: 'var(--color-primary)', color: '#fff',
                  padding: '12px 22px', borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--color-text)',
                  boxShadow: '3px 3px 0 var(--color-text)',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)',
                }}
              >
                Offrir \u2192
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CadeauxPage() {
  const { isLoggedIn } = useAuth()

  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height, 90px) + 80px)' }}>

        {/* HERO */}
        <section
          className="retro-grain retro-grid-bg"
          style={{
            background: 'linear-gradient(135deg, #F0EAFF 0%, #FFD6E7 60%, var(--color-bg) 100%)',
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
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>\u2666 Id\u00e9es Cadeaux \u2666</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1 }}>
              Offrez du <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>bien-\u00eatre</em>
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Nos coffrets sont assembl\u00e9s \u00e0 la main, emball\u00e9s avec soin. Livraison discr\u00e8te avec carte personnalis\u00e9e.
            </p>
          </div>
        </section>

        {/* AUTH GATE or COFFRETS */}
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            <motion.div key="logged-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CoffretsGrid />
            </motion.div>
          ) : (
            <motion.div key="logged-out" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AuthGate />
            </motion.div>
          )}
        </AnimatePresence>

        {/* NIVEAUX — always visible */}
        <section
          id="niveaux"
          style={{
            background: 'linear-gradient(160deg, #F0EAFF 0%, var(--color-bg) 70%)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>\u2666 Programme Fid\u00e9lit\u00e9 \u2666</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: 'var(--space-2)', lineHeight: 1.15 }}>Ton niveau de<br /><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>connaisseur</em></h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)', maxWidth: '46ch', marginInline: 'auto', lineHeight: 1.65 }}>Accumule des points \u00e0 chaque commande et progresse dans les rangs. Plus tu montes, plus tes avantages sont pr\u00e9cieux.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
              <div aria-hidden style={{ position: 'absolute', left: 35, top: 36, bottom: 36, width: 2, background: 'linear-gradient(to bottom, #BD90FD, #FF6B9D)', opacity: 0.4, zIndex: 0 }} />
              {niveaux.map((niv, i) => (
                <div key={niv.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', paddingBottom: i < niveaux.length - 1 ? 'var(--space-6)' : 0, position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 70, height: 70, borderRadius: 'var(--radius-full)', background: niv.color, border: '2px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0, position: 'relative', zIndex: 2 }}>{niv.emoji}</div>
                  <div style={{ flex: 1, background: niv.color, border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>{niv.label}</h3>
                      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(124,79,212,0.1)', color: 'var(--color-primary)', letterSpacing: '0.06em' }}>{niv.pts}</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{niv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '1px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Kanamaste</Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.06em' }}>\u00a9 2026 Kanamaste. Produits l\u00e9gaux \u2264 0.3% THC. R\u00e9serv\u00e9 aux adultes.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
