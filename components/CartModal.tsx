"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package } from 'lucide-react'

export interface CartItem {
  id: string
  name: string
  category: string
  grams: number
  price: number
  image: string
  qty: number
}

// Demo initial cart items
const INITIAL_ITEMS: CartItem[] = [
  { id: 'amnesia-haze', name: 'Amnesia Haze CBD', category: 'Fleur', grams: 5, price: 22.9, image: 'https://images.unsplash.com/photo-1603909223429-69bb7b8a6c4e?w=200&q=80', qty: 1 },
  { id: 'huile-full-spectrum', name: 'Huile Full Spectrum 10%', category: 'Huile', grams: 10, price: 34.9, image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&q=80', qty: 2 },
]

const FREE_SHIPPING_THRESHOLD = 40

interface CartModalProps {
  open: boolean
  onClose: () => void
}

export default function CartModal({ open, onClose }: CartModalProps) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [ordered, setOrdered] = useState(false)

  const setQty = (id: string, delta: number) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    )
  }
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.9
  const total = subtotal + shipping
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  const handleOrder = () => {
    setOrdered(true)
    setTimeout(() => { setOrdered(false); setItems([]); onClose() }, 3000)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cart-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'oklch(from var(--color-text) l c h / 0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          onClick={onClose}
        >
          <motion.div
            key="cart-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-text)',
              borderBottom: 'none',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              width: '100%',
              maxWidth: 540,
              maxHeight: '90dvh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-3) var(--space-3) 0' }}>
              <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)', borderBottom: '2px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <ShoppingCart size={20} style={{ color: 'var(--color-primary)' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 800 }}>Mon Panier</h2>
                {items.length > 0 && (
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '3px 8px', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-text)' }}>
                    {items.reduce((s, i) => s + i.qty, 0)} article{items.reduce((s, i) => s + i.qty, 0) > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button onClick={onClose} aria-label="Fermer le panier" style={{ padding: 6, borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', border: '1.5px solid var(--color-border)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && toFreeShipping > 0 && (
              <div style={{ padding: 'var(--space-3) var(--space-5)', background: 'var(--color-surface-offset)', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                  Plus que <strong style={{ color: 'var(--color-primary)' }}>{toFreeShipping.toFixed(2)}€</strong> pour la livraison offerte
                </p>
                <div style={{ height: 5, borderRadius: 9999, background: 'var(--color-border)', border: '1px solid var(--color-text)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    style={{ height: '100%', background: 'var(--color-primary)', borderRadius: 9999 }}
                  />
                </div>
              </div>
            )}
            {items.length > 0 && toFreeShipping === 0 && (
              <div style={{ padding: 'var(--space-2) var(--space-5)', background: 'var(--color-primary)', borderBottom: '1px solid var(--color-text)' }}>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-inverse)', textAlign: 'center' }}>✦ Livraison offerte !</p>
              </div>
            )}

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <AnimatePresence>
                {ordered ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center' }}
                  >
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -6, 6, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.7 }}
                    >
                      <Package size={56} style={{ color: 'var(--color-primary)' }} />
                    </motion.div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800 }}>Commande confirmée !</h3>
                    <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', lineHeight: 1.6 }}>Votre colis Kanamaste sera expédié dans les 24h. Un email de confirmation vous a été envoyé.</p>
                  </motion.div>
                ) : items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center' }}
                  >
                    <ShoppingCart size={44} style={{ color: 'var(--color-text-faint)' }} />
                    <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>Votre panier est vide</p>
                    <button onClick={onClose} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Découvrir nos produits →</button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0, padding: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      style={{ display: 'flex', gap: 'var(--space-3)', background: 'var(--color-surface-offset)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', alignItems: 'center' }}
                    >
                      <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, border: '1.5px solid var(--color-border)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{item.category} · {item.grams}g</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 900, color: 'var(--color-primary)' }}>{(item.price * item.qty).toFixed(2)}€</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1.5px solid var(--color-text)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                          <button onClick={() => setQty(item.id, -1)} aria-label="Diminuer" style={{ padding: '5px 7px', background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', minWidth: 28, minHeight: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={11} /></button>
                          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 12, fontWeight: 700, padding: '0 8px', minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => setQty(item.id, 1)} aria-label="Augmenter" style={{ padding: '5px 7px', background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', minWidth: 28, minHeight: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={11} /></button>
                        </div>
                        <button onClick={() => remove(item.id)} aria-label="Supprimer" style={{ color: 'var(--color-error)', padding: 4 }}><Trash2 size={14} /></button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && !ordered && (
              <div style={{ borderTop: '2px solid var(--color-border)', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>Sous-total</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>Livraison</span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', fontWeight: 700, color: shipping === 0 ? 'var(--color-primary)' : 'var(--color-text)' }}>{shipping === 0 ? 'Offerte ✦' : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 800 }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{total.toFixed(2)}€</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOrder}
                  style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)' }}
                >
                  Commander <ArrowRight size={16} />
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
