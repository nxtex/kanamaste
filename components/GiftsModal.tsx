"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Star, Trophy, Zap, Crown, ChevronRight, Sparkles } from 'lucide-react'

const USER_POINTS = 340  // demo

const TIERS = [
  { name: 'Graine', min: 0,    max: 199,  color: '#7c9e6b', icon: '🌱', perks: ['5% de réduction'] },
  { name: 'Pousse', min: 200,  max: 499,  color: '#5a8a4a', icon: '🌿', perks: ['8% de réduction', 'Livraison offerte'] },
  { name: 'Fleur',  min: 500,  max: 999,  color: 'var(--color-primary)', icon: '🌸', perks: ['12% de réduction', 'Livraison offerte', 'Accès ventes privées'] },
  { name: 'Mûre',   min: 1000, max: 1999, color: '#c0533a', icon: '🫐', perks: ['15% de réduction', 'Livraison express offerte', 'Produit offert / mois'] },
  { name: 'Résine', min: 2000, max: Infinity, color: '#8b5cf6', icon: '⭐', perks: ['20% de réduction', 'Livraison express offerte', '2 produits offerts / mois', 'Conseiller personnel'] },
]

const REWARDS = [
  { id: 'r1', name: 'Sachet Amnesia Haze 1g', desc: 'Fleur CBD offerte à glisser dans votre prochaine commande', cost: 80,  icon: '🌿', category: 'Produit', available: true },
  { id: 'r2', name: 'Livraison Express offerte', desc: 'Valable sur votre prochaine commande, sans minimum', cost: 120, icon: '🚀', category: 'Livraison', available: true },
  { id: 'r3', name: 'Code –10%', desc: 'Réduction de 10% sur toute la boutique, hors promotions', cost: 200, icon: '🎟️', category: 'Réduction', available: true },
  { id: 'r4', name: 'Coffret Découverte', desc: '3 fleurs CBD différentes en format 2g — le pack du curieux', cost: 350, icon: '🎁', category: 'Coffret', available: false },
  { id: 'r5', name: 'Huile Sommeil 10ml', desc: 'Notre huile CBD + mélatonine, format voyage', cost: 500, icon: '🌙', category: 'Produit', available: false },
  { id: 'r6', name: 'Box Mensuelle VIP', desc: 'Curation exclusive de 4 produits premium chaque mois', cost: 900, icon: '👑', category: 'Abonnement', available: false },
]

