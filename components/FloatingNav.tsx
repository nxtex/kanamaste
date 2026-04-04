"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Phone, User, Gift, ShoppingCart, Menu, X, Leaf, Package, Hash, Wind, FlaskConical } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import CartModal from './CartModal'
import GiftsModal from './GiftsModal'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

const navItems = [
  { href: '/',           label: 'Accueil',   icon: Home,         modal: null },
  { href: '/contact',    label: 'Contact',   icon: Phone,        modal: null },
  { href: '/mon-compte', label: 'Connexion', icon: User,         modal: null },
  { href: null,          label: 'Cadeau',    icon: Gift,         modal: 'gifts' as const },
  { href: null,          label: 'Panier',    icon: ShoppingCart, modal: 'cart'  as const },
]

const categories = [
  { label: 'Fleurs CBD',      icon: Leaf,         slug: 'fleurs' },
  { label: 'Small Buds CBD',  icon: Package,      slug: 'small-buds' },
  { label: 'Résines CBD',     icon: Hash,         slug: 'resines' },
  { label: 'Pollens CBD',     icon: Wind,         slug: 'pollens' },
  { label: 'Extractions CBD', icon: FlaskConical, slug: 'extractions' },
]

export default function FloatingNav() {
  const pathname = usePathname()
  const { totalQty } = useCart()
  const [cartOpen,  setCartOpen]  = useState(false)
  const [giftsOpen, setGiftsOpen] = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [visible,   setVisible]   = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const current = window.scrollY
    setVisible(current < lastScrollY || current < 80)
    setLastScrollY(current)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isLoginPage = pathname === '/mon-compte'

  return (
    <>
      <CartModal  open={cartOpen}  onClose={() => setCartOpen(false)} />
      <GiftsModal open={giftsOpen} onClose={() => setGiftsOpen(false)} />

      {/* ── LOGO pill ── */}
      {!isLoginPage && (
        <div style={{ position: 'fixed', top: 'var(--space-3)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 60, pointerEvents: 'none' }}>
          <Link href="/" aria-label="Kanamaste — Accueil" style={{
            pointerEvents: 'auto',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none',
            background: 'rgba(30, 16, 48, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(185, 158, 232, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '7px 24px',
            boxShadow: '0 4px 24px rgba(30,16,48,0.28)',
          }}>
            <Image src="/logo1.png" alt="Kanamaste" width={110} height={44} priority style={{ objectFit: 'contain' }} />
          </Link>
        </div>
      )}

      {/* ── HAMBURGER ── */}
      <motion.button
        aria-label={menuOpen ? 'Fermer le menu' : 'Catégories'}
        onClick={() => setMenuOpen(v => !v)}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed', top: 'var(--space-3)', left: 'var(--space-3)',
          zIndex: 70,
          width: 46, height: 46,
          borderRadius: 'var(--radius-full)',
          background: menuOpen ? 'var(--color-primary)' : 'rgba(30,16,48,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(185,158,232,0.3)',
          boxShadow: '0 4px 20px rgba(30,16,48,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 200ms, box-shadow 200ms',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen
            ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}><X    size={18} color="#fff" /></motion.span>
            : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.16 }}><Menu size={18} color="rgba(250,246,240,0.9)" /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 62, background: 'rgba(10,5,25,0.5)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div key="drawer"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: 'min(88vw, 300px)',
                zIndex: 63,
                background: 'var(--color-surface)',
                borderRight: '1px solid var(--color-border)',
                boxShadow: '0 0 48px rgba(30,16,48,0.22)',
                display: 'flex', flexDirection: 'column',
                padding: 'var(--space-6) var(--space-5)',
                paddingTop: 'calc(var(--space-6) + 56px)',
                gap: 'var(--space-2)',
                overflowY: 'auto',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-1)', opacity: 0.8 }}>Catégories</span>

              {categories.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <motion.div key={cat.slug}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i, type: 'spring', stiffness: 400, damping: 32 }}
                  >
                    <Link href={`/produits?categorie=${cat.slug}`} onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg)',
                        textDecoration: 'none',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: 'var(--text-sm)',
                        transition: 'all 150ms',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--color-primary-muted)'; el.style.borderColor = 'rgba(124,79,212,0.3)'; el.style.color = 'var(--color-primary)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--color-bg)'; el.style.borderColor = 'var(--color-border)'; el.style.color = 'var(--color-text)' }}
                    >
                      <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} color="var(--color-primary)" strokeWidth={1.8} />
                      </span>
                      {cat.label}
                    </Link>
                  </motion.div>
                )
              })}

              <div style={{ height: 1, background: 'var(--color-border)', margin: 'var(--space-3) 0' }} />

              <Link href="/produits" onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(124,79,212,0.3)',
                  transition: 'all 180ms',
                }}
              >
                Voir tous les produits →
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── FLOATING BOTTOM NAV ── */}
      <div style={{ position: 'fixed', bottom: 'var(--space-4)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 50, pointerEvents: 'none' }} aria-label="Navigation principale">
        <AnimatePresence>
          {visible && (
            <motion.nav
              key="floating-nav"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={{
                background: 'rgba(252, 250, 248, 0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(124, 79, 212, 0.18)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 8px',
                display: 'flex', alignItems: 'center', gap: 'var(--space-1)',
                boxShadow: '0 8px 32px rgba(30,16,48,0.12), 0 1px 4px rgba(124,79,212,0.1)',
                pointerEvents: 'auto',
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = item.href ? pathname === item.href : false
                const isCart = item.modal === 'cart'

                const inner = (
                  <motion.div
                    whileTap={{ scale: 0.88 }}
                    style={{
                      position: 'relative',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      gap: '3px',
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'var(--color-primary)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--color-text)',
                      minWidth: 44, minHeight: 44,
                      cursor: 'pointer',
                      transition: 'background 160ms, color 160ms',
                    }}
                  >
                    <Icon size={19} strokeWidth={isActive ? 2.2 : 1.7} />

                    {isCart && totalQty > 0 && (
                      <motion.span
                        key={totalQty}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        style={{
                          position: 'absolute', top: 4, right: 6,
                          minWidth: 16, height: 16,
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--color-rose)',
                          color: '#fff',
                          fontSize: 9,
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '0 4px', lineHeight: 1,
                          border: '1.5px solid rgba(252,250,248,0.9)',
                          pointerEvents: 'none', zIndex: 2,
                        }}
                      >
                        {totalQty > 9 ? '9+' : totalQty}
                      </motion.span>
                    )}

                    <span style={{
                      fontSize: 9, fontFamily: 'var(--font-body)',
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                      opacity: isActive ? 1 : 0.6,
                      lineHeight: 1,
                      color: isActive ? '#fff' : 'var(--color-text)',
                    }}>{item.label}</span>
                  </motion.div>
                )

                return item.modal ? (
                  <button key={item.label} onClick={() => { if (item.modal === 'cart') setCartOpen(true); if (item.modal === 'gifts') setGiftsOpen(true) }} aria-label={item.label} style={{ background: 'none', border: 'none', padding: 0 }}>
                    {inner}
                  </button>
                ) : (
                  <Link key={item.label} href={item.href!} aria-label={item.label} style={{ textDecoration: 'none' }}>
                    {inner}
                  </Link>
                )
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
