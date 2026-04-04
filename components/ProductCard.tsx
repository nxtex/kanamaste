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

const SWIPE_THRESHOLD = 48
const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList }

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'flex', gap: 2 }} aria-label={`${rating} étoiles`}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? '#F59E0B' : 'none'} stroke="#F59E0B" style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }} />
      ))}
    </span>
  )
}

function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-faint)', width: 68, flexShrink: 0, letterSpacing: '0.03em' }}>{label}</span>
      <div style={{ flex: 1, height: 4, borderRadius: 9999, background: 'rgba(124,79,212,0.1)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1], delay: 0.05 }}
          style={{ height: '100%', borderRadius: 9999, background: color }}
        />
      </div>
    </div>
  )
}

function getMetrics(intensity: number, feeling: string[]) {
  const hasRelax  = feeling.some(f => /relax|apais|serein|sommeil|lourd|détend/i.test(f))
  const hasEnergy = feeling.some(f => /éveill|créat|énergi|euphor|tonif/i.test(f))
  return {
    intensityPct: Math.round((intensity / 5) * 100),
    relaxPct:  hasRelax  ? Math.min(100, Math.round((6 - intensity) * 17 + 12)) : Math.round((6 - intensity) * 10),
    energyPct: hasEnergy ? Math.min(100, Math.round(intensity * 17 + 8)) : Math.round(intensity * 9),
  }
}

