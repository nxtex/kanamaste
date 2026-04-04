"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ShoppingCart, Layers, Grid3X3, LayoutList, Star, Info, X, ChevronLeft, ChevronRight } from 'lucide-react'

export type LayoutMode = 'stack' | 'grid' | 'list'

export interface ProductData {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  intensity: number        // 1-5
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

const SWIPE_THRESHOLD = 45
const layoutIcons = { stack: Layers, grid: Grid3X3, list: LayoutList }

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'flex', gap: 2, color: '#f59e0b' }} aria-label={`${rating} étoiles`}>
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? 'currentColor' : 'none'}
          style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }} />
      ))}
    </span>
  )
}

// ─── Horizontal progress bar ─────────────────────────────────────────────────
function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.04em',
        color: 'var(--color-text-muted)', width: 76, flexShrink: 0,
      }}>{label}</span>
      <div style={{
        flex: 1, height: 6, borderRadius: 9999,
        background: 'var(--color-surface-offset)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 9999, background: color }}
        />
      </div>
      <span style={{
        fontFamily: 'var(--font-stamp)', fontSize: 11,
        color: 'var(--color-text-muted)', width: 24, textAlign: 'right', flexShrink: 0,
      }}>{value}</span>
    </div>
  )
}

// Map intensity 1-5 to 0-100 values for the three bars
function getBars(intensity: number, feeling: string[]) {
  const hasRelax = feeling.some(f => /relax|apais|serein|sommeil|lourd/i.test(f))
  const hasEnergy = feeling.some(f => /éveillé|créat|énergi|euphor|tonif/i.test(f))
  const intensityPct = Math.round((intensity / 5) * 100)
  const relaxPct = hasRelax ? Math.round(Math.min(100, (6 - intensity) * 18 + 10)) : Math.round((6 - intensity) * 12)
  const energyPct = hasEnergy ? Math.round(Math.min(100, intensity * 16 + 10)) : Math.round(intensity * 10)
  return { intensityPct, relaxPct, energyPct }
}

