"use client"

import Link from 'next/link'

type HoverCardProps = {
  name: string
  type: string
  price: string
  unit: string
  color: string
  emoji: string
  badge: string
  badgeColor: string
}

export function HoverCard({ name, type, price, unit, color, emoji, badge, badgeColor }: HoverCardProps) {
  return (
    <Link href="/produits" style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: color,
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-5)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          cursor: 'pointer',
          transition: 'transform var(--transition), box-shadow var(--transition)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-4px)'
          el.style.boxShadow = 'var(--shadow-lg)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'none'
          el.style.boxShadow = 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span dangerouslySetInnerHTML={{ __html: emoji }} style={{ fontSize: 36, lineHeight: 1 }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: badgeColor,
              color: '#fff',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </span>
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>
            {type}
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text)' }}>
            {name}
          </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--color-primary)' }}>
            {price}€
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--color-text-muted)' }}>
              {' '}{unit}
            </span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em', color: 'var(--color-primary)', textDecoration: 'underline' }}>Voir →</span>
        </div>
      </div>
    </Link>
  )
}
