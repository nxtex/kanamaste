"use client"

import { useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
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
   Desktop (≥640px): centered dialog in the middle of the page
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
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'oklch(from var(--color-text) l c h / 0.6)',
        /* Always center on all screen sizes */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="retro-grain"
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: 560,
          maxHeight: '88dvh',
          overflowY: 'auto',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          boxShadow: '6px 6px 0 var(--color-text)',
          position: 'relative',
        }}
      >
        {/* Close pill */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
        </div>

        {/* Image */}
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', background: product.bgColor, border: '2px solid var(--color-text)', overflow: 'hidden' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Title + badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.2, marginTop: 2 }}>{product.name}</h2>
          </div>
          {product.badge && <span className="badge" style={{ background: product.badgeColor || 'var(--color-primary)', color: 'var(--color-text-inverse)', borderColor: 'transparent', fontFamily: 'var(--font-stamp)', whiteSpace: 'nowrap', flexShrink: 0 }}>{product.badge}</span>}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-stamp)' }}>({product.reviewCount} avis)</span>
        </div>

        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{product.longDescription}</p>

        {/* Details grid */}
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

        {/* Gram selector */}
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

        {/* Add to cart */}
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

  /* ── LIST MODE: no flip ─────────────────────────────────── */
  if (layout === 'list') {
    return (
      <div
        className="retro-grain"
        style={{
          background: product.bgColor,
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          boxShadow: '3px 3px 0 var(--color-text)',
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

  /* ── GRID / STACK: flip card ─────────────────────────────── */
  const sharedStyle: React.CSSProperties = {
    border: '2px solid var(--color-text)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  }

  const frontStyle: React.CSSProperties = {
    ...sharedStyle,
    background: product.bgColor,
    boxShadow: layout === 'stack' && isTop ? '3px 3px 0 var(--color-text)' : '3px 3px 0 var(--color-text)',
  }

  const backStyle: React.CSSProperties = {
    ...sharedStyle,
    transform: 'rotateY(180deg)',
    background: 'var(--color-surface)',
    justifyContent: 'flex-start',
  }

  return (
    /* perspective wrapper must NOT be position:absolute — let the parent handle that */
    <div style={{ perspective: '1200px', width: '100%', height: '100%' }}>
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
        {/* ── FRONT ─────────────────────────────────────────── */}
        <div className="retro-grain" style={frontStyle}>
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

          {/* Gram selector */}
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

          {/* ── RETOURNER button ── prominent, always visible */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleFlip}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontFamily: 'var(--font-stamp)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              background: 'var(--color-surface-offset)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 0',
              width: '100%',
              cursor: 'pointer',
              marginTop: 4,
            }}
          >
            <RotateCcw size={12} />
            Retourner — Plus d&apos;infos
          </motion.button>

          {isTop && layout === 'stack' && (
            <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'oklch(from var(--color-text-muted) l c h / 0.4)', letterSpacing: '0.08em' }}>← Glisser →</span>
            </div>
          )}
        </div>

        {/* ── BACK ──────────────────────────────────────────── */}
        <div className="retro-grain" style={backStyle}>
          {/* Back navigation row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)', gap: 'var(--space-2)' }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleFlip}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-text)', padding: '7px 12px',
                borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)',
                background: 'var(--color-surface-offset)', cursor: 'pointer',
                boxShadow: '2px 2px 0 var(--color-border)',
              }}
            >
              <ArrowLeft size={12} /> Retour
            </motion.button>
            <Link
              href={`/produits/${product.id}`}
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-text-inverse)', background: 'var(--color-primary)',
                padding: '7px 12px', borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)',
                textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              Voir la page <ExternalLink size={11} />
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

  /*
    Stack order: activeIndex = top card (stackPosition 0)
    We render from back to front (reverse) so the top card paints last.
    stackPosition 0 = top card, N-1 = deepest back card.
  */
  const getStackItems = () => {
    const result = []
    for (let i = 0; i < products.length; i++) {
      const index = (activeIndex + i) % products.length
      result.push({ ...products[index], stackPosition: i })
    }
    return result.reverse() // paint back cards first, top card last
  }

  const CARD_W = 'min(90vw, 460px)'
  const CARD_H = 620
  const PEEK = 12   // px each back card peeks below/behind
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

      {/* ── STACK MODE ─────────────────────────────────────── */}
      {layout === 'stack' && (
        <div
          style={{
            position: 'relative',
            width: CARD_W,
            /*
              Total height = card height + peek space for all back cards.
              The back-most card is shifted down by (N-1)*PEEK so we
              need that much extra room at the bottom.
            */
            height: CARD_H + (N - 1) * PEEK,
            margin: '0 auto',
            /* overflow:visible so the card can be dragged out of bounds */
            overflow: 'visible',
          }}
        >
          {getStackItems().map(product => {
            const isTop = product.stackPosition === 0
            const depth = product.stackPosition // 0 = top, N-1 = back
            const peekShift = depth * PEEK

            return (
              <motion.div
                key={product.id}
                style={{
                  position: 'absolute',
                  /*
                    Top card sits at y=0.
                    Each back card is shifted DOWN by PEEK*depth so it
                    peeks below the card above it, never hiding behind it.
                  */
                  top: peekShift,
                  left: (depth * 3),
                  right: (depth * 3),
                  height: CARD_H,
                  /*
                    KEY FIX: when dragging, this card must be above EVERYTHING.
                    Normal stacking: top card z=N, back cards decrease.
                  */
                  zIndex: draggingId === product.id ? 9999 : (isTop ? N + 1 : N - depth),
                  cursor: isTop ? 'grab' : 'default',
                  /* Slight rotation for back cards */
                  rotate: depth === 0 ? 0 : (depth % 2 === 0 ? 1.2 : -1.2),
                  overflow: 'visible',
                }}
                animate={{
                  rotate: depth === 0 ? 0 : (depth % 2 === 0 ? 1.2 : -1.2),
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragStart={() => {
                  setIsDragging(true)
                  setDraggingId(product.id)
                }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <FlipCard
                  product={product}
                  layout="stack"
                  isTop={isTop}
                  stackPosition={depth}
                  isDragging={isDragging && draggingId === product.id}
                  onOpenDetail={() => setDetailProduct(product)}
                />
              </motion.div>
            )
          })}
        </div>
      )}

      {/* ── GRID MODE ────────────────────────────────────────── */}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-5)' }}>
          {products.map((product, i) => (
            <div key={product.id} style={{ height: 580, position: 'relative' }}>
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

      {/* ── LIST MODE ────────────────────────────────────────── */}
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

      {/* Stack dot indicators */}
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

      {/* Product detail modal — zIndex 500 so it's above everything including the nav */}
      <AnimatePresence>
        {detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />}
      </AnimatePresence>
    </div>
  )
}