// ─── Full-screen mobile swipe card ───────────────────────────────────────────
function MobileSwipeCard({
  product,
  onSwipeLeft,
  onSwipeRight,
  onInfo,
  stackIndex,
  total,
  activeIndex,
}: {
  product: ProductData
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onInfo: () => void
  stackIndex: number
  total: number
  activeIndex: number
}) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getBars(product.intensity, product.feeling)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 420,
      margin: '0 auto',
      borderRadius: 24,
      overflow: 'hidden',
      background: 'var(--color-surface)',
      border: '2px solid var(--color-text)',
      boxShadow: '4px 6px 0 var(--color-text)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── IMAGE ZONE ── */}
      <div style={{
        position: 'relative',
        background: product.bgColor,
        height: 260,
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* badge top-left */}
        {product.badge && (
          <span style={{
            position: 'absolute', top: 14, left: 14,
            fontFamily: 'var(--font-stamp)', fontSize: 11,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            background: product.badgeColor || 'var(--color-primary)',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: 9999,
            border: '1.5px solid rgba(255,255,255,0.4)',
          }}>{product.badge}</span>
        )}
        {/* cbd% top-right */}
        {product.cbdPercent && (
          <span style={{
            position: 'absolute', top: 14, right: 14,
            fontFamily: 'var(--font-stamp)', fontSize: 12,
            letterSpacing: '0.06em',
            background: 'rgba(255,255,255,0.92)',
            color: 'var(--color-text)',
            padding: '4px 12px',
            borderRadius: 9999,
            border: '1.5px solid var(--color-border)',
          }}>{product.cbdPercent}</span>
        )}
        {/* dots counter */}
        <div style={{
          position: 'absolute', bottom: 12, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 6,
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === activeIndex ? 18 : 6,
              height: 6,
              borderRadius: 9999,
              background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.45)',
              transition: 'all 250ms',
            }} />
          ))}
        </div>
      </div>

      {/* ── INFO ZONE ── */}
      <div style={{
        padding: '16px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        background: 'var(--color-surface)',
      }}>
        {/* name + category */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.15rem, 4vw, 1.4rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--color-text)',
            margin: 0,
          }}>{product.name}</h3>
          <p style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginTop: 3,
          }}>{product.category}</p>
        </div>

        {/* progress bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <ProgressBar label="Intensité" value={intensityPct} color="var(--color-primary)" />
          <ProgressBar label="Relaxation" value={relaxPct} color="#06b6d4" />
          <ProgressBar label="Énergie" value={energyPct} color="#f472b6" />
        </div>

        {/* flavour tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {product.flavours.slice(0, 3).map(f => (
            <span key={f} style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 10,
              letterSpacing: '0.05em',
              padding: '3px 10px',
              borderRadius: 9999,
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              background: 'var(--color-surface-offset)',
            }}>{f}</span>
          ))}
        </div>

        {/* grammage selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-stamp)', fontSize: 11,
            color: 'var(--color-text-muted)', letterSpacing: '0.06em',
            marginRight: 2,
          }}>Grammage :</span>
          {product.priceOptions.map(opt => (
            <button
              key={opt.grams}
              onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }}
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 12,
                letterSpacing: '0.04em',
                padding: '6px 14px',
                borderRadius: 8,
                border: selectedGrams.grams === opt.grams
                  ? '2px solid var(--color-text)'
                  : '2px solid var(--color-border)',
                background: selectedGrams.grams === opt.grams
                  ? 'var(--color-surface-dynamic)'
                  : 'var(--color-surface)',
                color: 'var(--color-text)',
                fontWeight: selectedGrams.grams === opt.grams ? 700 : 400,
                cursor: 'pointer',
                boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none',
                transition: 'all 120ms',
              }}
            >{opt.grams}g</button>
          ))}
        </div>

        {/* price + stars */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              fontWeight: 900,
              color: 'var(--color-primary)',
              lineHeight: 1,
            }}>{selectedGrams.price.toFixed(0)}€</span>
            <span style={{
              fontFamily: 'var(--font-stamp)', fontSize: 12,
              color: 'var(--color-text-muted)',
            }}>pour {selectedGrams.grams}g</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Stars rating={product.rating} size={13} />
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: 'var(--color-text-muted)' }}>
              {product.rating.toFixed(1)} ({product.reviewCount} avis)
            </span>
          </div>
        </div>

        {/* action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
          <button
            onClick={onInfo}
            style={{
              flex: 1,
              fontFamily: 'var(--font-stamp)',
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '13px 0',
              borderRadius: 10,
              border: '2px solid var(--color-text)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              cursor: 'pointer',
              boxShadow: '2px 2px 0 var(--color-border)',
            }}
          >
            <Info size={14} /> Infos
          </button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            style={{
              flex: 2,
              fontFamily: 'var(--font-stamp)',
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '13px 0',
              borderRadius: 10,
              border: '2px solid var(--color-text)',
              background: added ? '#f59e0b' : 'var(--color-primary)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              cursor: 'pointer',
              boxShadow: '3px 3px 0 var(--color-text)',
              transition: 'background 200ms',
            }}
          >
            <ShoppingCart size={14} />
            {added ? '✓ Ajouté !' : '+ Panier'}
          </motion.button>
        </div>

        {/* swipe hint */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-stamp)',
          fontSize: 10,
          letterSpacing: '0.1em',
          color: 'var(--color-text-faint)',
          marginTop: 2,
        }}>← glisser pour explorer →</p>
      </div>
    </div>
  )
}

