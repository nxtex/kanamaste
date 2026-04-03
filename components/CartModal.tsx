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
  color: string
}

const DEMO_ITEMS: CartItem[] = [
  { id: 'amnesia', name: 'Amnesia Haze CBD', category: 'Fleur', grams: 2, price: 9.90, qty: 1, color: '#e8f4e8' },
  { id: 'hash',    name: 'Hash Marocain Premium', category: 'Résine', grams: 3, price: 14.90, qty: 1, color: '#f4ede0' },
]

export default function CartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState<CartItem[]>(DEMO_ITEMS)
  const [confirmed, setConfirmed] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ))
  }

  const removeItem = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== id))
      setRemovingId(null)
    }, 320)
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 40 ? 0 : 4.90
  const total = subtotal + shipping

  const handleOrder = () => { setConfirmed(true) }

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
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={onClose}
        >
          <style>{`
            @media (min-width: 640px) {
              .cart-panel {
                border-bottom: 2px solid var(--color-text) !important;
                border-radius: var(--radius-xl) !important;
                max-height: 80dvh !important;
              }
              .cart-backdrop {
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
              maxWidth: 520,
              maxHeight: '90dvh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: 'var(--space-5) var(--space-5) var(--space-4)', borderBottom: '1.5px solid var(--color-border)', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <ShoppingCart size={18} style={{ color: 'var(--color-primary)' }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Mon Panier</h2>
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, background: 'var(--color-primary)', color: 'var(--color-text-inverse)', borderRadius: 'var(--radius-full)', padding: '2px 8px', letterSpacing: '0.08em' }}>{items.reduce((s,i) => s+i.qty, 0)}</span>
                </div>
                <button onClick={onClose} aria-label="Fermer" style={{ padding: 6, borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)', display: 'flex' }}>
                  <X size={16} />
                </button>
              </div>

              {/* Shipping progress */}
              {subtotal < 40 && (
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>Livraison offerte dès 40€</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-primary)', letterSpacing: '0.08em' }}>{(40 - subtotal).toFixed(2)}€ restant</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--color-text)' }}>
                    <motion.div animate={{ width: `${Math.min(100, (subtotal/40)*100)}%` }} style={{ height: '100%', background: 'var(--color-primary)', borderRadius: 4 }} transition={{ duration: 0.4 }} />
                  </div>
                </div>
              )}
              {subtotal >= 40 && (
                <div style={{ marginTop: 'var(--space-3)', background: 'oklch(from var(--color-primary) l c h / 0.10)', border: '1.5px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-2) var(--space-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Package size={14} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-primary)', letterSpacing: '0.08em' }}>🎉 Livraison offerte !</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <AnimatePresence>
                {!confirmed ? (
                  items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-muted)' }}>
                      <ShoppingCart size={36} style={{ margin: '0 auto var(--space-4)', opacity: 0.3 }} />
                      <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em' }}>Votre panier est vide</p>
                    </div>
                  ) : (
                    items.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: removingId === item.id ? 0 : 1, x: removingId === item.id ? 60 : 0 }}
                        transition={{ duration: 0.28 }}
                        style={{ background: item.color, border: '1.5px solid var(--color-text)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{item.category} · {item.grams}g</p>
                          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{item.name}</p>
                          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 900, color: 'var(--color-primary)', marginTop: 2 }}>{(item.price * item.qty).toFixed(2)}€</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', background: 'var(--color-surface)', border: '1.5px solid var(--color-text)', borderRadius: 'var(--radius-sm)', padding: '2px', boxShadow: '2px 2px 0 var(--color-text)' }}>
                          <button onClick={() => updateQty(item.id, -1)} aria-label="Diminuer" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Minus size={12} /></button>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} aria-label="Augmenter" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label="Supprimer" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', border: '1.5px solid var(--color-border)', cursor: 'pointer' }}><Trash2 size={14} /></button>
                      </motion.div>
                    ))
                  )
                ) : (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-12) var(--space-4)', gap: 'var(--space-4)' }}
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1, stiffness: 400, damping: 18 }}>
                      <Package size={52} style={{ color: 'var(--color-primary)' }} />
                    </motion.div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>Commande confirmée !</h3>
                    <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', maxWidth: '30ch' }}>Votre colis part sous 24h. Merci pour votre confiance.</p>
                    <button onClick={onClose} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '12px 28px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', cursor: 'pointer' }}>Fermer</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer summary */}
            {!confirmed && items.length > 0 && (
              <div style={{ padding: 'var(--space-4) var(--space-5) var(--space-5)', borderTop: '1.5px solid var(--color-border)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Sous-total</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em' }}>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', color: 'var(--color-text-muted)' }}>Livraison</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', color: shipping === 0 ? 'var(--color-primary)' : 'inherit' }}>{shipping === 0 ? 'Offerte 🎉' : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid var(--color-border)', paddingTop: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700 }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 900, color: 'var(--color-primary)' }}>{total.toFixed(2)}€</span>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleOrder} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  <ShoppingCart size={16} /> Commander — {total.toFixed(2)}€
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
