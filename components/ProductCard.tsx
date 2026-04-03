"use client"

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from 'framer-motion'
import { ShoppingCart, ChevronDown, ChevronUp, Layers, Grid3X3, LayoutList, Star } from 'lucide-react'

export type LayoutMode = 'stack' | 'grid' | 'list'

export interface ProductData {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  intensity: number        // 1–5
  flavours: string[]
  feeling: string[]
  rating: number           // 1–5
  reviewCount: number
  priceOptions: { grams: number; price: number }[]
  image: string
  badge?: string
  badgeColor?: string
  bgColor: string
}

const SWIPE_THRESHOLD = 50

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= Math.round(rating) ? 'currentColor' : 'none'}
          style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}
        />
      ))}
    </span>
  )
}

function IntensityBar({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: 20,
            height: 5,
            borderRadius: 2,
            background:
              i <= level
                ? 'var(--color-primary)'
                : 'var(--color-border)',
            border: '1px solid var(--color-text)',
          }}
        />
      ))}
    </div>
  )
}

function ProductDetail({ product, onClose }: { product: ProductData; onClose: () => void }) {
  const [selectedGrams, setSelectedGrams] = useState(product.priceOptions[0])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'oklch(from var(--color-text) l c h / 0.55)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 0,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="retro-grain"
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
          maxWidth: 540,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: -8 }}>
          <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
        </div>

        {/* Image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: 'var(--radius-lg)',
            background: product.bgColor,
            border: '2px solid var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            overflow: 'hidden',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>{product.category}</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginTop: 2,
            }}>{product.name}</h2>
          </div>
          {product.badge && (
            <span
              className="badge"
              style={{
                background: product.badgeColor || 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                borderColor: 'transparent',
                fontFamily: 'var(--font-stamp)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >{product.badge}</span>
          )}
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, fontFamily: 'var(--font-display)' }}>{product.rating.toFixed(1)}</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-stamp)' }}>({product.reviewCount} avis)</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
          {product.longDescription}
        </p>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {/* Intensity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Intensité</span>
            <IntensityBar level={product.intensity} />
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {['Très léger', 'Léger', 'Moyen', 'Fort', 'Intense'][product.intensity - 1]}
            </span>
          </div>

          {/* Feeling */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Effets</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {product.feeling.map((f) => (
                <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Flavours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', gridColumn: '1 / -1' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Arômes</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {product.flavours.map((f) => (
                <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Price selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Quantité</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {product.priceOptions.map((opt) => (
              <button
                key={opt.grams}
                onClick={() => setSelectedGrams(opt)}
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-text)',
                  background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)',
                  boxShadow: selectedGrams.grams === opt.grams ? '2px 2px 0 var(--color-text)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                }}
              >
                {opt.grams}g &mdash; {opt.price.toFixed(2)}€
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleAdd}
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-base)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: added ? 'var(--color-gold)' : 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--color-text)',
            boxShadow: 'var(--shadow-card)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            transition: 'background 200ms ease',
          }}
        >
          <ShoppingCart size={18} />
          {added ? '✓ Ajouté au panier !' : `Ajouter — ${selectedGrams.price.toFixed(2)}€`}
        </motion.button>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            paddingBottom: 'var(--space-4)',
          }}
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>
  )
}

