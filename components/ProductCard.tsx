"use client"

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from 'framer-motion'
import { ShoppingCart, Layers, Grid3X3, LayoutList, Star, RotateCcw, ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export type LayoutMode = 'stack' | 'grid' | 'list'

export interface ProductData {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  intensity: number
  flavours: string[]
  feeling: string[]
  rating: number
  reviewCount: number
  priceOptions: { grams: number; price: number }[]
  image: string
  badge?: string
  badgeColor?: string
  bgColor: string
}

const SWIPE_THRESHOLD = 50
const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList }

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'flex', gap: 2, color: 'var(--color-gold)' }} aria-label={`${rating} étoiles`}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? 'currentColor' : 'none'} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }} />
      ))}
    </span>
  )
}

function IntensityBar({ level }: { level: number }) {
  const labels = ['Très léger','Léger','Moyen','Fort','Intense']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ width: 22, height: 6, borderRadius: 2, background: i <= level ? 'var(--color-primary)' : 'var(--color-border)', border: '1px solid var(--color-text)' }} />
        ))}
      </div>
      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>{labels[level - 1]}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT DETAIL MODAL
   Mobile: slides up from bottom
   Desktop (≥640px): centered dialog
───────────────────────────────────────────────────────────── */
function ProductDetail({ product, onClose }: { product: ProductData; onClose: () => void }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000) }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'oklch(from var(--color-text) l c h / 0.55)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <style>{`
        @media (min-width: 640px) {
          .product-detail-panel {
            border-bottom: 2px solid var(--color-text) !important;
            border-radius: var(--radius-xl) !important;
            max-height: 82dvh !important;
            margin-bottom: 0 !important;
          }
          .product-detail-backdrop {
            align-items: center !important;
          }
        }
      `}</style>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        className="retro-grain product-detail-panel"
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-text)',
          borderBottom: 'none',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          width: '100%',
          maxHeight: '88dvh',
          overflowY: 'auto',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          maxWidth: 560,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
        </div>
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', background: product.bgColor, border: '2px solid var(--color-text)', overflow: 'hidden' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>{product.name}</h2>
          </div>
          {product.badge && <span className="badge" style={{ background: product.badgeColor || 'var(--color-primary)', color: 'var(--color-text-inverse)', borderColor: 'transparent', fontFamily: 'var(--font-stamp)', whiteSpace: 'nowrap', flexShrink: 0 }}>{product.badge}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-stamp)' }}>({product.reviewCount} avis)</span>
        </div>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{product.longDescription}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Intensité</span>
            <IntensityBar level={product.intensity} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Effets</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{product.feeling.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>{f}</span>)}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', gridColumn: '1 / -1' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Arômes</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{product.flavours.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Quantité</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {product.priceOptions.map(opt => (
              <button key={opt.grams} onClick={() => setSelectedGrams(opt)} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-surface)', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', cursor: 'pointer' }}>
                {opt.grams}g — {opt.price.toFixed(2)}€
              </button>
            ))}
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.96 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-base)', letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', transition: 'background 200ms' }}>
          <ShoppingCart size={18} />
          {added ? '✓ Ajouté au panier !' : `Ajouter — ${selectedGrams.price.toFixed(2)}€`}
        </motion.button>
        <button onClick={onClose} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: 3, paddingBottom: 'var(--space-4)' }}>Fermer</button>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FLIP CARD
   Front: product summary + Panier + "Retourner" button
   Back:  full details + "← Retour" + "Voir la page →"
   Uses CSS 3D perspective flip on Y axis.
───────────────────────────────────────────────────────────── */
function FlipCard({
  product, layout, isTop, stackPosition, isDragging, onOpenDetail
}: {
  product: ProductData
  layout: LayoutMode
  isTop: boolean
  stackPosition: number
  isDragging: boolean
  onOpenDetail: () => void
}) {
  const [flipped, setFlipped] = useState(false)
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isDragging) setFlipped(f => !f)
  }

  /* In list mode, no flip — just a regular card */
  if (layout === 'list') {
    return (
      <div
        className="retro-grain"
        style={{
          background: product.bgColor,
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          gap: 'var(--space-4)',
          alignItems: 'center',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0 }}>
          <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
          <Stars rating={product.rating} size={12} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShoppingCart size={12} />{added ? '✓ OK' : 'Panier'}
            </motion.button>
            <button onClick={onOpenDetail} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Détails</button>
          </div>
        </div>
      </div>
    )
  }

  /* Grid / Stack: flip card */
  const cardStyle: React.CSSProperties = {
    background: product.bgColor,
    border: '2px solid var(--color-text)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    boxShadow: layout === 'stack'
      ? `${3 + (products_length_placeholder - 1 - stackPosition) * 2}px ${3 + (products_length_placeholder - 1 - stackPosition) * 2}px 0 var(--color-text)`
      : '3px 3px 0 var(--color-text)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-3)',
  }

  return (
    <div
      style={{
        perspective: '1200px',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── FRONT ─────────────────────────────────── */}
        <div className="retro-grain" style={cardStyle}>
          {/* Image */}
          <div style={{ width: '100%', aspectRatio: '3/2', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0 }}>
            <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>{product.category}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
            </div>
            {product.badge && (
              <span className="badge" style={{ background: product.badgeColor || 'var(--color-primary)', color: 'var(--color-text-inverse)', borderColor: 'transparent', fontFamily: 'var(--font-stamp)', fontSize: 9, flexShrink: 0 }}>{product.badge}</span>
            )}
          </div>

          <Stars rating={product.rating} size={13} />

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>

          {/* Intensity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Intensité</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => (<div key={i} style={{ width: 22, height: 6, borderRadius: 2, background: i <= product.intensity ? 'var(--color-primary)' : 'var(--color-border)', border: '1px solid var(--color-text)' }} />))}
            </div>
          </div>

          {/* Flavours */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {product.flavours.slice(0,3).map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}
          </div>

          {/* Gram selector + price */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {product.priceOptions.map(opt => (
              <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 120ms' }}>
                {opt.grams}g
              </button>
            ))}
          </div>

          {/* Price + Cart */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)', marginTop: 'auto' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', transition: 'background 200ms' }}>
              <ShoppingCart size={13} />{added ? '✓ OK' : 'Panier'}
            </motion.button>
          </div>

          {/* Retourner button */}
          <button
            onClick={handleFlip}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', padding: '5px 0', borderTop: '1px dashed var(--color-border)', marginTop: 4 }}
          >
            <RotateCcw size={11} />
            Retourner
          </button>

          {isTop && layout === 'stack' && (
            <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'oklch(from var(--color-text-muted) l c h / 0.4)', letterSpacing: '0.08em' }}>← Glisser →</span>
            </div>
          )}
        </div>

        {/* ── BACK ──────────────────────────────────── */}
        <div
          className="retro-grain"
          style={{
            ...cardStyle,
            transform: 'rotateY(180deg)',
            background: 'var(--color-surface)',
            justifyContent: 'flex-start',
          }}
        >
          {/* Back header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
            <button
              onClick={handleFlip}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', background: 'transparent', cursor: 'pointer' }}
            >
              <ArrowLeft size={11} /> Retour
            </button>
            <Link
              href={`/produits/${product.id}`}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-inverse)', background: 'var(--color-primary)', padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', textDecoration: 'none', cursor: 'pointer' }}
            >
              Voir la page <ExternalLink size={10} />
            </Link>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
            <Stars rating={product.rating} size={12} />
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-muted)' }}>{product.reviewCount} avis</span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.longDescription}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Intensité</span>
              <IntensityBar level={product.intensity} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Effets</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                {product.feeling.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>{f}</span>)}
              </div>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Arômes</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                {product.flavours.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}
              </div>
            </div>
          </div>

          {/* Gram selector + price + cart on back */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {product.priceOptions.map(opt => (
                <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '4px 9px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {opt.grams}g
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', transition: 'background 200ms' }}>
                <ShoppingCart size={13} />{added ? '✓ OK' : 'Panier'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* Placeholder referenced in cardStyle above — will be replaced per-component */
const products_length_placeholder = 6

/* ─────────────────────────────────────────────────────────────
   MORPHING PRODUCT STACK
───────────────────────────────────────────────────────────── */
export function MorphingProductStack({
  products,
  defaultLayout = 'stack',
}: {
  products: ProductData[]
  defaultLayout?: LayoutMode
}) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [activeIndex, setActiveIndex] = useState(0)
  const [detailProduct, setDetailProduct] = useState<ProductData | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -800)
      setActiveIndex(p => (p + 1) % products.length)
    else if (offset.x > SWIPE_THRESHOLD || swipe > 800)
      setActiveIndex(p => (p - 1 + products.length) % products.length)
    setTimeout(() => { setIsDragging(false); setDraggingId(null) }, 50)
  }

  /* Build ordered stack: activeIndex on top (stackPosition 0)
     Render back-to-front so top card is painted last */
  const getStackItems = () => {
    const result = []
    for (let i = 0; i < products.length; i++) {
      const index = (activeIndex + i) % products.length
      result.push({ ...products[index], stackPosition: i })
    }
    return result.reverse()
  }

  const CARD_W = 'min(90vw, 460px)'
  const CARD_H = 600
  const OFFSET = 10
  const N = products.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Layout toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-1)', background: 'var(--color-surface-offset)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-1)', width: 'fit-content', margin: '0 auto', boxShadow: 'var(--shadow-sm)' }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
          const Icon = layoutIcons[mode]
          const isActive = layout === mode
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              aria-label={`Affichage ${mode}`}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: '8px 18px', borderRadius: 'var(--radius-full)', background: isActive ? 'var(--color-primary)' : 'transparent', color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)', border: isActive ? '1.5px solid var(--color-text)' : '1.5px solid transparent', boxShadow: isActive ? '2px 2px 0 var(--color-text)' : 'none', fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all var(--transition)' }}
            >
              <Icon size={14} />
              <span>{mode === 'stack' ? 'Pile' : mode === 'grid' ? 'Grille' : 'Liste'}</span>
            </button>
          )
        })}
      </div>

      {/* ── STACK MODE ─────────────────────────────────────────── */}
      {layout === 'stack' && (
        <div
          style={{
            position: 'relative',
            width: CARD_W,
            /* Extra height for back-card offset peek + flip space */
            height: CARD_H + (N - 1) * OFFSET,
            margin: '0 auto',
            overflow: 'visible',
          }}
        >
          {getStackItems().map(product => {
            const isTop = product.stackPosition === 0
            /* Back cards peek: offset increases with depth */
            const peekOffset = (N - 1 - product.stackPosition) * OFFSET
            return (
              <motion.div
                key={product.id}
                style={{
                  position: 'absolute',
                  /* Back cards shift down + right so they peek behind the top card */
                  top: peekOffset,
                  left: peekOffset / 2,
                  right: -(peekOffset / 2),
                  height: CARD_H,
                  /* CRITICAL: dragging card must be above ALL others */
                  zIndex: draggingId === product.id ? 50 : (isTop ? 10 : product.stackPosition + 1),
                  rotate: isTop ? 0 : (product.stackPosition % 2 === 0 ? 1.5 : -1.5),
                  cursor: isTop ? 'grab' : 'default',
                  overflow: 'visible',
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                onDragStart={() => { setIsDragging(true); setDraggingId(product.id) }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
                animate={{
                  rotate: isTop ? 0 : (product.stackPosition % 2 === 0 ? 1.5 : -1.5),
                  zIndex: draggingId === product.id ? 50 : (isTop ? 10 : product.stackPosition + 1),
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <FlipCard
                  product={product}
                  layout="stack"
                  isTop={isTop}
                  stackPosition={product.stackPosition}
                  isDragging={isDragging}
                  onOpenDetail={() => setDetailProduct(product)}
                />
              </motion.div>
            )
          })}
        </div>
      )}

      {/* ── GRID MODE ──────────────────────────────────────────── */}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-5)' }}>
          {products.map((product, i) => (
            <div key={product.id} style={{ height: 560 }}>
              <FlipCard
                product={product}
                layout="grid"
                isTop={false}
                stackPosition={i}
                isDragging={false}
                onOpenDetail={() => setDetailProduct(product)}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── LIST MODE ──────────────────────────────────────────── */}
      {layout === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {products.map((product, i) => (
            <FlipCard
              key={product.id}
              product={product}
              layout="list"
              isTop={false}
              stackPosition={i}
              isDragging={false}
              onOpenDetail={() => setDetailProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Stack dots */}
      {layout === 'stack' && products.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 'var(--space-2)' }}>
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Produit ${i + 1}`}
              style={{ height: 6, width: i === activeIndex ? 18 : 6, borderRadius: 9999, background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)', border: '1.5px solid var(--color-text)', cursor: 'pointer', transition: 'all 200ms' }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />}
      </AnimatePresence>
    </div>
  )
}
