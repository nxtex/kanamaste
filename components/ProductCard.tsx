"use client"

import { useState, useRef } from 'react'
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
        <Star key={s} size={size}
          fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke="#f59e0b"
          style={{ opacity: s <= Math.round(rating) ? 1 : 0.28 }} />
      ))}
    </span>
  )
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)', width: 70, flexShrink: 0, letterSpacing: '0.03em' }}>{label}</span>
      <div style={{ flex: 1, height: 6, borderRadius: 9999, background: 'var(--color-surface-offset)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
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
    relaxPct: hasRelax ? Math.min(100, Math.round((6 - intensity) * 17 + 12)) : Math.round((6 - intensity) * 10),
    energyPct: hasEnergy ? Math.min(100, Math.round(intensity * 17 + 8)) : Math.round(intensity * 9),
  }
}

// ─── SINGLE FLIP CARD ────────────────────────────────────────────────────────
function FlipCard({
  product,
  isTopCard,
  onSkip,
  onFavorite,
  onAdd,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  product: ProductData
  isTopCard: boolean
  onSkip: () => void
  onFavorite: () => void
  onAdd: () => void
  onDragStart: () => void
  onDragEnd: (e: unknown, info: PanInfo) => void
  isDragging: boolean
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

  // Card shell — houses both faces
  return (
    <div style={{ perspective: 1400, width: '100%', maxWidth: 380, margin: '0 auto' }}>
      {/* Draggable wrapper — only when not flipped */}
      <motion.div
        drag={isTopCard && !flipped ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.22}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.02 }}
        style={{ cursor: isTopCard && !flipped ? (isDragging ? 'grabbing' : 'grab') : 'default', touchAction: 'pan-y' }}
      >
        {/* Flip wrapper */}
        <div style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.52s cubic-bezier(0.23,1,0.32,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>

          {/* ── FRONT ── */}
          <div style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: 22,
            overflow: 'hidden',
            background: 'var(--color-surface)',
            border: '2.5px solid var(--color-text)',
            boxShadow: isTopCard ? '5px 7px 0 var(--color-text)' : '3px 4px 0 var(--color-text)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* image */}
            <div style={{ position: 'relative', height: 230, background: product.bgColor, flexShrink: 0, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {product.badge && (
                <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', background: product.badgeColor || 'var(--color-primary)', color: '#fff', padding: '4px 11px', borderRadius: 9999 }}>{product.badge}</span>
              )}
              {product.cbdPercent && (
                <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-stamp)', fontSize: 11, background: 'rgba(255,255,255,0.93)', color: 'var(--color-text)', padding: '4px 12px', borderRadius: 9999, border: '1.5px solid var(--color-border)' }}>{product.cbdPercent}</span>
              )}
            </div>

            {/* body */}
            <div style={{ padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)' }}>Grammage :</span>
                {product.priceOptions.map(opt => (
                  <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }}
                    style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, padding: '5px 12px', borderRadius: 7, border: selectedGrams.grams === opt.grams ? '2px solid var(--color-text)' : '2px solid var(--color-border)', background: selectedGrams.grams === opt.grams ? 'var(--color-surface-dynamic)' : 'var(--color-surface)', color: 'var(--color-text)', fontWeight: selectedGrams.grams === opt.grams ? 700 : 400, cursor: 'pointer', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', transition: 'all 110ms' }}>
                    {opt.grams}g
                  </button>
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

            {/* ── TINDER ACTIONS + INFO ── */}
            <div style={{ padding: '10px 16px 18px', display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1.5px solid var(--color-divider)' }}>
              {/* 3 tinder buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18 }}>
                {/* skip */}
                <motion.button whileTap={{ scale: 0.85 }} onClick={e => { e.stopPropagation(); onSkip() }} aria-label="Passer"
                  style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid var(--color-border)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={22} color="#ef4444" strokeWidth={2.5} />
                </motion.button>
                {/* fav */}
                <motion.button whileTap={{ scale: 0.85 }} onClick={handleFav} aria-label="Favoris"
                  style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid var(--color-border)', background: faved ? '#fff0f6' : 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms' }}>
                  <Heart size={22} fill={faved ? '#ec4899' : 'none'} color={faved ? '#ec4899' : 'var(--color-text-muted)'} strokeWidth={2} />
                </motion.button>
                {/* add */}
                <motion.button whileTap={{ scale: 0.85 }} onClick={handleAdd} aria-label="Ajouter au panier"
                  style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid var(--color-text)', background: added ? '#f59e0b' : 'var(--color-primary)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 220ms' }}>
                  {added
                    ? <ShoppingCart size={20} color="#fff" strokeWidth={2.5} />
                    : <Plus size={24} color="#fff" strokeWidth={2.5} />}
                </motion.button>
              </div>

              {/* info button — full width, at bottom */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={e => { e.stopPropagation(); setFlipped(true) }}
                aria-label="Plus d'informations"
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '11px 0',
                  borderRadius: 11,
                  border: '2px solid var(--color-border)',
                  background: 'var(--color-surface-offset)',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0 var(--color-border)',
                }}
              >
                <Info size={14} />
                Plus d’infos
              </motion.button>

              {/* swipe hint */}
              <p style={{ textAlign: 'center', fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-text-faint)', margin: 0 }}>← glisser pour explorer →</p>
            </div>
          </div>

          {/* ── BACK ── */}
          <div style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
            borderRadius: 22,
            overflow: 'hidden',
            background: 'var(--color-surface)',
            border: '2.5px solid var(--color-text)',
            boxShadow: '5px 7px 0 var(--color-text)',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 20px 22px',
          }}>
            {/* back header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={e => { e.stopPropagation(); setFlipped(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text)', background: 'var(--color-surface-offset)', border: '1.5px solid var(--color-border)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', boxShadow: '2px 2px 0 var(--color-border)' }}
              >
                <RotateCcw size={12} /> Retour
              </motion.button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Stars rating={product.rating} size={13} />
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: 'var(--color-text-muted)' }}>{product.rating.toFixed(1)}</span>
              </div>
            </div>
            {/* name */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,4vw,1.35rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>{product.name}</h3>
            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 12 }}>{product.category}</p>
            {/* description */}
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: 14 }}>{product.longDescription}</p>
            {/* bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
              <ProgressBar label="Intensité" value={intensityPct} color="var(--color-primary)" />
              <ProgressBar label="Relaxation" value={relaxPct} color="#06b6d4" />
              <ProgressBar label="Énergie" value={energyPct} color="#f472b6" />
            </div>
            {/* feelings + flavours */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 5 }}>Effets</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {product.feeling.map(f => <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 8px', borderRadius: 9999, border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>{f}</span>)}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 5 }}>Arômes</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {product.flavours.map(f => <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 8px', borderRadius: 9999, border: '1.5px solid #f59e0b', color: '#b45309' }}>{f}</span>)}
                </div>
              </div>
            </div>
            {/* gram selector */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 7 }}>Quantité</p>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {product.priceOptions.map(opt => (
                  <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }}
                    style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, padding: '7px 13px', borderRadius: 8, border: '2px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-surface)', color: selectedGrams.grams === opt.grams ? '#fff' : 'var(--color-text)', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', cursor: 'pointer' }}>
                    {opt.grams}g — {opt.price.toFixed(2)}€
                  </button>
                ))}
              </div>
            </div>
            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 2000) }}
              style={{ marginTop: 'auto', fontFamily: 'var(--font-stamp)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', padding: '14px', borderRadius: 11, border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 200ms', cursor: 'pointer' }}
            >
              <ShoppingCart size={16} />
              {added ? '✓ Ajouté !' : `Ajouter — ${selectedGrams.price.toFixed(2)}€`}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── STACK VIEW ───────────────────────────────────────────────────────────────
function StackView({ products }: { products: ProductData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [exitDir, setExitDir] = useState(0)

  const goNext = () => { setExitDir(1); setActiveIndex(p => (p + 1) % products.length) }
  const goPrev = () => { setExitDir(-1); setActiveIndex(p => (p - 1 + products.length) % products.length) }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const combined = info.offset.x + info.velocity.x * 0.2
    if (combined < -SWIPE_THRESHOLD) goNext()
    else if (combined > SWIPE_THRESHOLD) goPrev()
    setTimeout(() => setIsDragging(false), 60)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
      {/* counter + arrows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={goPrev} aria-label="Précédent" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--color-text)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--color-text-muted)', minWidth: 42, textAlign: 'center' }}>
          {activeIndex + 1} / {products.length}
        </span>
        <button onClick={goNext} aria-label="Suivant" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--color-text)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* stack container */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 380, margin: '0 auto' }}>
        {/* ghost cards behind — visible stack effect */}
        {[2, 1].map(offset => {
          const idx = (activeIndex + offset) % products.length
          return (
            <div key={`ghost-${offset}`} style={{
              position: 'absolute',
              inset: 0,
              bottom: 'auto',
              height: '100%',
              transform: `translateY(${offset * -9}px) scale(${1 - offset * 0.035})`,
              transformOrigin: 'bottom center',
              zIndex: 10 - offset,
              borderRadius: 22,
              border: '2.5px solid var(--color-text)',
              background: products[idx].bgColor,
              boxShadow: `3px 4px 0 var(--color-text)`,
              overflow: 'hidden',
              opacity: 1 - offset * 0.15,
              pointerEvents: 'none',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={products[idx].image} alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
            </div>
          )
        })}

        {/* active card with slide animation */}
        <div style={{ position: 'relative', zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: exitDir >= 0 ? 70 : -70, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: exitDir >= 0 ? -70 : 70, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <FlipCard
                product={products[activeIndex]}
                isTopCard={true}
                onSkip={goNext}
                onFavorite={() => {}}
                onAdd={() => {}}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                isDragging={isDragging}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 4 }}>
        {products.map((_, i) => (
          <button key={i} onClick={() => { setExitDir(i > activeIndex ? 1 : -1); setActiveIndex(i) }}
            aria-label={`Produit ${i + 1}`}
            style={{ width: i === activeIndex ? 20 : 7, height: 7, borderRadius: 9999, background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)', border: 'none', cursor: 'pointer', transition: 'all 220ms', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}

// ─── GRID CARD ────────────────────────────────────────────────────────────────
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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

// ─── LIST ROW ─────────────────────────────────────────────────────────────────
function ListRow({ product }: { product: ProductData }) {
  const [selectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  return (
    <div className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 14, padding: 'var(--space-4)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', width: '100%' }}>
      <div style={{ width: 80, height: 80, borderRadius: 10, border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0, background: product.bgColor }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, background: 'var(--color-surface-offset)', border: '2px solid var(--color-border)', borderRadius: 9999, padding: 4, width: 'fit-content', margin: '0 auto', boxShadow: 'var(--shadow-sm)' }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
          const Icon = layoutIcons[mode]
          const isActive = layout === mode
          return (
            <button key={mode} onClick={() => setLayout(mode)} aria-label={`Affichage ${mode}`}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 9999, background: isActive ? 'var(--color-primary)' : 'transparent', color: isActive ? '#fff' : 'var(--color-text-muted)', border: isActive ? '1.5px solid var(--color-text)' : '1.5px solid transparent', boxShadow: isActive ? '2px 2px 0 var(--color-text)' : 'none', fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 160ms' }}>
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
