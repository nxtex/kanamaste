"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Phone, User, Gift, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import CartModal from './CartModal'
import GiftsModal from './GiftsModal'

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

      <div
        style={{
          position: 'fixed',
          bottom: 'var(--space-4)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 50,
          pointerEvents: 'none',
        }}
        aria-label="Navigation principale"
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              key="floating-nav"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                pointerEvents: 'auto',
              }}
            >
              {/* Logo pill */}
              <Link
                href="/"
                aria-label="Kanamaste — Accueil"
                style={{
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 20px',
                  boxShadow: '3px 3px 0 var(--color-text)',
                  border: '2px solid var(--color-text)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 3 C8 8 4 16 8 24 C10 28 14 30 16 30 C18 30 22 28 24 24 C28 16 24 8 16 3Z" fill="none" stroke="#f5f0e8" strokeWidth="1.5" />
                  <path d="M16 3 L16 30" stroke="#f5f0e8" strokeWidth="1" strokeDasharray="2 3" />
                  <path d="M16 12 C11 14 9 18 10 22" stroke="#f5f0e8" strokeWidth="1" strokeLinecap="round" />
                  <path d="M16 12 C21 14 23 18 22 22" stroke="#f5f0e8" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-sm)',
                  color: '#f5f0e8',
                  letterSpacing: '0.04em',
                  fontStyle: 'italic',
                  whiteSpace: 'nowrap',
                }}>Kanamaste</span>
              </Link>

              {/* Nav pill */}
              <nav
                style={{
                  background: 'var(--color-surface)',
                  border: '2px solid var(--color-text)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  boxShadow: '4px 4px 0 var(--color-text)',
                  backdropFilter: 'blur(12px)',
                  whiteSpace: 'nowrap',
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
                        color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                        minWidth: 44,
                        minHeight: 44,
                        cursor: 'pointer',
                        transition: 'background 0.18s, color 0.18s',
                      }}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                      <span style={{
                        fontSize: 9,
                        fontFamily: 'var(--font-stamp)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        opacity: isActive ? 1 : 0.6,
                        lineHeight: 1,
                      }}>{item.label}</span>
                    </motion.div>
                  )

                  return isModal ? (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.modal)}
                      aria-label={item.label}
                      style={{ textDecoration: 'none', background: 'none', border: 'none', padding: 0 }}
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
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
