"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Phone, User, Gift, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/',           label: 'Accueil',  icon: Home },
  { href: '/contact',    label: 'Contact',  icon: Phone },
  { href: '/mon-compte', label: 'Connexion', icon: User },
  { href: '/cadeaux',    label: 'Cadeau',   icon: Gift },
  { href: '/panier',     label: 'Panier',   icon: ShoppingCart },
]

export default function FloatingNav() {
  const pathname = usePathname()
  const [cartCount, setCartCount] = useState(0)
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
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="floating-nav"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-4 left-1/2 z-50"
          style={{ transform: 'translateX(-50%)' }}
          aria-label="Navigation principale"
        >
          <div
            className="relative flex flex-col items-center"
            style={{ gap: 'var(--space-2)' }}
          >
            {/* Logo pill above nav bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center justify-center"
            >
              <Link
                href="/"
                aria-label="Kanamaste — Accueil"
                style={{
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 20px',
                  boxShadow: '3px 3px 0 var(--color-text)',
                  border: '2px solid var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                {/* Inline SVG retro leaf logo */}
                <svg
                  width="22" height="22" viewBox="0 0 32 32" fill="none"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3 C8 8 4 16 8 24 C10 28 14 30 16 30 C18 30 22 28 24 24 C28 16 24 8 16 3Z"
                    fill="var(--color-primary-light)"
                    stroke="#f5f0e8"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 3 L16 30"
                    stroke="#f5f0e8"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M16 12 C11 14 9 18 10 22"
                    stroke="#f5f0e8"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 12 C21 14 23 18 22 22"
                    stroke="#f5f0e8"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    color: '#f5f0e8',
                    letterSpacing: '0.04em',
                    fontStyle: 'italic',
                  }}
                >
                  Kanamaste
                </span>
              </Link>
            </motion.div>

            {/* Main nav pill */}
            <div
              style={{
                background: 'var(--color-surface)',
                border: '2px solid var(--color-text)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 12px',
                display: 'flex',
                gap: 'var(--space-1)',
                boxShadow: '4px 4px 0 var(--color-text)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const isCart = item.href === '/panier'

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    className="relative group"
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ y: -2 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-full)',
                        background: isActive
                          ? 'var(--color-primary)'
                          : 'transparent',
                        color: isActive
                          ? 'var(--color-text-inverse)'
                          : 'var(--color-text-muted)',
                        minWidth: 44,
                        minHeight: 44,
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'all var(--transition)',
                      }}
                    >
                      <span style={{ position: 'relative' }}>
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                        {isCart && cartCount > 0 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: -6,
                              right: -6,
                              background: 'var(--color-terracotta)',
                              color: 'white',
                              fontSize: 10,
                              fontFamily: 'var(--font-stamp)',
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1.5px solid var(--color-text)',
                            }}
                          >
                            {cartCount}
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: 'var(--font-stamp)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          opacity: isActive ? 1 : 0.6,
                          lineHeight: 1,
                        }}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
