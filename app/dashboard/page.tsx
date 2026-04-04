'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, MapPin, Heart, User, LogOut,
  ChevronRight, Star, Plus, Pencil, Trash2,
  ShoppingBag, CheckCircle2, Clock, Truck
} from 'lucide-react'
import FloatingNav from '@/components/FloatingNav'
import { useAuth } from '@/context/AuthContext'

type Tab = 'commandes' | 'adresses' | 'favoris' | 'informations'

const ORDERS = [
  { id: '#KN-2401', date: '28 mars 2026', status: 'livré', total: 49.80, items: ['Amnesia Haze CBD 5g', 'Huile Full Spectrum 10%'], statusColor: '#22c55e' },
  { id: '#KN-2389', date: '14 mars 2026', status: 'en transit', total: 76.90, items: ['Northern Lights CBD 10g', 'Charas Artisanal 2g'], statusColor: '#f59e0b' },
  { id: '#KN-2271', date: '02 fév. 2026', status: 'livré', total: 39.90, items: ['Coffret Découverte'], statusColor: '#22c55e' },
  { id: '#KN-2198', date: '18 jan. 2026', status: 'livré', total: 22.90, items: ['Amnesia Haze CBD 5g'], statusColor: '#22c55e' },
]

const ADDRESSES = [
  { id: 1, label: 'Domicile', name: 'Anas K.', line1: '12 rue des Lilas', line2: '', city: '75011 Paris', country: 'France', isDefault: true },
  { id: 2, label: 'Bureau', name: 'Anas K.', line1: '45 avenue Montaigne', line2: 'Bât. B — 3ème', city: '75008 Paris', country: 'France', isDefault: false },
]

const FAVORITES = [
  { id: 'amnesia-haze', name: 'Amnesia Haze CBD', category: 'Fleur', price: 22.90, rating: 4.7, bgColor: '#F0EAFF', badge: 'Bestseller' },
  { id: 'huile-full-spectrum', name: 'Huile Full Spectrum 10%', category: 'Huile', price: 34.90, rating: 4.9, bgColor: '#E8FBF8', badge: 'Recommandé' },
  { id: 'northern-lights', name: 'Northern Lights CBD', category: 'Fleur', price: 26.90, rating: 4.6, bgColor: '#EDE8FF', badge: 'Top nuit' },
]

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'commandes',    label: 'Commandes',     icon: Package },
  { id: 'adresses',    label: 'Adresses',      icon: MapPin },
  { id: 'favoris',     label: 'Favoris',       icon: Heart },
  { id: 'informations',label: 'Mes infos',     icon: User },
]

const statusIcon = (s: string) => {
  if (s === 'livré') return <CheckCircle2 size={14} />
  if (s === 'en transit') return <Truck size={14} />
  return <Clock size={14} />
}