// ─── FLIP CARD ──────────────────────────────────────────────────────────────
function FlipCard({
  product, isTopCard, onSkip, onAdd, onDragStart, onDragEnd, isDragging,
}: {
  product: ProductData; isTopCard: boolean
  onSkip: () => void; onAdd: () => void
  onDragStart: () => void; onDragEnd: (e: unknown, info: PanInfo) => void
  isDragging: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const [faved, setFaved] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getMetrics(product.intensity, product.feeling)

  const handleAdd = (e: React.MouseEvent) => { e.stopPropagation(); setAdded(true); onAdd(); setTimeout(() => setAdded(false), 1600) }

  return (
    <div style={{ perspective: 1400, width: '100%', maxWidth: 390, margin: '0 auto' }}>
      <motion.div
        drag={isTopCard && !flipped ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.015 }}
        style={{ cursor: isTopCard && !flipped ? (isDragging ? 'grabbing' : 'grab') : 'default', touchAction: 'pan-y' }}
      >
        {/* Flip shell */}
        <div style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>

          {/* ── FRONT ── */}
          <div style={{
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            borderRadius: 24, overflow: 'hidden',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: isTopCard ? 'var(--shadow-lg)' : 'var(--shadow-md)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Image */}
            <div style={{ position: 'relative', height: 220, background: product.bgColor, flexShrink: 0, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {/* overlay gradient bas */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(30,16,48,0.25), transparent)' }} />
              {product.badge && (
                <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', background: product.badgeColor || 'var(--color-primary)', color: '#fff', padding: '4px 12px', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(8px)' }}>{product.badge}</span>
              )}
              {product.cbdPercent && (
                <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 10, background: 'rgba(252,250,248,0.88)', backdropFilter: 'blur(8px)', color: 'var(--color-text)', padding: '4px 11px', borderRadius: 'var(--radius-full)' }}>{product.cbdPercent}</span>
              )}
              {/* Fav */}
              <button onClick={e => { e.stopPropagation(); setFaved(f => !f) }}
                aria-label="Favoris"
                style={{ position: 'absolute', bottom: 10, right: 12, width: 32, height: 32, borderRadius: '50%', background: 'rgba(252,250,248,0.85)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Heart size={15} fill={faved ? '#E8547A' : 'none'} color={faved ? '#E8547A' : 'rgba(30,16,48,0.5)'} strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 18px 12px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7, marginBottom: 3 }}>{product.category}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,4vw,1.3rem)', fontWeight: 400, lineHeight: 1.15, color: 'var(--color-text)' }}>{product.name}</h3>
              </div>

              {/* Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <MiniBar label="Intensité"  value={intensityPct} color="var(--color-primary)" />
                <MiniBar label="Relaxation" value={relaxPct}     color="#2CC5A0" />
                <MiniBar label="Énergie"    value={energyPct}    color="#E8547A" />
              </div>

              {/* Tags arômes */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {product.flavours.slice(0,3).map(f => (
                  <span key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 9px', borderRadius: 'var(--radius-full)', background: 'rgba(124,79,212,0.07)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>{f}</span>
                ))}
              </div>

              {/* Grammage */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {product.priceOptions.map(opt => (
                  <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '5px 12px', borderRadius: 'var(--radius-full)', border: `1.5px solid ${selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-border)'}`, background: selectedGrams.grams === opt.grams ? 'var(--color-primary-muted)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: selectedGrams.grams === opt.grams ? 600 : 400, cursor: 'pointer', transition: 'all 130ms' }}>
                    {opt.grams}g
                  </button>
                ))}
              </div>

              {/* Prix + stars */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,5vw,1.85rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)', lineHeight: 1 }}>{selectedGrams.price.toFixed(0)}€</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-faint)' }}>pour {selectedGrams.grams}g</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Stars rating={product.rating} size={11} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-faint)' }}>{product.rating} ({product.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* 3 action buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
                {/* Skip */}
                <motion.button whileTap={{ scale: 0.88 }} onClick={e => { e.stopPropagation(); onSkip() }} aria-label="Passer"
                  style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-bg)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={20} color="#E8547A" strokeWidth={2} />
                </motion.button>
                {/* Fav */}
                <motion.button whileTap={{ scale: 0.88 }} onClick={e => { e.stopPropagation(); setFaved(f => !f) }} aria-label="Favoris"
                  style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid var(--color-border)', background: faved ? '#FDEDF2' : 'var(--color-bg)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms' }}>
                  <Heart size={20} fill={faved ? '#E8547A' : 'none'} color={faved ? '#E8547A' : 'var(--color-text-muted)'} strokeWidth={2} />
                </motion.button>
                {/* Add */}
                <motion.button whileTap={{ scale: 0.88 }} onClick={handleAdd} aria-label="Ajouter au panier"
                  style={{ width: 50, height: 50, borderRadius: '50%', border: 'none', background: added ? '#F59E0B' : 'var(--color-primary)', boxShadow: '0 4px 16px rgba(124,79,212,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms' }}>
                  {added ? <ShoppingCart size={19} color="#fff" /> : <Plus size={22} color="#fff" strokeWidth={2} />}
                </motion.button>
              </div>

              {/* Info button — full width bottom */}
              <motion.button whileTap={{ scale: 0.98 }}
                onClick={e => { e.stopPropagation(); setFlipped(true) }}
                style={{ width: '100%', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13, color: 'var(--color-text-muted)', background: 'rgba(124,79,212,0.05)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', transition: 'background 160ms, color 160ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-muted)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(124,79,212,0.05)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)' }}
              >
                <Info size={13} />
                Plus d&apos;infos
              </motion.button>

              <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--color-text-faint)', margin: 0 }}>← glisser pour explorer →</p>
            </div>
          </div>

          {/* ── BACK ── */}
          <div style={{
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute', inset: 0,
            borderRadius: 24, overflow: 'hidden',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex', flexDirection: 'column',
            padding: '20px 20px 22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <button onClick={e => { e.stopPropagation(); setFlipped(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, color: 'var(--color-text-muted)', background: 'var(--color-surface-offset)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '7px 14px', cursor: 'pointer' }}>
                <RotateCcw size={11} /> Retour
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Stars rating={product.rating} size={12} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-muted)' }}>{product.rating}</span>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem,4vw,1.3rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: 3 }}>{product.name}</h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7, marginBottom: 12 }}>{product.category}</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.65, fontWeight: 300, marginBottom: 14 }}>{product.longDescription}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
              <MiniBar label="Intensité"  value={intensityPct} color="var(--color-primary)" />
              <MiniBar label="Relaxation" value={relaxPct}     color="#2CC5A0" />
              <MiniBar label="Énergie"    value={energyPct}    color="#E8547A" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 6 }}>Effets</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {product.feeling.map(f => <span key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 9px', borderRadius: 'var(--radius-full)', background: 'rgba(124,79,212,0.08)', color: 'var(--color-primary)' }}>{f}</span>)}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 6 }}>Arômes</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {product.flavours.map(f => <span key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 9px', borderRadius: 'var(--radius-full)', background: 'rgba(212,165,51,0.1)', color: '#7A5200' }}>{f}</span>)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 7 }}>Quantité</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {product.priceOptions.map(opt => (
                  <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '7px 14px', borderRadius: 'var(--radius-full)', border: `1.5px solid ${selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-border)'}`, background: selectedGrams.grams === opt.grams ? 'var(--color-primary-muted)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 130ms' }}>
                    {opt.grams}g — {opt.price.toFixed(2)}€
                  </button>
                ))}
              </div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }}
              onClick={e => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 2000) }}
              style={{ marginTop: 'auto', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, background: added ? '#F59E0B' : 'var(--color-primary)', color: '#fff', padding: '14px', borderRadius: 'var(--radius-full)', border: 'none', boxShadow: added ? '0 4px 16px rgba(245,158,11,0.4)' : '0 4px 18px rgba(124,79,212,0.35)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 200ms', cursor: 'pointer' }}
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

