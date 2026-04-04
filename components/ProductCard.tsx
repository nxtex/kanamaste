"use client"

import { useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ShoppingCart, Heart, X, Plus, RotateCcw, ChevronLeft, ChevronRight, Layers, Grid3X3, LayoutList, Star, Info } from 'lucide-react'

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
  cbdPercent?: string
}

const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList }
const SWIPE_THRESHOLD = 50

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'flex', gap: 2 }} aria-label={`${rating} étoiles`}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke="#f59e0b"
          style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }} />
      ))}
    </span>
  )
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.04em', color: 'var(--color-text-muted)', width: 72, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 6, borderRadius: 9999, background: 'var(--color-surface-offset)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          style={{ height: '100%', borderRadius: 9999, background: color }}
        />
      </div>
      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)', width: 22, textAlign: 'right', flexShrink: 0 }}>{value}</span>
    </div>
  )
}

function getBars(intensity: number, feeling: string[]) {
  const hasRelax = feeling.some(f => /relax|apais|serein|sommeil|lourd|détend/i.test(f))
  const hasEnergy = feeling.some(f => /éveill|créat|énergi|euphor|tonif/i.test(f))
  return {
    intensityPct: Math.round((intensity / 5) * 100),
    relaxPct: hasRelax ? Math.round(Math.min(100, (6 - intensity) * 17 + 12)) : Math.round((6 - intensity) * 10),
    energyPct: hasEnergy ? Math.round(Math.min(100, intensity * 17 + 8)) : Math.round(intensity * 9),
  }
}