function MiniCard({
  product,
  layout,
  isTop,
  stackPosition,
  onClick,
  isDragging,
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

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const cardStyles = {
    stack: {
      position: 'absolute' as const,
      width: 260,
      minHeight: 340,
      top: stackPosition * 8,
      left: stackPosition * 8,
      zIndex: 10 - stackPosition,
      rotate: (stackPosition - 1) * 1.8,
    },
    grid: {
      position: 'relative' as const,
      width: '100%',
    },
    list: {
      position: 'relative' as const,
      width: '100%',
    },
  }

  return (
    <motion.div
      layoutId={product.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...cardStyles[layout],
      }}
      exit={{ opacity: 0, scale: 0.85, x: -180 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      onClick={() => { if (!isDragging) onClick() }}
      className="retro-grain"
      style={{
        background: product.bgColor,
        border: '2px solid var(--color-text)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow-card)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: layout === 'list' ? 'row' : 'column',
        gap: 'var(--space-3)',
        overflow: 'hidden',
        ...(layout === 'list' ? { alignItems: 'center' } : {}),
      }}
      whileHover={{ y: layout !== 'stack' ? -3 : 0, boxShadow: '6px 6px 0 var(--color-text)' }}
    >
      {/* Image / emoji */}
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          background: 'oklch(from var(--color-text) l c h / 0.05)',
          border: '1.5px solid var(--color-border)',
          overflow: 'hidden',
          flexShrink: 0,
          ...(layout === 'list'
            ? { width: 72, height: 72 }
            : { width: '100%', aspectRatio: '4/3' }),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={layout === 'list' ? 72 : 260}
          height={layout === 'list' ? 72 : 195}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement
            el.style.display = 'none'
            const parent = el.parentElement
            if (parent) {
              parent.style.fontSize = '40px'
              parent.textContent = '&#127807;'
            }
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              lineHeight: 1,
              marginBottom: 3,
            }}>{product.category}</p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: layout === 'list' ? 'var(--text-base)' : 'var(--text-lg)',
              fontWeight: 700,
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: layout === 'list' ? 'nowrap' : 'normal',
            }}>{product.name}</h3>
          </div>
          {product.badge && (
            <span
              className="badge"
              style={{
                background: product.badgeColor || 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                borderColor: 'transparent',
                fontFamily: 'var(--font-stamp)',
                fontSize: 9,
                flexShrink: 0,
              }}
            >{product.badge}</span>
          )}
        </div>

        <Stars rating={product.rating} size={12} />

        {layout !== 'list' && (
          <>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.55,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>{product.description}</p>

            {/* Intensity bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>Intensité</span>
              <IntensityBar level={product.intensity} />
            </div>

            {/* Flavour chips */}
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {product.flavours.slice(0, 3).map((f) => (
                <span key={f} className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>{f}</span>
              ))}
            </div>
          </>
        )}

        {/* Price + gram selector + add to cart */}
        <div
          style={{
            marginTop: layout === 'list' ? 0 : 'auto',
            display: 'flex',
            flexDirection: layout === 'list' ? 'row' : 'column',
            gap: 'var(--space-2)',
            alignItems: layout === 'list' ? 'center' : 'stretch',
            flexWrap: 'wrap',
          }}
        >
          {/* Gram buttons */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {product.priceOptions.map((opt) => (
              <button
                key={opt.grams}
                onClick={(e) => { e.stopPropagation(); setSelectedGrams(opt) }}
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 9,
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--color-text)',
                  background: selectedGrams.grams === opt.grams ? 'var(--color-primary)' : 'transparent',
                  color: selectedGrams.grams === opt.grams ? 'var(--color-text-inverse)' : 'var(--color-text)',
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'all 120ms',
                }}
              >
                {opt.grams}g
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)', flex: 1 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: layout === 'list' ? 'var(--text-base)' : 'var(--text-lg)',
              fontWeight: 900,
              color: 'var(--color-primary)',
            }}>{selectedGrams.price.toFixed(2)}€</span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: added ? 'var(--color-gold)' : 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                whiteSpace: 'nowrap',
                transition: 'background 200ms ease',
              }}
            >
              <ShoppingCart size={11} />
              {added ? '✓ OK' : 'Panier'}
            </motion.button>
          </div>
        </div>

        {layout !== 'list' && (
          <button
            onClick={(e) => { e.stopPropagation(); onClick() }}
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 9,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              paddingTop: 2,
            }}
          >
            Plus d’infos ↓
          </button>
        )}
      </div>

      {layout === 'stack' && isTop && (
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 9,
            color: 'oklch(from var(--color-text-muted) l c h / 0.4)',
            letterSpacing: '0.08em',
          }}>Glisser pour naviguer →</span>
        </div>
      )}
    </motion.div>
  )
}

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
    if (offset.x < -SWIPE_THRESHOLD || swipe < -800) {
      setActiveIndex((p) => (p + 1) % products.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 800) {
      setActiveIndex((p) => (p - 1 + products.length) % products.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < products.length; i++) {
      const index = (activeIndex + i) % products.length
      reordered.push({ ...products[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const displayProducts = layout === 'stack'
    ? getStackOrder()
    : products.map((p, i) => ({ ...p, stackPosition: i }))

  const containerClass =
    layout === 'stack'
      ? { position: 'relative' as const, height: 380, width: 276, margin: '0 auto' }
      : layout === 'grid'
      ? { display: 'grid' as const, gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 'var(--space-5)' }
      : { display: 'flex' as const, flexDirection: 'column' as const, gap: 'var(--space-4)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Layout toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-1)',
        background: 'var(--color-surface-offset)',
        border: '2px solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        padding: 'var(--space-1)',
        width: 'fit-content',
        margin: '0 auto',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          const isActive = layout === mode
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              aria-label={`Affichage ${mode}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                border: 'none',
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
            >
              <Icon size={14} />
              <span>{mode === 'stack' ? 'Pile' : mode === 'grid' ? 'Grille' : 'Liste'}</span>
            </button>
          )
        })}
      </div>

      {/* Cards */}
      <LayoutGroup>
        <motion.div layout style={containerClass}>
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product) => {
              const isTop = layout === 'stack' && product.stackPosition === 0
              return (
                <motion.div
                  key={product.id}
                  drag={isTop ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                  style={layout === 'stack' ? {
                    position: 'absolute',
                    cursor: isTop ? 'grab' : 'default',
                  } : {}}
                >
                  <MiniCard
                    product={product}
                    layout={layout}
                    isTop={isTop}
                    stackPosition={product.stackPosition}
                    onClick={() => setDetailProduct(product)}
                    isDragging={isDragging}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Stack dots */}
      {layout === 'stack' && products.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 'var(--space-4)' }}>
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Produit ${i + 1}`}
              style={{
                height: 6,
                width: i === activeIndex ? 18 : 6,
                borderRadius: 9999,
                background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)',
                border: '1.5px solid var(--color-text)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Detail sheet */}
      <AnimatePresence>
        {detailProduct && (
          <ProductDetail
            product={detailProduct}
            onClose={() => setDetailProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
