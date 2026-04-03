"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Phone, User, Gift, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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

export default function FloatingNav() {
  const pathname = usePathname()
  const { totalQty } = useCart()
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

  return (
    <>
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <GiftsModal open={giftsOpen} onClose={() => setGiftsOpen(false)} />

      {/* ── LOGO — frosted pill, plus sombre */}
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
            background: 'rgba(42, 26, 78, 0.62)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(189, 144, 253, 0.45)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 22px',
            boxShadow: '0 2px 16px rgba(42, 26, 78, 0.28)',
          }}
        >
          <Image
            src="/logo1.png"
            alt="Kanamaste"
            width={110}
            height={44}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>

      {/* ── FLOATING BOTTOM NAV */}
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

                    {/* Badge panier */}
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
                      if (item.modal === 'cart') setCartOpen(true)
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
