"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Star, Zap, Crown, Leaf, Award, ChevronRight, Sparkles } from 'lucide-react'

/* ── LOYALTY POINTS SYSTEM ───────────────────────────────────────
   Each purchase earns 1 point per euro spent.
   Points can be exchanged for exclusive CBD gifts.
──────────────────────────────────────────────── */

const USER_POINTS = 340  // demo — replace with real state/API

interface LoyaltyReward {
  id: string
  name: string
  description: string
  cost: number          // points needed
  category: string
  icon: typeof Gift
  color: string
  badge?: string
}

const REWARDS: LoyaltyReward[] = [
  {
    id: 'sample-flower',
    name: 'Échantillon Fleur CBD',
    description: "1g de notre fleur premium au choix, livré avec votre prochaine commande.",
    cost: 50,
    category: 'Dégustation',
    icon: Leaf,
    color: '#e8f4e8',
    badge: 'Populaire',
  },
  {
    id: 'rolling-kit',
    name: 'Kit Roulage Artisanal',
    description: "Carton non blanchi, filtres en verre, pochette en lin. Fait main.",
    cost: 120,
    category: 'Accessoire',
    icon: Gift,
    color: '#f4ede0',
  },
  {
    id: 'huile-tester',
    name: 'Testeur Huile CBD 5%',
    description: "5ml d'huile full-spectrum pour découvrir notre gamme Bien-Être.",
    cost: 180,
    category: 'Huile',
    icon: Zap,
    color: '#fdf0d8',
  },
  {
    id: 'tote-bag',
    name: 'Tote Bag Kanamaste',
    description: "Coton bio naturel sérigraphié. Édition limitée printemps 2026.",
    cost: 200,
    category: 'Lifestyle',
    icon: Award,
    color: '#f0eaf5',
    badge: 'Édition limitée',
  },
  {
    id: 'grinder',
    name: 'Grinder Zinc Premium',
    description: "Broyeur à 4 parties en alliage de zinc, magnétique, avec récupérateur de pollen.",
    cost: 300,
    category: 'Accessoire',
    icon: Crown,
    color: '#e8f0f8',
  },
  {
    id: 'coffret-vip',
    name: 'Coffret VIP Découverte',
    description: "5 variétés en 1g chacune + huile 10% 10ml + grinder. Le cadeau ultime.",
    cost: 500,
    category: 'Coffret',
    icon: Sparkles,
    color: '#fff5e0',
    badge: '⭐ VIP',
  },
]

