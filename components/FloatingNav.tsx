"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Phone, User, Gift, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import CartModal from './CartModal'
import GiftsModal from './GiftsModal'
import Image from 'next/image'

const navItems = [
  { href: '/',           label: 'Accueil',   icon: Home,         modal: null },
  { href: '/contact',    label: 'Contact',   icon: Phone,        modal: null },
  { href: '/mon-compte', label: 'Connexion', icon: User,         modal: null },
  { href: null,          label: 'Cadeau',    icon: Gift,         modal: 'gifts' as const },
  { href: null,          label: 'Panier',    icon: ShoppingCart, modal: 'cart' as const },
]

export default function FloatingNav() {
  const pathname = usePathname()
  const [cartOpen, setCartOpen] = useState(false)
  const [giftsOpen, setGiftsOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setVisible(current < lastScrollY || current < 80)
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavClick = (modal: 'cart' | 'gifts' | null) => {
    if (modal === 'cart') setCartOpen(true)
    if (modal === 'gifts') setGiftsOpen(true)
  }

  return (
    <>
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <GiftsModal open={giftsOpen} onClose={() => setGiftsOpen(false)} />

      {/* ── FIXED LOGO — top center */}
      <div style={{ position: 'fixed', top: 'var(--space-3)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 60, pointerEvents: 'none' }}>
        <Link
          href="/"
          aria-label="Kanamaste — Accueil"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            background: 'rgba(255,253,249,0.85)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 20px',
            boxShadow: '0 4px 20px rgba(189,144,253,0.18)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Image src="/logo1.png" alt="Kanamaste" width={160} height={56} priority className="logo-img" style={{ objectFit: 'contain', display: 'block' }} />
        </Link>
      </div>

      <style>{`
        .logo-img { width: 110px; height: auto; }
        @media (min-width: 768px) { .logo-img { width: 160px; } }
      `}</style>

      {/* ── FLOATING BOTTOM NAV */}
      <div
        style={{ position: 'fixed', bottom: 'var(--space-4)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 50, pointerEvents: 'none' }}
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
                background: 'rgba(255,253,249,0.92)',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                boxShadow: '0 4px 24px rgba(189,144,253,0.22)',
                backdropFilter: 'blur(16px)',
                whiteSpace: 'nowrap',
                pointerEvents: 'auto',
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = item.href ? pathname === item.href : false
                const isModal = item.modal !== null

                const inner = (
                  <motion.div
                    whileTap={{ scale: 0.88 }}
                    whileHover={{ y: -2 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                      padding: '7px 13px',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'var(--color-primary)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--color-text-muted)',
                      minWidth: 44,
                      minHeight: 44,
                      cursor: 'pointer',
                      transition: 'background 0.18s, color 0.18s',
                      boxShadow: isActive ? 'var(--glow-cta)' : 'none',
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: isActive ? 1 : 0.6, lineHeight: 1 }}>
                      {item.label}
                    </span>
                  </motion.div>
                )

                return isModal ? (
                  <button key={item.label} onClick={() => handleNavClick(item.modal)} aria-label={item.label} style={{ textDecoration: 'none', background: 'none', border: 'none', padding: 0 }}>
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