// ─── FLIP CARD ─────────────────────────────────────────────────────────────────
function FlipCard({
  product,
  isFront,
  onSwipeLeft,
  onSwipeRight,
  onFavorite,
  onAdd,
  isDragging,
  setIsDragging,
  handleDragEnd,
  isTopCard,
}: {
  product: ProductData
  isFront: boolean
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onFavorite: () => void
  onAdd: () => void
  isDragging: boolean
  setIsDragging: (v: boolean) => void
  handleDragEnd: (e: unknown, info: PanInfo) => void
  isTopCard: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const [faved, setFaved] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getBars(product.intensity, product.feeling)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    onAdd()
    setTimeout(() => setAdded(false), 1500)
  }
  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFaved(f => !f)
    onFavorite()
  }

  return (
    <div style={{ perspective: 1200, width: '100%', maxWidth: 380, margin: '0 auto' }}>
      <motion.div
        drag={isTopCard && !flipped ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ cursor: isTopCard && !flipped ? (isDragging ? 'grabbing' : 'grab') : 'default', touchAction: 'pan-y', position: 'relative', transformStyle: 'preserve-3d', transition: 'transform 0.55s cubic-bezier(0.23,1,0.32,1)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* ── FRONT ── */}
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 22, overflow: 'hidden', background: 'var(--color-surface)', border: '2.5px solid var(--color-text)', boxShadow: isTopCard ? '5px 7px 0 var(--color-text)' : '3px 4px 0 var(--color-text)', display: 'flex', flexDirection: 'column' }}>

          {/* image zone */}
          <div style={{ position: 'relative', height: 240, background: product.bgColor, flexShrink: 0, overflow: 'hidden' }}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={380}
              height={240}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* badge */}
            {product.badge && (
              <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', background: product.badgeColor || 'var(--color-primary)', color: '#fff', padding: '4px 11px', borderRadius: 9999 }}>{product.badge}</span>
            )}
            {/* cbd% */}
            {product.cbdPercent && (
              <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-stamp)', fontSize: 11, background: 'rgba(255,255,255,0.92)', color: 'var(--color-text)', padding: '4px 12px', borderRadius: 9999, border: '1.5px solid var(--color-border)' }}>{product.cbdPercent}</span>
            )}
            {/* info btn */}
            <button
              onClick={e => { e.stopPropagation(); setFlipped(true) }}
              aria-label="Voir les infos"
              style={{ position: 'absolute', bottom: 12, right: 12, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: '1.5px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}
            >
              <Info size={15} color="var(--color-text)" />
            </button>
          </div>

          {/* info zone */}
          <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>{product.category}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,4vw,1.35rem)', fontWeight: 700, lineHeight: 1.15, color: 'var(--color-text)', margin: 0 }}>{product.name}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <ProgressBar label="Intensité" value={intensityPct} color="var(--color-primary)" />
              <ProgressBar label="Relaxation" value={relaxPct} color="#06b6d4" />
              <ProgressBar label="Énergie" value={energyPct} color="#f472b6" />
            </div>

            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {product.flavours.slice(0, 3).map(f => (
                <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 9px', borderRadius: 9999, border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)', background: 'var(--color-surface-offset)' }}>{f}</span>
              ))}
            </div>

            {/* grammage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>Grammage :</span>
              {product.priceOptions.map(opt => (
                <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, padding: '5px 12px', borderRadius: 7, border: selectedGrams.grams === opt.grams ? '2px solid var(--color-text)' : '2px solid var(--color-border)', background: selectedGrams.grams === opt.grams ? 'var(--color-surface-dynamic)' : 'var(--color-surface)', color: 'var(--color-text)', fontWeight: selectedGrams.grams === opt.grams ? 700 : 400, cursor: 'pointer', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', transition: 'all 110ms' }}>{opt.grams}g</button>
              ))}
            </div>

            {/* price + stars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,5vw,1.9rem)', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>{selectedGrams.price.toFixed(0)}€</span>
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: 'var(--color-text-muted)' }}>pour {selectedGrams.grams}g</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Stars rating={product.rating} size={12} />
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)' }}>{product.rating.toFixed(1)} ({product.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* ── TINDER ACTION BUTTONS ── */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, padding: '8px 16px 20px', borderTop: '1.5px solid var(--color-divider)' }}>
            {/* SKIP */}
            <motion.button whileTap={{ scale: 0.88 }} onClick={e => { e.stopPropagation(); onSwipeLeft() }} aria-label="Passer" style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid var(--color-border)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={22} color="#ef4444" strokeWidth={2.5} />
            </motion.button>
            {/* FAVORITE */}
            <motion.button whileTap={{ scale: 0.88 }} onClick={handleFav} aria-label="Favoris" style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid var(--color-border)', background: faved ? '#fff0f6' : 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms' }}>
              <Heart size={22} fill={faved ? '#ec4899' : 'none'} color={faved ? '#ec4899' : 'var(--color-text-muted)'} strokeWidth={2} />
            </motion.button>
            {/* ADD TO CART */}
            <motion.button whileTap={{ scale: 0.88 }} onClick={handleAdd} aria-label="Ajouter au panier" style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid var(--color-text)', background: added ? '#f59e0b' : 'var(--color-primary)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 220ms' }}>
              {added ? <ShoppingCart size={20} color="#fff" strokeWidth={2.5} /> : <Plus size={24} color="#fff" strokeWidth={2.5} />}
            </motion.button>
          </div>

          {/* swipe hint */}
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-text-faint)', paddingBottom: 12, marginTop: -6 }}>← glisser pour explorer →</p>
        </div>

        {/* ── BACK ── */}
        <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', background: 'var(--color-surface)', border: '2.5px solid var(--color-text)', boxShadow: '5px 7px 0 var(--color-text)', display: 'flex', flexDirection: 'column', padding: '20px 20px 24px' }}>
          {/* back header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <button onClick={e => { e.stopPropagation(); setFlipped(false) }} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text)', background: 'var(--color-surface-offset)', border: '1.5px solid var(--color-border)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', boxShadow: '2px 2px 0 var(--color-border)' }}>
              <RotateCcw size={12} /> Retour
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Stars rating={product.rating} size={13} />
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: 'var(--color-text-muted)' }}>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* name */}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,4vw,1.4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>{product.name}</h3>
          <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 12 }}>{product.category}</p>

          {/* description */}
          <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{product.longDescription}</p>

          {/* bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
            <ProgressBar label="Intensité" value={intensityPct} color="var(--color-primary)" />
            <ProgressBar label="Relaxation" value={relaxPct} color="#06b6d4" />
            <ProgressBar label="Énergie" value={energyPct} color="#f472b6" />
          </div>

          {/* feelings + flavours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Effets</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {product.feeling.map(f => <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 8px', borderRadius: 9999, border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>{f}</span>)}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Arômes</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {product.flavours.map(f => <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 8px', borderRadius: 9999, border: '1.5px solid #f59e0b', color: '#b45309' }}>{f}</span>)}
              </div>
            </div>
          </div>

          {/* gram selector */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 8 }}>Quantité</p>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {product.priceOptions.map(opt => (
                <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, padding: '7px 14px', borderRadius: 8, border: '2px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-surface)', color: selectedGrams.grams === opt.grams ? '#fff' : 'var(--color-text)', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', cursor: 'pointer', letterSpacing: '0.04em' }}>{opt.grams}g — {opt.price.toFixed(2)}€</button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button whileTap={{ scale: 0.97 }} onClick={e => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 2000) }} style={{ marginTop: 'auto', fontFamily: 'var(--font-stamp)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', padding: '14px', borderRadius: 11, border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 200ms', cursor: 'pointer' }}>
            <ShoppingCart size={16} />
            {added ? '✓ Ajouté !' : `Ajouter — ${selectedGrams.price.toFixed(2)}€`}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── STACK VIEW ────────────────────────────────────────────────────────────────
function StackView({ products }: { products: ProductData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState(0)

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const combined = offset.x + velocity.x * 0.2
    if (combined < -SWIPE_THRESHOLD) {
      setDirection(1)
      setActiveIndex(p => (p + 1) % products.length)
    } else if (combined > SWIPE_THRESHOLD) {
      setDirection(-1)
      setActiveIndex(p => (p - 1 + products.length) % products.length)
    }
    setTimeout(() => setIsDragging(false), 50)
  }

  // Show up to 3 cards in stack (cards behind)
  const stackCards = [0, 1, 2].map(offset => ({
    product: products[(activeIndex + offset) % products.length],
    offset,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
      {/* counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setActiveIndex(p => (p - 1 + products.length) % products.length)} aria-label="Précédent" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--color-text)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--color-text-muted)', minWidth: 40, textAlign: 'center' }}>{activeIndex + 1} / {products.length}</span>
        <button onClick={() => setActiveIndex(p => (p + 1) % products.length)} aria-label="Suivant" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--color-text)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* stack */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 380, height: 640, margin: '0 auto' }}>
        {/* ghost cards behind */}
        {[2, 1].map(stackOffset => {
          const idx = (activeIndex + stackOffset) % products.length
          return (
            <div
              key={`behind-${stackOffset}-${idx}`}
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${stackOffset * -10}px) scale(${1 - stackOffset * 0.04})`,
                transformOrigin: 'bottom center',
                zIndex: 10 - stackOffset,
                borderRadius: 22,
                overflow: 'hidden',
                background: products[idx].bgColor,
                border: '2.5px solid var(--color-text)',
                boxShadow: `${stackOffset + 2}px ${stackOffset + 3}px 0 var(--color-text)`,
                opacity: 1 - stackOffset * 0.12,
              }}
            >
              <img
                src={products[idx].image}
                alt=""
                aria-hidden
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
              />
            </div>
          )
        })}

        {/* active top card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ position: 'absolute', inset: 0, zIndex: 20 }}
          >
            <FlipCard
              product={products[activeIndex]}
              isFront={true}
              onSwipeLeft={() => { setDirection(1); setActiveIndex(p => (p + 1) % products.length) }}
              onSwipeRight={() => { setDirection(-1); setActiveIndex(p => (p - 1 + products.length) % products.length) }}
              onFavorite={() => {}}
              onAdd={() => {}}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              handleDragEnd={handleDragEnd}
              isTopCard={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {products.map((_, i) => (
          <button key={i} onClick={() => setActiveIndex(i)} aria-label={`Produit ${i + 1}`} style={{ width: i === activeIndex ? 20 : 7, height: 7, borderRadius: 9999, background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)', border: 'none', cursor: 'pointer', transition: 'all 220ms', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}

// ─── GRID CARD ─────────────────────────────────────────────────────────────────
function GridCard({ product }: { product: ProductData }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const [faved, setFaved] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getBars(product.intensity, product.feeling)

  return (
    <div className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 16, overflow: 'hidden', boxShadow: '4px 4px 0 var(--color-text)', display: 'flex', flexDirection: 'column', transition: 'transform 180ms, box-shadow 180ms' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 var(--color-text)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 var(--color-text)' }}
    >
      <div style={{ position: 'relative', background: product.bgColor, height: 190, overflow: 'hidden', flexShrink: 0 }}>
        <img src={product.image} alt={product.name} loading="lazy" width={300} height={190} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {product.badge && <span style={{ position: 'absolute', top: 10, left: 10, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', background: product.badgeColor || 'var(--color-primary)', color: '#fff', padding: '3px 9px', borderRadius: 9999 }}>{product.badge}</span>}
        <button onClick={() => setFaved(f => !f)} style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={14} fill={faved ? '#ec4899' : 'none'} color={faved ? '#ec4899' : '#6b7280'} strokeWidth={2} />
        </button>
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>{product.category}</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <ProgressBar label="Intensité" value={intensityPct} color="var(--color-primary)" />
          <ProgressBar label="Relaxation" value={relaxPct} color="#06b6d4" />
          <ProgressBar label="Énergie" value={energyPct} color="#f472b6" />
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.flavours.slice(0,3).map(f => <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '2px 7px', borderRadius: 9999, border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)' }}>{f}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.priceOptions.map(opt => <button key={opt.grams} onClick={() => setSelectedGrams(opt)} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '4px 8px', borderRadius: 6, border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? '#fff' : 'var(--color-text)', cursor: 'pointer' }}>{opt.grams}g</button>)}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--color-divider)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', padding: '7px 12px', borderRadius: 7, border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 200ms', cursor: 'pointer' }}>
            <ShoppingCart size={11} />{added ? '✓ OK' : 'Panier'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ─── LIST ROW ──────────────────────────────────────────────────────────────────
function ListRow({ product }: { product: ProductData }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  return (
    <div className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 14, padding: 'var(--space-4)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
      <div style={{ width: 80, height: 80, borderRadius: 10, border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0, background: product.bgColor }}>
        <img src={product.image} alt={product.name} loading="lazy" width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
        <Stars rating={product.rating} size={11} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', padding: '6px 12px', borderRadius: 7, border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 200ms', cursor: 'pointer' }}>
            <ShoppingCart size={11} />{added ? '✓ OK' : 'Panier'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────────
export function MorphingProductStack({
  products,
  defaultLayout = 'stack',
}: {
  products: ProductData[]
  defaultLayout?: LayoutMode
}) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* layout toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, background: 'var(--color-surface-offset)', border: '2px solid var(--color-border)', borderRadius: 9999, padding: 4, width: 'fit-content', margin: '0 auto', boxShadow: 'var(--shadow-sm)' }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
          const Icon = layoutIcons[mode]
          const isActive = layout === mode
          return (
            <button key={mode} onClick={() => setLayout(mode)} aria-label={`Affichage ${mode}`} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 9999, background: isActive ? 'var(--color-primary)' : 'transparent', color: isActive ? '#fff' : 'var(--color-text-muted)', border: isActive ? '1.5px solid var(--color-text)' : '1.5px solid transparent', boxShadow: isActive ? '2px 2px 0 var(--color-text)' : 'none', fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 160ms' }}>
              <Icon size={13} />
              <span>{mode === 'stack' ? 'Pile' : mode === 'grid' ? 'Grille' : 'Liste'}</span>
            </button>
          )
        })}
      </div>

      {layout === 'stack' && <StackView products={products} />}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--space-5)' }}>
          {products.map(p => <GridCard key={p.id} product={p} />)}
        </div>
      )}
      {layout === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {products.map(p => <ListRow key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
