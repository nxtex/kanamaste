"use client"

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from 'framer-motion'
import { ShoppingCart, Layers, Grid3X3, LayoutList, Star } from 'lucide-react'

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
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 22, height: 6, borderRadius: 2, background: i <= level ? 'var(--color-primary)' : 'var(--color-border)', border: '1px solid var(--color-text)' }} />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT DETAIL MODAL
   Mobile: slides up from bottom (sheet)
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
        /* mobile: align bottom; desktop: center via CSS media-like logic */
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
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
        <style>{`
          @media (min-width: 640px) {
            .product-detail-panel {
              border-bottom: 2px solid var(--color-text) !important;
              border-radius: var(--radius-xl) !important;
              max-height: 82dvh !important;
            }
          }
        `}</style>
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
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{['Très léger','Léger','Moyen','Fort','Intense'][product.intensity - 1]}</span>
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
   MINI CARD
   In STACK mode, the card itself holds its stacking styles.
   The outer drag wrapper is absolutely positioned and fills
   the container — the card renders inside it at full width.
   Key fix: overflow:visible on drag wrapper so back-cards
   peek through without being clipped.
───────────────────────────────────────────────────────────── */
function MiniCard({
  product, layout, isTop, stackPosition, onClick, isDragging
}: {
  product: ProductData
  layout: LayoutMode
  isTop: boolean
  stackPosition: number
  onClick: () => void
  isDragging: boolean
}) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)
  const handleAdd = (e: React.MouseEvent) => { e.stopPropagation(); setAdded(true); setTimeout(() => setAdded(false), 1600) }

  return (
    <div
      onClick={() => { if (!isDragging) onClick() }}
      className="retro-grain"
      style={{
        background: product.bgColor,
        border: '2px solid var(--color-text)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: layout === 'stack' ? `${4 + stackPosition}px ${4 + stackPosition}px 0 var(--color-text)` : 'var(--shadow-card)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: layout === 'list' ? 'row' : 'column',
        gap: 'var(--space-4)',
        ...(layout === 'list' ? { alignItems: 'center' } : {}),
        /* No overflow:hidden in stack so the card doesn't crop its own shadow */
        overflow: layout === 'stack' ? 'visible' : 'hidden',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{
        borderRadius: 'var(--radius-md)',
        background: 'oklch(from var(--color-text) l c h / 0.05)',
        border: '1.5px solid var(--color-border)',
        overflow: 'hidden',
        flexShrink: 0,
        ...(layout === 'list' ? { width: 80, height: 80 } : { width: '100%', aspectRatio: '3/2' }),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={product.image} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', lineHeight: 1, marginBottom: 4 }}>{product.category}</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: layout === 'list' ? 'var(--text-base)' : 'var(--text-lg)', fontWeight: 700, lineHeight: 1.2 }}>{product.name}</h3>
          </div>
          {product.badge && <span className="badge" style={{ background: product.badgeColor || 'var(--color-primary)', color: 'var(--color-text-inverse)', borderColor: 'transparent', fontFamily: 'var(--font-stamp)', fontSize: 9, flexShrink: 0 }}>{product.badge}</span>}
        </div>

        <Stars rating={product.rating} size={13} />

        {layout !== 'list' && (
          <>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Intensité</span>
              <IntensityBar level={product.intensity} />
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {product.flavours.slice(0, 3).map(f => <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>)}
            </div>
          </>
        )}

        {/* Price + gram selector + cart */}
        <div style={{ marginTop: layout === 'list' ? 0 : 'auto', display: 'flex', flexDirection: layout === 'list' ? 'row' : 'column', gap: 'var(--space-2)', alignItems: layout === 'list' ? 'center' : 'stretch', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {product.priceOptions.map(opt => (
              <button key={opt.grams} onClick={e => { e.stopPropagation(); setSelectedGrams(opt) }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent', color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 120ms' }}>
                {opt.grams}g
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)', flex: 1 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--color-primary)' }}>{selectedGrams.price.toFixed(2)}€</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', background: added ? 'var(--color-gold)' : 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap', transition: 'background 200ms' }}>
              <ShoppingCart size={13} />
              {added ? '✓ OK' : 'Panier'}
            </motion.button>
          </div>
        </div>

        {layout !== 'list' && (
          <button onClick={e => { e.stopPropagation(); onClick() }} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: 3, paddingTop: 2 }}>Plus d&apos;infos ↓</button>
        )}
      </div>

      {isTop && layout === 'stack' && (
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'oklch(from var(--color-text-muted) l c h / 0.4)', letterSpacing: '0.08em' }}>← Glisser pour naviguer →</span>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MORPHING PRODUCT STACK

   PILE FIX EXPLANATION:
   Previously the outer motion.div drag wrapper used
   AnimatePresence mode="popLayout" which animates cards out
   before a new one enters, causing the "disappear" glitch.
   Fix: each card in the stack is its own absolutely-positioned
   drag wrapper. The container has overflow:visible so back-cards
   peek through. We do NOT use AnimatePresence in stack mode —
   we just reorder the array and let position/zIndex handle it.
   AnimatePresence is only used for grid/list layout transitions.
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

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x
    if (offset.x < -SWIPE_THRESHOLD || swipe < -800)
      setActiveIndex(p => (p + 1) % products.length)
    else if (offset.x > SWIPE_THRESHOLD || swipe > 800)
      setActiveIndex(p => (p - 1 + products.length) % products.length)
    setTimeout(() => setIsDragging(false), 50)
  }

  /* Build ordered stack: activeIndex on top (stackPosition 0),
     rest behind. Return array in render order (back → front). */
  const getStackItems = () => {
    const result = []
    for (let i = 0; i < products.length; i++) {
      const index = (activeIndex + i) % products.length
      result.push({ ...products[index], stackPosition: i })
    }
    /* Render back-to-front so top card is painted last (on top) */
    return result.reverse()
  }

  const CARD_WIDTH = 'min(88vw, 460px)'
  const OFFSET_PX = 10
  const STACK_HEIGHT = 520

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
            width: CARD_WIDTH,
            height: STACK_HEIGHT,
            margin: '0 auto',
            /* overflow:visible is CRITICAL — lets back cards peek out */
            overflow: 'visible',
          }}
        >
          {getStackItems().map(product => {
            const isTop = product.stackPosition === 0
            const offset = (products.length - 1 - product.stackPosition) * OFFSET_PX
            return (
              <motion.div
                key={product.id}
                style={{
                  position: 'absolute',
                  top: offset,
                  left: offset,
                  right: -offset,
                  zIndex: isTop ? 10 : products.length - product.stackPosition,
                  rotate: isTop ? 0 : (product.stackPosition % 2 === 0 ? 1.2 : -1.4),
                  cursor: isTop ? 'grab' : 'default',
                  /* overflow:visible so card shadow/peek is not clipped */
                  overflow: 'visible',
                }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.03, cursor: 'grabbing', zIndex: 20 }}
                animate={{ rotate: isTop ? 0 : (product.stackPosition % 2 === 0 ? 1.2 : -1.4) }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <MiniCard
                  product={product}
                  layout="stack"
                  isTop={isTop}
                  stackPosition={product.stackPosition}
                  onClick={() => setDetailProduct(product)}
                  isDragging={isDragging}
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
            <MiniCard
              key={product.id}
              product={product}
              layout="grid"
              isTop={false}
              stackPosition={i}
              onClick={() => setDetailProduct(product)}
              isDragging={false}
            />
          ))}
        </div>
      )}

      {/* ── LIST MODE ──────────────────────────────────────────── */}
      {layout === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {products.map((product, i) => (
            <MiniCard
              key={product.id}
              product={product}
              layout="list"
              isTop={false}
              stackPosition={i}
              onClick={() => setDetailProduct(product)}
              isDragging={false}
            />
          ))}
        </div>
      )}

      {/* Stack navigation dots */}
      {layout === 'stack' && products.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 'var(--space-4)' }}>
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
