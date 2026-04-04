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

const SWIPE_THRESHOLD = 40
const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList }

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'flex', gap: 2, color: 'var(--color-gold)' }} aria-label={`${rating} \u00e9toiles`}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? 'currentColor' : 'none'} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }} />
      ))}
    </span>
  )
}

function IntensityBar({ level }: { level: number }) {
  const labels = ['Tr\u00e8s l\u00e9ger','L\u00e9ger','Moyen','Fort','Intense']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ width: 20, height: 5, borderRadius: 2, background: i <= level ? 'var(--color-primary)' : 'var(--color-border)', border: '1px solid var(--color-text)' }} />
        ))}
      </div>
      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>{labels[level - 1]}</span>
    </div>
  )
}

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
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'oklch(from var(--color-text) l c h / 0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="retro-grain"
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-xl)',
          width: '100%', maxWidth: 560,
          maxHeight: '88dvh',
          overflowY: 'auto',
          padding: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
          boxShadow: '6px 6px 0 var(--color-text)',
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
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Intensit\u00e9</span>
            <IntensityBar level={product.intensity} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Effets</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{product.feeling.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>{f}</span>)}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', gridColumn: '1 / -1' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Ar\u00f4mes</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{product.flavours.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Quantit\u00e9</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {product.priceOptions.map(opt => (
              <button key={opt.grams} onClick={() => setSelectedGrams(opt)} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-surface)', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', cursor: 'pointer' }}>
                {opt.grams}g \u2014 {opt.price.toFixed(2)}\u20ac
              </button>
            ))}
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.96 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-base)', letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', transition: 'background 200ms' }}>
          <ShoppingCart size={18} />
          {added ? '\u2713 Ajout\u00e9 au panier\u00a0!' : `Ajouter \u2014 ${selectedGrams.price.toFixed(2)}\u20ac`}
        </motion.button>
        <button onClick={onClose} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: 3, paddingBottom: 'var(--space-4)' }}>Fermer</button>
      </motion.div>
    </motion.div>
  )
}

