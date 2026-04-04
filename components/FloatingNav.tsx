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
  { href: null,          label: 'Panier',    icon: ShoppingCart, modal: 'cart' as const },
]

const categories = [
  { label: 'Fleurs CBD',       icon: Leaf,         slug: 'fleurs' },
  { label: 'Small Buds CBD',   icon: Package,      slug: 'small-buds' },
  { label: 'Résines CBD',      icon: Hash,         slug: 'resines' },
  { label: 'Pollens CBD',      icon: Wind,         slug: 'pollens' },
  { label: 'Extractions CBD',  icon: FlaskConical, slug: 'extractions' },
]

export default function FloatingNav() {
  const pathname = usePathname()
  const { totalQty } = useCart()
  const [cartOpen, setCartOpen]   = useState(false)
  const [giftsOpen, setGiftsOpen] = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [visible, setVisible]     = useState(true)
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

  // close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isLoginPage = pathname === '/mon-compte'

  return (
    <>
      <CartModal  open={cartOpen}  onClose={() => setCartOpen(false)}  />
      <GiftsModal open={giftsOpen} onClose={() => setGiftsOpen(false)} />

      {/* ── LOGO PILL ── only hide on /mon-compte to avoid covering the User icon */}
      {!isLoginPage && (
        <div style={{
          position: 'fixed', top: 'var(--space-3)',
          left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          zIndex: 60, pointerEvents: 'none',
        }}>
          <Link
            href="/"
            aria-label="Kanamaste — Accueil"
            style={{
              pointerEvents: 'auto',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              background: 'rgba(28, 16, 54, 0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(189, 144, 253, 0.45)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 22px',
              boxShadow: '0 2px 16px rgba(28, 16, 54, 0.36)',
            }}
          >
            <Image src="/logo1.png" alt="Kanamaste" width={110} height={44} priority style={{ objectFit: 'contain' }} />
          </Link>
        </div>
      )}

      {/* ── HAMBURGER BUTTON (top-left) ── */}
      <motion.button
        aria-label={menuOpen ? 'Fermer le menu' : 'Catégories'}
        onClick={() => setMenuOpen(v => !v)}
        whileTap={{ scale: 0.88 }}
        style={{
          position: 'fixed', top: 'var(--space-3)', left: 'var(--space-3)',
          zIndex: 70,
          width: 48, height: 48,
          borderRadius: 'var(--radius-full)',
          background: menuOpen ? 'var(--color-primary)' : 'rgba(28,16,54,0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(189,144,253,0.45)',
          boxShadow: '0 2px 16px rgba(28,16,54,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 200ms',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen
            ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X    size={20} color="#fff" /></motion.span>
            : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={20} color="#fff" /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* ── CATEGORY DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 62, background: 'rgba(10,5,25,0.55)', backdropFilter: 'blur(3px)' }}
            />
            {/* panel */}
            <motion.div
              key="drawer"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: 'min(88vw, 320px)',
                zIndex: 63,
                background: 'var(--color-surface)',
                borderRight: '2px solid var(--color-border)',
                boxShadow: '6px 0 32px rgba(28,16,54,0.22)',
                display: 'flex', flexDirection: 'column',
                padding: 'var(--space-6) var(--space-4)',
                paddingTop: 'calc(var(--space-6) + 56px)',
                gap: 'var(--space-2)',
                overflowY: 'auto',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-3)',
                paddingLeft: 'var(--space-2)',
              }}>✦ Catégories ✦</span>

              {categories.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i, type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <Link
                      href={`/produits?categorie=${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1.5px solid var(--color-border)',
                        background: 'var(--color-surface-offset)',
                        textDecoration: 'none',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-stamp)',
                        fontSize: 'var(--text-sm)',
                        letterSpacing: '0.06em',
                        transition: 'background 150ms, border-color 150ms, box-shadow 150ms',
                        boxShadow: '2px 2px 0 var(--color-border)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-muted)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)'
                        ;(e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0 var(--color-primary)'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-offset)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                        ;(e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 0 var(--color-border)'
                      }}
                    >
                      <span style={{
                        width: 36, height: 36, borderRadius: 'var(--radius-md)',
                        background: 'var(--color-primary-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={16} color="var(--color-primary)" strokeWidth={1.8} />
                      </span>
                      {cat.label}
                    </Link>
                  </motion.div>
                )
              })}

              {/* divider */}
              <div style={{ height: 1, background: 'var(--color-border)', margin: 'var(--space-3) 0' }} />

              <Link
                href="/produits"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1.5px solid var(--color-text)',
                  boxShadow: '2px 2px 0 var(--color-text)',
                }}
              >
                Voir tous les produits →
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── FLOATING BOTTOM NAV ── */}
      <div
        style={{
          position: 'fixed', bottom: 'var(--space-4)',
          left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          zIndex: 50, pointerEvents: 'none',
        }}
        aria-label="Navigation principale"
      >
        <AnimatePresence>
          {visible && (
            <motion.nav
              key="floating-nav"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{
                background: 'rgba(250, 246, 240, 0.72)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1.5px solid rgba(189, 144, 253, 0.35)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 10px',
                display: 'flex', alignItems: 'center', gap: 'var(--space-1)',
                boxShadow: '0 4px 24px rgba(124, 79, 212, 0.15), 0 1px 3px rgba(42,26,78,0.08)',
                whiteSpace: 'nowrap',
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
                    whileHover={{ y: -2 }}
                    style={{
                      position: 'relative',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      gap: '3px',
                      padding: '7px 13px',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'var(--color-primary)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--color-text)',
                      minWidth: 44, minHeight: 44,
                      cursor: 'pointer',
                      transition: 'background 0.18s, color 0.18s',
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />

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
                          border: '1.5px solid rgba(250,246,240,0.9)',
                          pointerEvents: 'none', zIndex: 2,
                        }}
                      >
                        {totalQty > 9 ? '9+' : totalQty}
                      </motion.span>
                    )}

                    <span style={{
                      fontSize: 9,
                      fontFamily: 'var(--font-stamp)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      opacity: isActive ? 1 : 0.65,
                      lineHeight: 1,
                      color: isActive ? '#fff' : 'var(--color-text)',
                    }}>{item.label}</span>
                  </motion.div>
                )

                return item.modal ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.modal === 'cart')  setCartOpen(true)
                      if (item.modal === 'gifts') setGiftsOpen(true)
                    }}
                    aria-label={item.label}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                    {inner}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    aria-label={item.label}
                    style={{ textDecoration: 'none' }}
                  >
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