export default function DashboardPage() {
  const { user, isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('commandes')

  useEffect(() => {
    if (!isLoggedIn) router.replace('/mon-compte')
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) return null

  return (
    <>
      <FloatingNav />
      <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', paddingBottom: '140px' }}>

        {/* ── HEADER BANNER */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-primary)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'clamp(var(--space-12), 8vw, var(--space-16)) var(--space-4) var(--space-8)',
            paddingTop: 'calc(clamp(var(--space-12), 8vw, var(--space-16)) + 70px)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              {/* Avatar */}
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                border: '2px solid rgba(255,255,255,0.5)',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                {user.avatar}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>✦ Mon espace</p>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Bonjour, {user.name.split(' ')[0]} !</h1>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', marginTop: 2 }}>{user.email}</p>
              </div>
            </div>
            {/* Fidélité chip */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-full)', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 16 }}>🌿</span>
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Niveau Pousse</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', padding: '4px 12px' }}>
                <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em' }}>320 / 600 pts</span>
              </div>
              {/* Progress bar */}
              <div style={{ width: 120, height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                <div style={{ width: '53%', height: '100%', borderRadius: 9999, background: 'rgba(255,255,255,0.8)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ROW */}
        <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { label: 'Commandes', value: ORDERS.length, icon: ShoppingBag },
              { label: 'Points fidélité', value: '320 pts', icon: Star },
              { label: 'Favoris', value: FAVORITES.length, icon: Heart },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} style={{ padding: 'var(--space-5) var(--space-4)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-1)', borderRight: i < 2 ? '1px solid var(--color-border)' : 'none' }}>
                  <Icon size={18} color="var(--color-primary)" strokeWidth={1.8} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)' }}>{stat.value}</span>
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── TABS NAV */}
        <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(var(--color-bg-rgb, 250,246,240), 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TABS.map(t => {
              const Icon = t.icon
              const isActive = tab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: 'var(--space-4) var(--space-5)',
                    fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    background: 'none', border: 'none',
                    borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'color 150ms, border-color 150ms',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                  {t.label}
                </button>
              )
            })}
            <div style={{ flex: 1 }} />
            <button
              onClick={() => { logout(); router.push('/') }}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-5)',
                fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-text-faint)', background: 'none', border: 'none',
                borderBottom: '2px solid transparent',
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              <LogOut size={15} /> Déconnexion
            </button>
          </div>
        </div>

        {/* ── TAB CONTENT */}
        <div style={{ maxWidth: 'var(--content-default)', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
          <AnimatePresence mode="wait">
            {tab === 'commandes' && (
              <motion.div key="commandes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <TabHeader title="Mes Commandes" subtitle={`${ORDERS.length} commandes passées`} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {ORDERS.map(order => (
                    <div key={order.id} className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700 }}>{order.id}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: order.statusColor, background: `${order.statusColor}18`, border: `1.5px solid ${order.statusColor}40`, borderRadius: 'var(--radius-full)', padding: '3px 10px' }}>
                            {statusIcon(order.status)} {order.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-primary)' }}>{order.total.toFixed(2)}€</span>
                          <ChevronRight size={16} color="var(--color-text-muted)" />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                        {order.items.map(item => (
                          <span key={item} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.06em', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-offset)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>{item}</span>
                        ))}
                      </div>
                      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--color-text-faint)', letterSpacing: '0.06em' }}>{order.date}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'adresses' && (
              <motion.div key="adresses" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <TabHeader title="Mes Adresses" subtitle="Gérez vos adresses de livraison" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: 'var(--space-4)' }}>
                  {ADDRESSES.map(addr => (
                    <div key={addr.id} className="retro-grain" style={{ background: addr.isDefault ? 'var(--color-primary-muted, rgba(1,105,111,0.06))' : 'var(--color-surface)', border: `2px solid ${addr.isDefault ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: addr.isDefault ? '3px 3px 0 var(--color-primary)' : 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          <MapPin size={16} color="var(--color-primary)" />
                          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text)', fontWeight: 600 }}>{addr.label}</span>
                        </div>
                        {addr.isDefault && <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', background: 'rgba(1,105,111,0.1)', border: '1px solid rgba(1,105,111,0.3)', borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>Défaut</span>}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text)', lineHeight: 1.6 }}>
                        <p style={{ fontWeight: 600 }}>{addr.name}</p>
                        <p>{addr.line1}</p>
                        {addr.line2 && <p>{addr.line2}</p>}
                        <p>{addr.city}</p>
                        <p style={{ color: 'var(--color-text-muted)' }}>{addr.country}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-divider)' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', background: 'none', border: '1.5px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', cursor: 'pointer' }}>
                          <Pencil size={11} /> Modifier
                        </button>
                        {!addr.isDefault && (
                          <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-error)', background: 'none', border: '1.5px solid var(--color-error)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', cursor: 'pointer' }}>
                            <Trash2 size={11} /> Supprimer
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Add new address card */}
                  <button style={{ background: 'transparent', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', cursor: 'pointer', color: 'var(--color-text-muted)', transition: 'border-color 150ms, color 150ms', minHeight: 180 }}>
                    <Plus size={24} strokeWidth={1.5} />
                    <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ajouter une adresse</span>
                  </button>
                </div>
              </motion.div>
            )}

            {tab === 'favoris' && (
              <motion.div key="favoris" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <TabHeader title="Mes Favoris" subtitle={`${FAVORITES.length} produits sauvegardés`} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%), 1fr))', gap: 'var(--space-5)' }}>
                  {FAVORITES.map(fav => (
                    <div key={fav.id} className="retro-grain" style={{ background: fav.bgColor, border: '2px solid var(--color-text)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{fav.category}</span>
                        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary)', color: '#fff' }}>{fav.badge}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700, lineHeight: 1.2 }}>{fav.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= Math.round(fav.rating) ? 'var(--color-gold)' : 'none'} color="var(--color-gold)" style={{ opacity: s <= Math.round(fav.rating) ? 1 : 0.25 }} />)}
                        <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 2 }}>{fav.rating}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 900, color: 'var(--color-primary)' }}>dès {fav.price.toFixed(2)}€</span>
                        <Link href="/produits" style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-inverse)', background: 'var(--color-primary)', padding: '7px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-text)', boxShadow: '2px 2px 0 var(--color-text)', textDecoration: 'none' }}>Voir →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 'informations' && (
              <motion.div key="infos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <TabHeader title="Mes Informations" subtitle="Gérez votre profil et vos préférences" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(420px,100%), 1fr))', gap: 'var(--space-6)' }}>
                  {/* Profile card */}
                  <div className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                    <h3 style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✦ Profil</h3>
                    {[
                      { label: 'Prénom', value: 'Anas', type: 'text' },
                      { label: 'Nom', value: 'K.', type: 'text' },
                      { label: 'Email', value: 'anas@kanamaste.fr', type: 'email' },
                      { label: 'Téléphone', value: '+33 6 00 00 00 00', type: 'tel' },
                    ].map(f => (
                      <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                        <label style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{f.label}</label>
                        <input type={f.type} defaultValue={f.value} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', padding: '10px 14px', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-offset)', color: 'var(--color-text)', outline: 'none' }} />
                      </div>
                    ))}
                    <button style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: '#fff', padding: '12px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: '3px 3px 0 var(--color-text)', cursor: 'pointer' }}>Sauvegarder →</button>
                  </div>
                  {/* Security card */}
                  <div className="retro-grain" style={{ background: 'var(--color-surface)', border: '2px solid var(--color-text)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: '3px 3px 0 var(--color-text)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                    <h3 style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✦ Sécurité</h3>
                    {[
                      { label: 'Mot de passe actuel', type: 'password', placeholder: '••••••••' },
                      { label: 'Nouveau mot de passe', type: 'password', placeholder: '••••••••' },
                      { label: 'Confirmer', type: 'password', placeholder: '••••••••' },
                    ].map(f => (
                      <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                        <label style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', padding: '10px 14px', border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-offset)', color: 'var(--color-text)', outline: 'none' }} />
                      </div>
                    ))}
                    <button style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-surface-offset)', color: 'var(--color-text)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-border)', cursor: 'pointer' }}>Changer le mot de passe →</button>
                    <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 'var(--space-4)' }}>
                      <h4 style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>Notifications email</h4>
                      {[
                        { label: 'Confirmation de commande', checked: true },
                        { label: 'Nouvelles offres & promotions', checked: true },
                        { label: 'Actualités Kanamaste', checked: false },
                      ].map(pref => (
                        <label key={pref.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)', cursor: 'pointer' }}>
                          <input type="checkbox" defaultChecked={pref.checked} style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{pref.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

function TabHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✦ Dashboard</span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.15, marginTop: 'var(--space-1)' }}>{title}</h2>
      <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.06em', marginTop: 'var(--space-1)' }}>{subtitle}</p>
    </div>
  )
}
