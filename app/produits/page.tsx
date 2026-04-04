import { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { MorphingProductStack } from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Boutique CBD',
  description: "Découvrez notre sélection de fleurs, résines et huiles CBD artisanales.",
}

const products = [
  {
    id: 'amnesia-haze',
    name: 'Amnesia Haze CBD',
    category: 'Fleur · Suîsse',
    description: "Saveur citronnée vive, effet aérien et stimulant.",
    longDescription: "L'Amnesia Haze CBD est une variété sativa dominante aux arômes d'agrumes, de terre et d'herbes fraîches. Son profil de terpènes riche en limonène lui confère un effet tonifiant et stimulant, parfait pour une journée active ou une session créative. Cultivée en serre solaire, séchée lentement pour préserver tous ses arômes naturels.",
    intensity: 3,
    flavours: ['Citron', 'Herbe fraîche', 'Agrumes'],
    feeling: ['Éveillé', 'Créatif', 'Léger'],
    rating: 4.7, reviewCount: 138,
    priceOptions: [{ grams: 2, price: 9.9 }, { grams: 5, price: 22.9 }, { grams: 10, price: 39.9 }],
    image: 'https://picsum.photos/seed/amnesia-haze-cbd/600/400',
    badge: 'Bestseller', badgeColor: '#16a34a', bgColor: '#F0EAFF',
    cbdPercent: 'CBD 14%',
  },
  {
    id: 'hash-maroc-premium',
    name: 'Hash Marocain Premium',
    category: 'Résine · Artisanal',
    description: "Résine pressée à la main, arômes épicés et terreux.",
    longDescription: "Ce hash d'inspiration marocaine est élaboré à partir de fleurs CBD soigneusement sélectionnées, pressées à la main selon des méthodes traditionnelles. Ses notes épicées et boisées, riches en myrcène et béta-caryophyllène, offrent une expérience relaxante profonde.",
    intensity: 4,
    flavours: ['Épices', 'Bois', 'Fumé'],
    feeling: ['Détendu', 'Apaisé', 'Serein'],
    rating: 4.5, reviewCount: 87,
    priceOptions: [{ grams: 3, price: 14.9 }, { grams: 7, price: 31.9 }, { grams: 14, price: 55.9 }],
    image: 'https://picsum.photos/seed/hash-maroc-cbd/600/400',
    badge: 'Nouveau', badgeColor: '#db2777', bgColor: '#FFF0F6',
    cbdPercent: 'CBD 22%',
  },
  {
    id: 'huile-full-spectrum',
    name: 'Huile Full Spectrum 10%',
    category: 'Huile · CO₂',
    description: "Extrait CO₂ à spectre complet, 10% CBD, base MCT bio.",
    longDescription: "Notre huile Full Spectrum 10% est extraite au CO₂ supercritique pour préserver la totalité des cannaabinoïdes, terpènes et flavonoïdes naturels de la plante. L'effet d'entourage amplifie les bienfaits du CBD, offrant une action plus complète et harmonieuse. Base MCT biologique, THC < 0.2%.",
    intensity: 2,
    flavours: ['Chanvre naturel', 'Noix de coco', 'Terreux doux'],
    feeling: ['Équilibré', 'Anti-stress', 'Bien-être'],
    rating: 4.9, reviewCount: 214,
    priceOptions: [{ grams: 10, price: 34.9 }, { grams: 30, price: 79.9 }],
    image: 'https://picsum.photos/seed/huile-cbd-full/600/400',
    badge: 'Recommandé', badgeColor: '#0891b2', bgColor: '#E8FBF8',
    cbdPercent: 'CBD 10%',
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights CBD',
    category: 'Fleur · Indica',
    description: "Indica légendaire, arômes sucrés et résineux.",
    longDescription: "La Northern Lights CBD est une indica pure aux arômes doux de pin, de terre et de sucre. Son profil terpénique dominé par le linalool et le myrcène en fait une alliée de choix contre les tensions musculaires et le stress du quotidien. Fleurs cultivées en intérieur, denses et résineuses.",
    intensity: 5,
    flavours: ['Pin', 'Sucré', 'Miel'],
    feeling: ['Relaxant', 'Corps lourd', 'Sommeil'],
    rating: 4.6, reviewCount: 96,
    priceOptions: [{ grams: 2, price: 11.9 }, { grams: 5, price: 26.9 }, { grams: 10, price: 46.9 }],
    image: 'https://picsum.photos/seed/northern-lights-cbd/600/400',
    badge: 'Top nuit', badgeColor: '#7c3aed', bgColor: '#EDE8FF',
    cbdPercent: 'CBD 18%',
  },
  {
    id: 'cbd-charas',
    name: 'Charas CBD Artisanal',
    category: 'Résine · Himalaya',
    description: "Pétri à la main sur fleurs fraîches. Arômes de rose et cèdre.",
    longDescription: "Le Charas CBD est élaboré selon la méthode himalayéenne ancestrale — roulé à la main sur les têtes fraîches de chanvre CBD. Cette technique préserve les terpènes les plus volatils, donnant un profil aromatique incomparable : rose, bois, épices douces et cèdre.",
    intensity: 3,
    flavours: ['Rose', 'Cèdre', 'Floral'],
    feeling: ['Euphorie douce', 'Créatif', 'Apaisé'],
    rating: 4.8, reviewCount: 52,
    priceOptions: [{ grams: 2, price: 16.9 }, { grams: 5, price: 38.9 }],
    image: 'https://picsum.photos/seed/charas-cbd-artisan/600/400',
    badge: 'Artisanal', badgeColor: '#db2777', bgColor: '#FFF0F5',
    cbdPercent: 'CBD 16%',
  },
  {
    id: 'huile-sommeil',
    name: 'Huile Sommeil 15% + Mélatonine',
    category: 'Huile · Nuit',
    description: "Formule nuit : CBD 15%, mélatonine et lavande.",
    longDescription: "Conçue pour le rituel du soir, cette huile associe un extrait CBD large spectre à 15% avec 0.5mg de mélatonine par dose et une infusion de lavande vraie. Le trio agit en synergie pour faciliter l'endormissement et réduire les réveils nocturnes. THC < 0.2%.",
    intensity: 1,
    flavours: ['Lavande', 'Floral', 'Chanvre doux'],
    feeling: ['Endormissement', 'Sommeil profond', 'Apaisement'],
    rating: 4.8, reviewCount: 173,
    priceOptions: [{ grams: 10, price: 44.9 }, { grams: 30, price: 99.9 }],
    image: 'https://picsum.photos/seed/huile-sommeil-lavande/600/400',
    badge: 'Nuit', badgeColor: '#7c3aed', bgColor: '#EDE8FF',
    cbdPercent: 'CBD 15%',
  },
]

