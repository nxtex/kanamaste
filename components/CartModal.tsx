"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Plus, Minus, Trash2, Package } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  category: string
  grams: number
  price: number
  qty: number
  bgColor: string
}

const SAMPLE_ITEMS: CartItem[] = [
  { id: 'amnesia', name: 'Amnesia Haze CBD', category: 'Fleur', grams: 5, price: 18.90, qty: 1, bgColor: '#e8f4e8' },
  { id: 'hash',    name: 'Hash Marocain Premium', category: 'Résine', grams: 3, price: 14.90, qty: 2, bgColor: '#f4ede0' },
]

const FREE_SHIPPING_THRESHOLD = 40

export default function CartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState<CartItem[]>(SAMPLE_ITEMS)
  const [confirmed, setConfirmed] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    )
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.90
  const total = subtotal + shipping
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  const handleConfirm = () => { setConfirmed(true); setTimeout(() => { setConfirmed(false); onClose() }, 2400) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cart-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'oklch(from var(--color-text) l c h / 0.52)',
            display: 'flex',
            /* mobile: bottom sheet; desktop: centered modal */
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={onClose}
        >
          {/* Desktop centering override via injected style */}
          <style>{`
            @media (min-width: 640px) {
              .cart-panel {
                border-bottom: 2px solid var(--color-text) !important;
                border-radius: var(--radius-xl) !important;
                max-height: 82dvh !important;
              }
            }
            @media (min-width: 640px) {
              .cart-backdrop-inner {
                align-items: center !important;
              }
            }
          `}</style>
          <motion.div
            key="cart-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={e => e.stopPropagation()}
            className="retro-grain cart-panel"
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-text)',
              borderBottom: 'none',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              width: '100%',
              maxWidth: 480,
              maxHeight: '88dvh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-5) var(--space-4)', borderBottom: '1.5px solid var(--color-border)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <ShoppingCart size={18} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Mon Panier</h2>
                <span className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, background: 'var(--color-primary)', color: 'var(--color-text-inverse)', borderColor: 'transparent' }}>{items.reduce((s,i)=>s+i.qty,0)}</span>
              </div>
              <button onClick={onClose} aria-label="Fermer" style={{ padding: 6, borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)', display: 'flex' }}>
                <X size={16} />
              </button>
            </div>

            {/* Shipping progress */}
            <div style={{ padding: 'var(--space-3) var(--space-5)', background: subtotal >= FREE_SHIPPING_THRESHOLD ? 'oklch(from var(--color-primary) l c h / 0.08)' : 'transparent', borderBottom: '1.5px solid var(--color-border)', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? '✓ Livraison offerte !' : `Encore ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}€ pour la livraison gratuite`}
                </span>
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-primary)' }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 9999, border: '1px solid var(--color-text)', overflow: 'hidden' }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} style={{ height: '100%', background: 'var(--color-primary)', borderRadius: 9999 }} />
              </div>
            </div>

            {/* Confirmation screen */}
            <AnimatePresence>
              {confirmed && (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', inset: 0, background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', zIndex: 10, borderRadius: 'inherit' }}>
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                    <Package size={52} style={{ color: 'var(--color-primary)' }} />
                  </motion.div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>Commande confirmée !</h3>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>Livraison sous 24–48h</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-muted)' }}>
                    <ShoppingCart size={40} style={{ margin: '0 auto var(--space-3)', opacity: 0.3 }} />
                    <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.08em' }}>Votre panier est vide</p>
                  </div>
                ) : items.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80, scale: 0.9 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    style={{ background: item.bgColor, border: '1.5px solid var(--color-text)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{item.category}</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{item.name}</p>
                      <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)' }}>{item.grams}g — {item.price.toFixed(2)}€/unité</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
                      <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-text)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                      </motion.button>
                      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                      <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-text)', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Plus size={12} />
                      </motion.button>
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', minWidth: 56, textAlign: 'right', flexShrink: 0 }}>{(item.price * item.qty).toFixed(2)}€</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1.5px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flexShrink: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Sous-total</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)' }}>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Livraison</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: shipping === 0 ? 'var(--color-primary)' : 'inherit' }}>{shipping === 0 ? 'Offerte ✓' : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700 }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{total.toFixed(2)}€</span>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleConfirm}
                  style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  Commander — {total.toFixed(2)}€
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