// ─── STACK VIEW ─────────────────────────────────────────────────────────────
function StackView({ products }: { products: ProductData[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging,  setIsDragging]  = useState(false)
  const [exitDir,     setExitDir]     = useState(0)

  const goNext = () => { setExitDir(1);  setActiveIndex(p => (p + 1) % products.length) }
  const goPrev = () => { setExitDir(-1); setActiveIndex(p => (p - 1 + products.length) % products.length) }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const combined = info.offset.x + info.velocity.x * 0.2
    if (combined < -SWIPE_THRESHOLD) goNext()
    else if (combined > SWIPE_THRESHOLD) goPrev()
    setTimeout(() => setIsDragging(false), 60)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
      {/* Counter + arrows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={goPrev} aria-label="Précédent" style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <ChevronLeft size={15} />
        </button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--color-text-faint)', minWidth: 40, textAlign: 'center' }}>
          {activeIndex + 1} / {products.length}
        </span>
        <button onClick={goNext} aria-label="Suivant" style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-surface)', boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Stack container */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 390, margin: '0 auto' }}>
        {/* Ghost cards */}
        {[2,1].map(offset => {
          const idx = (activeIndex + offset) % products.length
          return (
            <div key={`ghost-${offset}`} style={{
              position: 'absolute', inset: 0, bottom: 'auto', height: '100%',
              transform: `translateY(${offset * -10}px) scale(${1 - offset * 0.03})`,
              transformOrigin: 'bottom center',
              zIndex: 10 - offset,
              borderRadius: 24,
              border: '1px solid var(--color-border)',
              background: products[idx].bgColor,
              overflow: 'hidden',
              opacity: 1 - offset * 0.2,
              pointerEvents: 'none',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={products[idx].image} alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            </div>
          )
        })}

        {/* Active card */}
        <div style={{ position: 'relative', zIndex: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: exitDir >= 0 ? 60 : -60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: exitDir >= 0 ? -60 : 60, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <FlipCard
                product={products[activeIndex]}
                isTopCard={true}
                onSkip={goNext}
                onAdd={() => {}}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                isDragging={isDragging}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {products.map((_, i) => (
          <button key={i} onClick={() => { setExitDir(i > activeIndex ? 1 : -1); setActiveIndex(i) }}
            aria-label={`Produit ${i + 1}`}
            style={{ width: i === activeIndex ? 22 : 6, height: 6, borderRadius: 9999, background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)', border: 'none', cursor: 'pointer', transition: 'all 240ms', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}

// ─── GRID CARD ───────────────────────────────────────────────────────────────
function GridCard({ product }: { product: ProductData }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const [faved, setFaved] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getMetrics(product.intensity, product.feeling)
  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', transition: 'transform 200ms, box-shadow 200ms' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)' }}
    >
      <div style={{ position: 'relative', background: product.bgColor, height: 185, overflow: 'hidden', flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, background: 'linear-gradient(to top, rgba(30,16,48,0.2), transparent)' }} />
        {product.badge && <span style={{ position: 'absolute', top: 10, left: 10, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', background: product.badgeColor || 'var(--color-primary)', color: '#fff', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>{product.badge}</span>}
        <button onClick={() => setFaved(f => !f)} style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', background: 'rgba(252,250,248,0.88)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={13} fill={faved ? '#E8547A' : 'none'} color={faved ? '#E8547A' : 'rgba(30,16,48,0.4)'} strokeWidth={2} />
        </button>
      </div>
      <div style={{ padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.65, marginBottom: 2 }}>{product.category}</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 400, lineHeight: 1.2 }}>{product.name}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <MiniBar label="Intensité"  value={intensityPct} color="var(--color-primary)" />
          <MiniBar label="Relaxation" value={relaxPct}     color="#2CC5A0" />
          <MiniBar label="Énergie"    value={energyPct}    color="#E8547A" />
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.flavours.slice(0,3).map(f => <span key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', color: 'var(--color-text-faint)', background: 'transparent' }}>{f}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.priceOptions.map(opt => <button key={opt.grams} onClick={() => setSelectedGrams(opt)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '4px 9px', borderRadius: 'var(--radius-full)', border: `1.5px solid ${selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-border)'}`, background: selectedGrams.grams === opt.grams ? 'var(--color-primary-muted)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 130ms' }}>{opt.grams}g</button>)}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--color-divider)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }}
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, background: added ? '#F59E0B' : 'var(--color-primary)', color: '#fff', padding: '8px 14px', borderRadius: 'var(--radius-full)', border: 'none', boxShadow: '0 3px 12px rgba(124,79,212,0.3)', display: 'flex', alignItems: 'center', gap: 5, transition: 'background 200ms', cursor: 'pointer' }}>
            <ShoppingCart size={11} />{added ? '✓' : 'Panier'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ─── LIST ROW ────────────────────────────────────────────────────────────────
function ListRow({ product }: { product: ProductData }) {
  const [selectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, padding: 'var(--space-4)', boxShadow: 'var(--shadow-xs)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', width: '100%', transition: 'box-shadow 180ms' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)'}
    >
      <div style={{ width: 76, height: 76, borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden', flexShrink: 0, background: product.bgColor }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.65 }}>{product.category}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 400, lineHeight: 1.2 }}>{product.name}</h3>
        <Stars rating={product.rating} size={10} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 7, flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }}
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, background: added ? '#F59E0B' : 'var(--color-primary)', color: '#fff', padding: '7px 14px', borderRadius: 'var(--radius-full)', border: 'none', boxShadow: '0 3px 12px rgba(124,79,212,0.28)', display: 'flex', alignItems: 'center', gap: 5, transition: 'background 200ms', cursor: 'pointer' }}>
          <ShoppingCart size={11} />{added ? '✓ OK' : 'Panier'}
        </motion.button>
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export function MorphingProductStack({
  products,
  defaultLayout = 'stack',
}: {
  products: ProductData[]
  defaultLayout?: LayoutMode
}) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Layout toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '5px', width: 'fit-content', margin: '0 auto', boxShadow: 'var(--shadow-xs)' }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map(mode => {
          const Icon = layoutIcons[mode]
          const isActive = layout === mode
          return (
            <button key={mode} onClick={() => setLayout(mode)} aria-label={`Affichage ${mode}`}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 'var(--radius-full)', background: isActive ? 'var(--color-primary)' : 'transparent', color: isActive ? '#fff' : 'var(--color-text-muted)', border: 'none', boxShadow: isActive ? '0 2px 10px rgba(124,79,212,0.3)' : 'none', fontFamily: 'var(--font-body)', fontWeight: isActive ? 600 : 400, fontSize: 13, cursor: 'pointer', transition: 'all 180ms' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {products.map(p => <ListRow key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