export default function ProduitsPage() {
  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: '140px' }}>
        <section
          className="retro-grain retro-grid-bg"
          style={{
            background: 'var(--color-surface)',
            borderBottom: '2px solid var(--color-border)',
            padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)',
            paddingTop: 'calc(clamp(var(--space-10), 7vw, var(--space-16)) + 70px)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <nav aria-label="Fil d'ariane" style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Accueil</Link>
              <span style={{ color: 'var(--color-text-faint)', fontSize: 'var(--text-xs)' }}>›</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-primary)' }}>Boutique</span>
            </nav>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>❖ {products.length} produits ❖</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, lineHeight: 1.05, color: 'var(--color-text)' }}>La <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>boutique</em></h1>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch', lineHeight: 1.6 }}>Fleurs, résines et huiles CBD sélectionnées pour leur qualité et leurs arômes d&apos;exception.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {['❖ Biologique', '◆ THC < 0.3%', '★ Livraison 24h'].map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', padding: '5px 12px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-muted)', color: 'var(--color-primary)', letterSpacing: '0.06em' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
          <MorphingProductStack products={products} defaultLayout="stack" />
        </section>

        <section style={{ background: 'var(--color-primary)', padding: 'var(--space-5) var(--space-4)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '❖', label: 'Naturel & Biologique' },
              { icon: '◆', label: 'Sans THC détectable' },
              { icon: '★', label: 'Livraison offerte dès 40€' },
              { icon: '♟', label: 'Test Laboratoire' },
            ].map(item => (
              <span key={item.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 14, opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
