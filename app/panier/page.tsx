"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import FloatingNav from '@/components/FloatingNav'

type CartItem = {
  id: string
  name: string
  category: string
  grams: number
  price: number
  qty: number
  bgColor: string
}

const INITIAL_CART: CartItem[] = [
  { id: 'amnesia-2g', name: 'Amnesia Haze CBD', category: 'Fleur', grams: 2, price: 9.9, qty: 1, bgColor: '#eaf4e8' },
  { id: 'huile-full-10', name: 'Huile Full Spectrum 10%', category: 'Huile', grams: 10, price: 34.9, qty: 1, bgColor: '#fdf0d8' },
]

export default function PanierPage() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART)
  const [checkedOut, setCheckedOut] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    )
  }

  const remove = (id: string) => setCart(prev => prev.filter(item => item.id !== id))

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shipping = total >= 40 ? 0 : 4.9

  if (checkedOut) {
    return (
      <>
        <FloatingNav />
        <main style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)', paddingBottom: 'calc(var(--nav-height) + 80px)' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center', maxWidth: 480 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ fontSize: 72 }}
            >
              &#127873;
            </motion.div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--color-primary)' }}><em>Merci !</em></h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>Votre commande a été reçue. Vous recevrez un email de confirmation sous peu. Livraison en 24–48h.</p>
            <Link href="/produits" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '14px 32px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: 'var(--shadow-card)', textDecoration: 'none' }}>Retour boutique</Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height) + 80px)' }}>

        {/* Header */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-surface-offset)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'clamp(var(--space-10), 6vw, var(--space-14)) var(--space-4)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>&#9670; Mon panier &#9670;</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, marginTop: 'var(--space-2)', lineHeight: 1.05 }}>
              <em style={{ color: 'var(--color-primary)' }}>Panier</em>
            </h1>
          </div>
        </section>

        {/* Cart content */}
        <section style={{ padding: 'clamp(var(--space-8), 5vw, var(--space-14)) var(--space-4)', maxWidth: 'var(--content-default)', margin: '0 auto' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-8)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
              <ShoppingCart size={48} style={{ color: 'var(--color-text-faint)' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-muted)' }}>Votre panier est vide</h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-faint)' }}>Découvrez nos produits et commencez votre sélection.</p>
              <Link href="/produits" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '14px 32px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: 'var(--shadow-card)', textDecoration: 'none', display: 'inline-block' }}>Explorer la boutique →</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 'var(--space-6)' }}>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      className="retro-grain"
                      style={{
                        background: item.bgColor,
                        border: '2px solid var(--color-text)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-4)',
                        boxShadow: 'var(--shadow-card)',
                        display: 'flex',
                        gap: 'var(--space-4)',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>{item.category} — {item.grams}g</p>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>{item.name}</h3>
                        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--color-primary)', fontSize: 'var(--text-base)', marginTop: 4 }}>{item.price.toFixed(2)}€</p>
                      </div>

                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          aria-label="Diminuer"
                          style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        ><Minus size={14} /></button>
                        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-base)', fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Augmenter"
                          style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        ><Plus size={14} /></button>
                      </div>

                      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'var(--text-lg)', color: 'var(--color-primary)', minWidth: 64, textAlign: 'right' }}>
                        {(item.price * item.qty).toFixed(2)}€
                      </p>

                      <button
                        onClick={() => remove(item.id)}
                        aria-label="Supprimer"
                        style={{ color: 'var(--color-text-faint)', padding: 'var(--space-1)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color var(--transition)' }}
                      ><Trash2 size={16} /></button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <motion.div
                layout
                className="retro-grain"
                style={{
                  background: 'var(--color-surface)',
                  border: '2px solid var(--color-text)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                }}
              >
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Récapitulatif</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', borderTop: '1.5px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                  {[
                    { label: 'Sous-total', value: `${total.toFixed(2)}€` },
                    { label: 'Livraison', value: shipping === 0 ? 'Offerte ✓' : `${shipping.toFixed(2)}€` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', fontWeight: 600, color: shipping === 0 && label === 'Livraison' ? 'var(--color-primary)' : 'var(--color-text)' }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '2px solid var(--color-text)', paddingTop: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{(total + shipping).toFixed(2)}€</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>
                    Livraison offerte dès 40€ (encore {(40 - total).toFixed(2)}€)
                  </p>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCheckedOut(true)}
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 'var(--text-base)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '2px solid var(--color-text)',
                    boxShadow: 'var(--shadow-card)',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-2)',
                  }}
                >
                  <ShoppingCart size={18} />
                  Commander
                </motion.button>
                <Link
                  href="/produits"
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  Continuer mes achats
                </Link>
              </motion.div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Kanamaste</Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.06em' }}>&copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