function PointsBar({ points, tier }: { points: number; tier: typeof TIERS[0] }) {
  const nextTier = TIERS[TIERS.findIndex(t => t === tier) + 1]
  if (!nextTier) return null
  const progress = ((points - tier.min) / (nextTier.min - tier.min)) * 100
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{tier.icon} {tier.name}</span>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{nextTier.icon} {nextTier.name}</span>
      </div>
      <div style={{ height: 8, borderRadius: 9999, background: 'var(--color-border)', border: '1.5px solid var(--color-text)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.2 }}
          style={{ height: '100%', background: tier.color, borderRadius: 9999 }}
        />
      </div>
      <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Encore <strong style={{ color: 'var(--color-text)' }}>{nextTier.min - points} pts</strong> pour atteindre {nextTier.icon} {nextTier.name}
      </p>
    </div>
  )
}

interface GiftsModalProps {
  open: boolean
  onClose: () => void
}

export default function GiftsModal({ open, onClose }: GiftsModalProps) {
  const [points, setPoints] = useState(USER_POINTS)
  const [redeemed, setRedeemed] = useState<string | null>(null)
  const [tab, setTab] = useState<'rewards' | 'tiers'>('rewards')

  const currentTier = [...TIERS].reverse().find(t => points >= t.min) ?? TIERS[0]

  const handleRedeem = (reward: typeof REWARDS[0]) => {
    if (points < reward.cost || !reward.available) return
    setPoints(p => p - reward.cost)
    setRedeemed(reward.id)
    setTimeout(() => setRedeemed(null), 2500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gifts-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'oklch(from var(--color-text) l c h / 0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          onClick={onClose}
        >
          <motion.div
            key="gifts-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-text)',
              borderBottom: 'none',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
              width: '100%',
              maxWidth: 540,
              maxHeight: '92dvh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-3) var(--space-3) 0' }}>
              <div style={{ width: 40, height: 4, borderRadius: 9999, background: 'var(--color-border)' }} />
            </div>

            {/* Header */}
            <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '2px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Gift size={20} style={{ color: 'var(--color-gold)' }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 800 }}>Fidélité & Cadeaux</h2>
                </div>
                <button onClick={onClose} aria-label="Fermer" style={{ padding: 6, borderRadius: 'var(--radius-sm)', color: 'var(--color-text-muted)', border: '1.5px solid var(--color-border)' }}>
                  <X size={16} />
                </button>
              </div>

              {/* Points hero */}
              <div style={{ background: `linear-gradient(135deg, ${currentTier.color}22, ${currentTier.color}08)`, border: `2px solid ${currentTier.color}`, borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div style={{ fontSize: 36 }}>{currentTier.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 2 }}>Niveau actuel</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 800 }}>{currentTier.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <motion.p
                    key={points}
                    initial={{ scale: 1.3, color: 'var(--color-gold)' }}
                    animate={{ scale: 1, color: 'var(--color-primary)' }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, lineHeight: 1 }}
                  >{points}</motion.p>
                  <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>points</p>
                </div>
              </div>

              <PointsBar points={points} tier={currentTier} />

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', background: 'var(--color-surface-offset)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: 3 }}>
                {(['rewards', 'tiers'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{ flex: 1, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px', borderRadius: 'var(--radius-full)', background: tab === t ? 'var(--color-primary)' : 'transparent', color: tab === t ? 'var(--color-text-inverse)' : 'var(--color-text-muted)', border: tab === t ? '1.5px solid var(--color-text)' : '1.5px solid transparent', boxShadow: tab === t ? '2px 2px 0 var(--color-text)' : 'none', transition: 'all 160ms', cursor: 'pointer' }}>
                    {t === 'rewards' ? '🎁 Récompenses' : '🏆 Niveaux'}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <AnimatePresence mode="wait">
                {tab === 'rewards' ? (
                  <motion.div key="rewards" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {REWARDS.map(reward => {
                      const canAfford = points >= reward.cost
                      const isRedeemed = redeemed === reward.id
                      return (
                        <motion.div
                          key={reward.id}
                          layout
                          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: canAfford && reward.available ? 'var(--color-surface-offset)' : 'var(--color-surface)', border: `1.5px solid ${canAfford && reward.available ? 'var(--color-border)' : 'var(--color-divider)'}`, borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', opacity: !reward.available ? 0.55 : 1 }}
                        >
                          <div style={{ fontSize: 28, flexShrink: 0, width: 44, textAlign: 'center' }}>{reward.icon}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 700, lineHeight: 1.2 }}>{reward.name}</p>
                              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-dynamic)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>{reward.category}</span>
                            </div>
                            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)', lineHeight: 1.5, letterSpacing: '0.04em' }}>{reward.desc}</p>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 900, color: canAfford && reward.available ? 'var(--color-primary)' : 'var(--color-text-faint)', marginTop: 4 }}>
                              {reward.cost} pts {!canAfford && reward.available && <span style={{ fontSize: 9, fontFamily: 'var(--font-stamp)', color: 'var(--color-text-faint)' }}>— il vous manque {reward.cost - points} pts</span>}
                            </p>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRedeem(reward)}
                            disabled={!canAfford || !reward.available}
                            style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: isRedeemed ? 'var(--color-gold)' : canAfford && reward.available ? 'var(--color-primary)' : 'var(--color-surface-dynamic)', color: canAfford && reward.available ? 'var(--color-text-inverse)' : 'var(--color-text-faint)', padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: canAfford && reward.available ? '2px 2px 0 var(--color-text)' : 'none', cursor: canAfford && reward.available ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all 160ms', whiteSpace: 'nowrap' }}
                          >
                            {isRedeemed ? '✓ Échangé !' : !reward.available ? 'Bientôt' : 'Échanger'}
                          </motion.button>
                        </motion.div>
                      )
                    })}
                    <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface-offset)', border: '1.5px dashed var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                        ✦ Gagnez <strong style={{ color: 'var(--color-primary)' }}>10 pts</strong> par euro dépensé<br/>
                        ✦ <strong style={{ color: 'var(--color-primary)' }}>Double pts</strong> le weekend<br/>
                        ✦ <strong style={{ color: 'var(--color-primary)' }}>50 pts</strong> bonus à l&apos;inscription
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="tiers" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {TIERS.map((tier, i) => {
                      const isActive = tier === currentTier
                      const isUnlocked = points >= tier.min
                      return (
                        <div key={tier.name} style={{ display: 'flex', gap: 'var(--space-3)', background: isActive ? `${tier.color}14` : 'var(--color-surface-offset)', border: `2px solid ${isActive ? tier.color : 'var(--color-border)'}`, borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', opacity: isUnlocked ? 1 : 0.5 }}>
                          <div style={{ fontSize: 28, flexShrink: 0 }}>{tier.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
                              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 800, color: isActive ? tier.color : 'var(--color-text)' }}>{tier.name}</p>
                              {isActive && <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', background: tier.color, color: '#fff', padding: '2px 7px', borderRadius: 'var(--radius-full)' }}>Votre niveau</span>}
                            </div>
                            <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-faint)', letterSpacing: '0.06em', marginBottom: 6 }}>
                              {tier.max === Infinity ? `${tier.min}+ pts` : `${tier.min} – ${tier.max} pts`}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                              {tier.perks.map(perk => (
                                <p key={perk} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>✦ {perk}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