// ─── Detail modal ─────────────────────────────────────────────────────────────
function ProductDetail({ product, onClose }: { product: ProductData; onClose: () => void }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getBars(product.intensity, product.feeling)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        onClick={e => e.stopPropagation()}
        className="retro-grain"
        style={{
          background: 'var(--color-surface)',
          border: '2px solid var(--color-text)',
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: 560,
          maxHeight: '90dvh',
          overflowY: 'auto',
          padding: '0 0 calc(env(safe-area-inset-bottom) + 24px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
        </div>
        {/* header image */}
        <div style={{ width: '100%', aspectRatio: '16/9', background: product.bgColor, overflow: 'hidden', position: 'relative' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, right: 12,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: '1.5px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}><X size={16} color="var(--color-text)" /></button>
        </div>
        {/* body */}
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.2, marginTop: 3 }}>{product.name}</h2>
            </div>
            {product.badge && (
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 10px', borderRadius: 9999, background: product.badgeColor || 'var(--color-primary)', color: '#fff', whiteSpace: 'nowrap', flexShrink: 0 }}>{product.badge}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars rating={product.rating} size={14} />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-stamp)' }}>({product.reviewCount} avis)</span>
          </div>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{product.longDescription}</p>
          {/* bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ProgressBar label="Intensité" value={intensityPct} color="var(--color-primary)" />
            <ProgressBar label="Relaxation" value={relaxPct} color="#06b6d4" />
            <ProgressBar label="Énergie" value={energyPct} color="#f472b6" />
          </div>
          {/* feeling + flavours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Effets</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {product.feeling.map(f => (
                  <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 8px', borderRadius: 9999, border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)' }}>{f}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>Arômes</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {product.flavours.map(f => (
                  <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, padding: '3px 8px', borderRadius: 9999, border: '1.5px solid #f59e0b', color: '#b45309' }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
          {/* gram selector */}
          <div>
            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 8 }}>Quantité</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.priceOptions.map(opt => (
                <button key={opt.grams} onClick={() => setSelectedGrams(opt)} style={{ fontFamily: 'var(--font-stamp)', fontSize: 12, padding: '8px 16px', borderRadius: 8, border: '2px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-surface)', color: selectedGrams.grams === opt.grams ? '#fff' : 'var(--color-text)', boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none', cursor: 'pointer', letterSpacing: '0.04em' }}>
                  {opt.grams}g — {opt.price.toFixed(2)}€
                </button>
              ))}
            </div>
          </div>
          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
            style={{ fontFamily: 'var(--font-stamp)', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', padding: '16px', borderRadius: 12, border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 200ms', cursor: 'pointer' }}
          >
            <ShoppingCart size={18} />
            {added ? '✓ Ajouté au panier !' : `Ajouter — ${selectedGrams.price.toFixed(2)}€`}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Grid card (desktop) ──────────────────────────────────────────────────────
function GridCard({ product, onOpenDetail }: { product: ProductData; onOpenDetail: () => void }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const { intensityPct, relaxPct, energyPct } = getBars(product.intensity, product.feeling)

  return (
    <div className="retro-grain" style={{
      background: 'var(--color-surface)',
      border: '2px solid var(--color-text)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '4px 4px 0 var(--color-text)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 180ms, box-shadow 180ms',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 var(--color-text)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 var(--color-text)' }}
    >
      {/* image */}
      <div style={{ position: 'relative', background: product.bgColor, height: 200, overflow: 'hidden', flexShrink: 0 }}>
        <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {product.badge && (
          <span style={{ position: 'absolute', top: 10, left: 10, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', background: product.badgeColor || 'var(--color-primary)', color: '#fff', padding: '3px 10px', borderRadius: 9999 }}>{product.badge}</span>
        )}
      </div>
      {/* body */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
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
          {product.flavours.slice(0,3).map(f => (
            <span key={f} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '2px 8px', borderRadius: 9999, border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)' }}>{f}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.priceOptions.map(opt => (
            <button key={opt.grams} onClick={() => setSelectedGrams(opt)} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '4px 8px', borderRadius: 6, border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? '#fff' : 'var(--color-text)', cursor: 'pointer', letterSpacing: '0.04em' }}>{opt.grams}g</button>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 8, borderTop: '1px solid var(--color-divider)' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={onOpenDetail} style={{ padding: '7px 10px', borderRadius: 8, border: '1.5px solid var(--color-text)', background: 'var(--color-surface)', color: 'var(--color-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.06em' }}>
              <Info size={11} /> Infos
            </button>
            <motion.button whileTap={{ scale: 0.92 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1600) }} style={{ padding: '7px 12px', borderRadius: 8, border: '1.5px solid var(--color-text)', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.06em', boxShadow: '2px 2px 0 var(--color-text)', transition: 'background 200ms' }}>
              <ShoppingCart size={11} /> {added ? '✓' : 'Panier'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── List row ─────────────────────────────────────────────────────────────────
function ListRow({ product, onOpenDetail }: { product: ProductData; onOpenDetail: () => void }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  return (
    <div className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 14, padding: 'var(--space-4)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
      <div style={{ width: 80, height: 80, borderRadius: 10, border: '1.5px solid var(--color-border)', overflow: 'hidden', flexShrink: 0, background: product.bgColor }}>
        <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{product.category}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
        <Stars rating={product.rating} size={12} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1600) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? '#f59e0b' : 'var(--color-primary)', color: '#fff', padding: '6px 12px', borderRadius: 7, border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 200ms', cursor: 'pointer' }}>
            <ShoppingCart size={11} />{added ? '✓ OK' : 'Panier'}
          </motion.button>
          <button onClick={onOpenDetail} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}>Détails</button>
        </div>
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [detailProduct, setDetailProduct] = useState<ProductData | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [exitX, setExitX] = useState(0)

  const currentProduct = products[activeIndex]

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const combined = offset.x + velocity.x * 0.18
    if (combined < -SWIPE_THRESHOLD) {
      setExitX(-300)
      setTimeout(() => { setActiveIndex(p => (p + 1) % products.length); setExitX(0) }, 10)
    } else if (combined > SWIPE_THRESHOLD) {
      setExitX(300)
      setTimeout(() => { setActiveIndex(p => (p - 1 + products.length) % products.length); setExitX(0) }, 10)
    }
    setTimeout(() => setIsDragging(false), 50)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      {/* ── Layout toggle ── */}
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

      {/* ── STACK MODE: full-card swipeable ── */}
      {layout === 'stack' && (
        <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto', touchAction: 'pan-y', userSelect: 'none' }}>
          {/* nav arrows desktop */}
          <button
            onClick={() => setActiveIndex(p => (p - 1 + products.length) % products.length)}
            aria-label="Précédent"
            style={{ position: 'absolute', left: -52, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--color-text)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          ><ChevronLeft size={18} /></button>
          <button
            onClick={() => setActiveIndex(p => (p + 1) % products.length)}
            aria-label="Suivant"
            style={{ position: 'absolute', right: -52, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--color-text)', background: 'var(--color-surface)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          ><ChevronRight size={18} /></button>

          {/* counter badge */}
          <div style={{ textAlign: 'right', marginBottom: 8, paddingRight: 4 }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>
              {activeIndex + 1} / {products.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id + activeIndex}
              initial={{ opacity: 0, x: exitX || 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: exitX || -60, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
            >
              <MobileSwipeCard
                product={currentProduct}
                onSwipeLeft={() => setActiveIndex(p => (p + 1) % products.length)}
                onSwipeRight={() => setActiveIndex(p => (p - 1 + products.length) % products.length)}
                onInfo={() => setDetailProduct(currentProduct)}
                stackIndex={activeIndex}
                total={products.length}
                activeIndex={activeIndex}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── GRID MODE ── */}
      {layout === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--space-5)' }}>
          {products.map(p => (
            <GridCard key={p.id} product={p} onOpenDetail={() => setDetailProduct(p)} />
          ))}
        </div>
      )}

      {/* ── LIST MODE ── */}
      {layout === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {products.map(p => (
            <ListRow key={p.id} product={p} onOpenDetail={() => setDetailProduct(p)} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {detailProduct && <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />}
      </AnimatePresence>
    </div>
  )
}