/* \u2500\u2500\u2500 FLIP CARD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
function FlipCard({
  product, layout, isTop, isDragging, onOpenDetail
}: {
  product: ProductData
  layout: LayoutMode
  isTop: boolean
  isDragging: boolean
  onOpenDetail: () => void
}) {
  const [flipped, setFlipped] = useState(false)
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 1600) }
  const handleFlip = (e: React.MouseEvent) => { e.stopPropagation(); if (!isDragging) setFlipped(f => !f) }

  if (layout === 'list') {
    return (
      <div className="retro-grain" style={{ background: product.bgColor, border: '2px solid var(--color-text)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
        <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0 }}>
          <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
          <Stars rating={product.rating} size={12} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}\u20ac</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShoppingCart size={12} />{added ? '\u2713 OK' : 'Panier'}
            </motion.button>
            <button onClick={onOpenDetail} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: 3 }}>D\u00e9tails</button>
          </div>
        </div>
      </div>
    )
  }

  // \u2500\u2500 Shared face styles \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  // KEY FIX: both faces need explicit rotateY + backfaceVisibility: hidden.
  // Without transform: 'rotateY(0deg)' on the FRONT, some browsers show the
  // mirrored (reversed) front face when the card is flipped back.
  const faceBase: React.CSSProperties = {
    border: '2px solid var(--color-text)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-3)',
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    // The two lines that fix the mirror bug:
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
    display: 'flex', flexDirection: 'column', gap: 6,
  }

  const frontStyle: React.CSSProperties = {
    ...faceBase,
    // Explicit 0deg so the browser\'s compositing layer is correctly
    // initialised and backface culling works from the first render.
    transform: 'rotateY(0deg)',
    background: product.bgColor,
    boxShadow: isTop ? '3px 3px 0 var(--color-text)' : 'none',
  }

  const backStyle: React.CSSProperties = {
    ...faceBase,
    transform: 'rotateY(180deg)',
    background: 'var(--color-surface)',
  }

  return (
    <div style={{ perspective: '1200px', width: '100%', height: '100%', position: 'relative' }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* \u2500\u2500\u2500 FRONT \u2500\u2500\u2500 */}
        <div className="retro-grain" style={frontStyle}>
          <div style={{ width: '100%', aspectRatio: '5/3', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0 }}>
            <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, flexShrink: 0 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 1 }}>{product.category}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
            </div>
            {product.badge && <span className="badge" style={{ background: product.badgeColor || 'var(--color-primary)', color: 'var(--color-text-inverse)', borderColor: 'transparent', fontFamily: 'var(--font-stamp)', fontSize: 8, padding: '2px 7px', flexShrink: 0 }}>{product.badge}</span>}
          </div>
          <Stars rating={product.rating} size={11} />
          <p style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexShrink: 0, margin: 0 }}>{product.description}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Intensit\u00e9</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => (<div key={i} style={{ width: 18, height: 4, borderRadius: 2, background: i <= product.intensity ? 'var(--color-primary)' : 'var(--color-border)', border: '1px solid var(--color-text)' }} />))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', flexShrink: 0 }}>
            {product.flavours.slice(0,3).map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, padding: '2px 6px', color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', flexShrink: 0 }}>
            {product.priceOptions.map(opt => (
              <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 120ms' }}>
                {opt.grams}g
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)', marginTop: 'auto', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}\u20ac</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', transition: 'background 200ms' }}>
              <ShoppingCart size={12} />{added ? '\u2713 OK' : 'Panier'}
            </motion.button>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleFlip} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text)', background: 'var(--color-surface-offset)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '6px 0', width: '100%', cursor: 'pointer', flexShrink: 0 }}>
            <RotateCcw size={11} /> Plus d&apos;infos
          </motion.button>
        </div>

        {/* \u2500\u2500\u2500 BACK \u2500\u2500\u2500 */}
        <div className="retro-grain" style={backStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, flexShrink: 0 }}>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleFlip} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', background: 'var(--color-surface-offset)', cursor: 'pointer', boxShadow: '2px 2px 0 var(--color-border)', flexShrink: 0 }}>
              <ArrowLeft size={11} /> Retour
            </motion.button>
            <Link href={`/produits/${product.id}`} onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-inverse)', background: 'var(--color-primary)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Page <ExternalLink size={10} />
            </Link>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.15, flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            <Stars rating={product.rating} size={11} />
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--color-text-muted)' }}>{product.reviewCount} avis</span>
          </div>
          <p style={{ fontSize: 10, color: 'var(--color-text-muted)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexShrink: 0, margin: 0 }}>{product.longDescription}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', flexShrink: 0 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Intensit\u00e9</span>
              <IntensityBar level={product.intensity} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Effets</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 3 }}>{product.feeling.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, padding: '2px 5px', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>{f}</span>)}</div>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Ar\u00f4mes</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 3 }}>{product.flavours.map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, padding: '2px 5px', color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}</div>
            </div>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {product.priceOptions.map(opt => (
                <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, padding: '3px 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{opt.grams}g</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}\u20ac</span>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap', transition: 'background 200ms' }}>
                <ShoppingCart size={12} />{added ? '\u2713 OK' : 'Panier'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* \u2500\u2500\u2500 MORPHING PRODUCT STACK \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
    const vx = velocity.x
    const ox = offset.x
    const combined = ox + vx * 0.18
    if (combined < -SWIPE_THRESHOLD)
      setActiveIndex(p => (p + 1) % products.length)
    else if (combined > SWIPE_THRESHOLD)
      setActiveIndex(p => (p - 1 + products.length) % products.length)
    setTimeout(() => { setIsDragging(false); setDraggingId(null) }, 50)
  }

  const getStackItems = () => {
    const result = []
    for (let depth = products.length - 1; depth >= 0; depth--) {
      const productIndex = (activeIndex + depth) % products.length
      result.push({ ...products[productIndex], stackPosition: depth })
    }
    return result
  }

  const CARD_H = 560
  const PEEK_X = 6
  const PEEK_Y = 14
  const N = products.length
  const containerH = CARD_H + (N - 1) * PEEK_Y

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

      {/* Layout toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-1)', background: 'var(--color-surface-offset)', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: 'var(--space-1)', width: 'fit-content', margin: '0 auto', boxShadow: 'var(--shadow-sm)' }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
          const Icon = layoutIcons[mode]
          const isActive = layout === mode
          return (
            <button key={mode} onClick={() => setLayout(mode)} aria-label={`Affichage ${mode}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: '8px 18px', borderRadius: 'var(--radius-full)', background: isActive ? 'var(--color-primary)' : 'transparent', color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)', border: isActive ? '1.5px solid var(--color-text)' : '1.5px solid transparent', boxShadow: isActive ? '2px 2px 0 var(--color-text)' : 'none', fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all var(--transition)' }}>
              <Icon size={14} />
              <span>{mode === 'stack' ? 'Pile' : mode === 'grid' ? 'Grille' : 'Liste'}</span>
            </button>
          )
        })}
      </div>

      {/* STACK MODE */}
      {layout === 'stack' && (
        <div
          style={{
            position: 'relative',
            width: 'min(92vw, 440px)',
            height: containerH,
            margin: '0 auto',
            overflow: 'visible',
            touchAction: 'pan-y',
          }}
        >
          {getStackItems().map(product => {
            const depth = product.stackPosition
            const isTopCard = depth === 0
            const isDraggingThis = draggingId === product.id

            return (
              <motion.div
                key={product.id}
                style={{
                  position: 'absolute',
                  top: depth * PEEK_Y,
                  left: depth * PEEK_X,
                  right: depth * PEEK_X,
                  height: CARD_H,
                  zIndex: isDraggingThis ? 9999 : isTopCard ? N + 10 : N - depth,
                  overflow: 'visible',
                  willChange: isTopCard ? 'transform' : 'auto',
                }}
                animate={{ rotate: isTopCard ? 0 : depth % 2 === 0 ? 1.2 : -1.2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                drag={isTopCard ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                dragTransition={{ bounceStiffness: 280, bounceDamping: 28, power: 0.3, timeConstant: 220 }}
                onDragStart={() => { setIsDragging(true); setDraggingId(product.id) }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.02, rotate: 0, cursor: 'grabbing' }}
              >
                <FlipCard
                  product={product}
                  layout="stack"
                  isTop={isTopCard}
                  isDragging={isDragging && isDraggingThis}
                  onOpenDetail={() => setDetailProduct(product)}
                />
              </motion.div>
            )
          })}
        </div>
      )}

      {/* GRID MODE */}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 'var(--space-5)' }}>
          {products.map((product) => (
            <div key={product.id} style={{ height: 560, position: 'relative' }}>
              <FlipCard product={product} layout="grid" isTop={false} isDragging={false} onOpenDetail={() => setDetailProduct(product)} />
            </div>
          ))}
        </div>
      )}

      {/* LIST MODE */}
      {layout === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {products.map((product) => (
            <FlipCard key={product.id} product={product} layout="list" isTop={false} isDragging={false} onOpenDetail={() => setDetailProduct(product)} />
          ))}
        </div>
      )}

      {layout === 'stack' && products.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 'var(--space-2)' }}>
          {products.map((_, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} aria-label={`Produit ${i + 1}`} style={{ height: 6, width: i === activeIndex ? 18 : 6, borderRadius: 9999, background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)', border: '1.5px solid var(--color-text)', cursor: 'pointer', transition: 'all 200ms' }} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />}
      </AnimatePresence>
    </div>
  )
}