export default function GiftsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [points, setPoints] = useState(USER_POINTS)
  const [redeemed, setRedeemed] = useState<string | null>(null)
  const [tab, setTab] = useState<'rewards' | 'history'>('rewards')

  const handleRedeem = (reward: LoyaltyReward) => {
    if (points >= reward.cost) {
      setPoints(p => p - reward.cost)
      setRedeemed(reward.id)
      setTimeout(() => setRedeemed(null), 2500)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gifts-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'oklch(from var(--color-text) l c h / 0.52)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={onClose}
        >
          <style>{`
            @media (min-width: 640px) {
              .gifts-panel {
                border-bottom: 2px solid var(--color-text) !important;
                border-radius: var(--radius-xl) !important;
                max-height: 82dvh !important;
              }
              .gifts-backdrop {
                align-items: center !important;
              }
            }
          `}</style>
          <motion.div
            key="gifts-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={e => e.stopPropagation()}
            className="retro-grain gifts-panel"
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-text)',
              borderBottom: 'none',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              width: '100%',
              maxWidth: 520,
              maxHeight: '90dvh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: 'var(--space-5) var(--space-5) 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
                    <Gift size={18} style={{ color: 'var(--color-gold)' }} />
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>Cadeaux Fidélité</h2>
                  </div>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>1 point = 1€ d&apos;achat</p>
                </div>
                <button onClick={onClose} aria-label="Fermer" style={{ padding: 6, borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)', display: 'flex', flexShrink: 0 }}>
                  <X size={16} />
                </button>
              </div>

              {/* Points banner */}
              <div className="retro-grain" style={{ marginTop: 'var(--space-4)', background: 'var(--color-primary)', border: '2px solid var(--color-text)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'oklch(from #f5f0e8 l c h / 0.65)', marginBottom: 2 }}>Vos points disponibles</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <motion.span
                      key={points}
                      initial={{ scale: 1.3, color: 'var(--color-gold)' }}
                      animate={{ scale: 1, color: '#f5f0e8' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, lineHeight: 1, display: 'inline-block' }}
                    >{points}</motion.span>
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'oklch(from #f5f0e8 l c h / 0.7)', letterSpacing: '0.1em' }}>PTS</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <Star size={28} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'oklch(from #f5f0e8 l c h / 0.55)', letterSpacing: '0.08em' }}>Niveau Or</span>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 0, marginTop: 'var(--space-4)', borderBottom: '1.5px solid var(--color-border)' }}>
                {(['rewards', 'history'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: 'var(--space-2) var(--space-4)',
                      color: t === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      marginBottom: -1.5,
                      background: 'none', border: 'none', borderBottom: t === tab ? '2.5px solid var(--color-primary)' : '2.5px solid transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {t === 'rewards' ? '🎁 Récompenses' : '📋 Historique'}
                  </button>
                ))}
              </div>
            </div>

            {/* Redeem success toast */}
            <AnimatePresence>
              {redeemed && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  style={{ margin: 'var(--space-3) var(--space-5) 0', background: 'oklch(from var(--color-primary) l c h / 0.10)', border: '1.5px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
                >
                  <span style={{ fontSize: 18 }}>🎉</span>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-primary)' }}>Cadeau ajouté à votre prochaine commande !</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {tab === 'rewards' ? (
                REWARDS.map(reward => {
                  const RewardIcon = reward.icon
                  const canAfford = points >= reward.cost
                  const isRedeemed = redeemed === reward.id
                  return (
                    <motion.div
                      key={reward.id}
                      whileHover={{ y: -2 }}
                      style={{
                        background: reward.color,
                        border: '1.5px solid var(--color-text)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-4)',
                        display: 'flex',
                        gap: 'var(--space-3)',
                        alignItems: 'center',
                        opacity: canAfford ? 1 : 0.55,
                        transition: 'opacity 200ms',
                      }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'oklch(from var(--color-text) l c h / 0.07)', border: '1.5px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <RewardIcon size={22} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{reward.name}</p>
                          {reward.badge && <span className="badge" style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, background: 'var(--color-gold)', color: 'var(--color-text)', borderColor: 'transparent' }}>{reward.badge}</span>}
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2, lineHeight: 1.5 }}>{reward.description}</p>
                        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{reward.category}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 900, color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>{reward.cost} pts</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford || isRedeemed}
                          style={{
                            fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                            padding: '7px 12px', borderRadius: 'var(--radius-sm)',
                            border: '1.5px solid var(--color-text)',
                            background: isRedeemed ? 'var(--color-gold)' : canAfford ? 'var(--color-primary)' : 'var(--color-border)',
                            color: canAfford ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', gap: 4,
                            boxShadow: canAfford ? '2px 2px 0 var(--color-text)' : 'none',
                            transition: 'all 150ms',
                          }}
                        >
                          {isRedeemed ? '✓' : <ChevronRight size={11} />}
                          {isRedeemed ? 'Obtenu' : 'Obtenir'}
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                /* History tab */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {[
                    { label: 'Commande #1042', pts: '+28', date: '01 Avr. 2026', type: 'earn' },
                    { label: 'Commande #1038', pts: '+45', date: '22 Mar. 2026', type: 'earn' },
                    { label: "Cadeau: Échantillon Fleur", pts: '−50', date: '15 Mar. 2026', type: 'spend' },
                    { label: 'Commande #1031', pts: '+62', date: '10 Mar. 2026', type: 'earn' },
                    { label: 'Bonus inscription', pts: '+25', date: '01 Jan. 2026', type: 'earn' },
                  ].map((h, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface-offset)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.06em' }}>{h.label}</p>
                        <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-faint)', letterSpacing: '0.08em' }}>{h.date}</p>
                      </div>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, color: h.type === 'earn' ? 'var(--color-primary)' : 'var(--color-terracotta, var(--color-warning))' }}>{h.pts} pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — earn more info */}
            <div style={{ padding: 'var(--space-3) var(--space-5) var(--space-5)', borderTop: '1.5px solid var(--color-border)', flexShrink: 0, textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--color-text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Gagnez des points à chaque achat · 1€ = 1 point</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
