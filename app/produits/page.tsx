import { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { MorphingProductStack } from '@/components/ProductCard'

export const metadata: Metadata = {
  title: 'Boutique CBD',
  description: 'Découvrez notre sélection de fleurs, résines et huiles CBD artisanales. Qualité premium, sourcing responsable.',
}

const products = [
  {
    id: 'amnesia-haze',
    name: 'Amnesia Haze CBD',
    category: 'Fleur',
    description: 'Saveur citronnée vive, effet aérien et stimulant. Idéale pour la créativité et la légèreté.',
    longDescription:
      "L'Amnesia Haze CBD est une variété sativa dominante aux arômes d'agrumes, de terre et d'herbes fraîches. Son profil de terpènes riche en limonène lui confère un effet tonifiant et stimulant, parfait pour une journée active ou une session créative. Cultivée en serre solaire, séchée lentement pour préserver tous ses arômes naturels.",
    intensity: 3,
    flavours: ['Citron', 'Herbe fraîche', 'Terre', 'Agrumes'],
    feeling: ['Éveillé', 'Créatif', 'Léger'],
    rating: 4.7,
    reviewCount: 138,
    priceOptions: [
      { grams: 2, price: 9.9 },
      { grams: 5, price: 22.9 },
      { grams: 10, price: 39.9 },
    ],
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7b8a6c4e?w=600&q=80',
    badge: 'Bestseller',
    badgeColor: 'var(--color-primary)',
    bgColor: '#eaf4e8',
  },
  {
    id: 'hash-maroc-premium',
    name: 'Hash Marocain Premium',
    category: 'Résine',
    description: 'Résine pressée à la main, arômes épicés et terreux. Un classique revisité en CBD.',
    longDescription:
      "Ce hash d'inspiration marocaine est élaboré à partir de fleurs CBD soigneusement sélectionnées, pressées à la main selon des méthodes traditionnelles. Ses notes épicées et boisées, riches en myrcène et béta-caryophyllène, offrent une expérience relaxante profonde. Idéal pour le soir ou les moments de détente absolue.",
    intensity: 4,
    flavours: ['Épices', 'Bois', 'Terre', 'Fumé'],
    feeling: ['Détendu', 'Apaisé', 'Serein'],
    rating: 4.5,
    reviewCount: 87,
    priceOptions: [
      { grams: 3, price: 14.9 },
      { grams: 7, price: 31.9 },
      { grams: 14, price: 55.9 },
    ],
    image: 'https://images.unsplash.com/photo-1579722820647-f5cc15461ba6?w=600&q=80',
    badge: 'Nouveau',
    badgeColor: 'var(--color-gold)',
    bgColor: '#f4ede0',
  },
  {
    id: 'huile-full-spectrum',
    name: 'Huile Full Spectrum 10%',
    category: 'Huile',
    description: 'Extrait CO₂ à spectre complet, 10% CBD, base MCT bio. L'effet d'entourage au naturel.',
    longDescription:
      "Notre huile Full Spectrum 10% est extraite au CO₂ supercritique pour préserver la totalité des cannabinoïdes, terpènes et flavonoïdes naturels de la plante. L'effet d'entourage amplifie les bienfaits du CBD, offrant une action plus complète et harmonieuse. Base d'huile MCT biologique pour une absorption optimale. Certifiée THC < 0.2%.",
    intensity: 2,
    flavours: ['Chanvre naturel', 'Noix de coco', 'Terreux doux'],
    feeling: ['Équilibré', 'Anti-stress', 'Bien-être'],
    rating: 4.9,
    reviewCount: 214,
    priceOptions: [
      { grams: 10, price: 34.9 },
      { grams: 30, price: 79.9 },
    ],
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
    badge: 'Recommandé',
    badgeColor: 'var(--color-terracotta)',
    bgColor: '#fdf0d8',
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights CBD',
    category: 'Fleur',
    description: 'Indica légendaire, arômes sucrés et résineux. Relaxation profonde du corps.',
    longDescription:
      "La Northern Lights CBD est une indica pure aux arômes doux de pin, de terre et de sucre. Son profil terpénique dominé par le linalool et le myrcène en fait une alliée de choix contre les tensions musculaires et le stress du quotidien. Fleurs cultivées en intérieur, denses et généreusement résineuses.",
    intensity: 5,
    flavours: ['Pin', 'Sucré', 'Résine', 'Miel'],
    feeling: ['Relaxant', 'Corps lourd', 'Sommeil'],
    rating: 4.6,
    reviewCount: 96,
    priceOptions: [
      { grams: 2, price: 11.9 },
      { grams: 5, price: 26.9 },
      { grams: 10, price: 46.9 },
    ],
    image: 'https://images.unsplash.com/photo-1611785684723-4d0c1a80f4c7?w=600&q=80',
    badge: 'Top nuit',
    badgeColor: '#4a3b8c',
    bgColor: '#ede8f5',
  },
  {
    id: 'cbd-charas',
    name: 'Charas CBD Artisanal',
    category: 'Résine',
    description: 'Pétri à la main sur fleurs fraîches. Arômes de rose, de bois et de cèdre.',
    longDescription:
      "Le Charas CBD est élaboré selon la méthode himalayenne ancestrale — roulé à la main sur les têtes fraîches de chanvre CBD. Cette technique préserve les terpènes les plus volatils, donnant un profil aromatique incomparable : rose, bois, épices douces et cèdre. Une pièce d'artisanat véritable pour les connaisseurs.",
    intensity: 3,
    flavours: ['Rose', 'Cèdre', 'Épices douces', 'Floral'],
    feeling: ['Euphorie douce', 'Créatif', 'Apaisé'],
    rating: 4.8,
    reviewCount: 52,
    priceOptions: [
      { grams: 2, price: 16.9 },
      { grams: 5, price: 38.9 },
    ],
    image: 'https://images.unsplash.com/photo-1529066792305-5e3b4d1b4d68?w=600&q=80',
    badge: 'Artisanal',
    badgeColor: 'var(--color-terracotta)',
    bgColor: '#fdeee8',
  },
  {
    id: 'huile-sommeil',
    name: 'Huile Sommeil 15% + Mélatonine',
    category: 'Huile',
    description: 'Formule nuit enrichie en CBD 15%, mélatonine et lavande. Retrouvez un sommeil naturel.',
    longDescription:
      "Conçue spécialement pour le rituel du soir, cette huile associe un extrait CBD large spectre à 15% avec 0.5mg de mélatonine par dose et une infusion de lavande vraie. Le trio agit en synergie pour faciliter l'endormissement, améliorer la qualité du sommeil et réduire les réveils nocturnes. Goût doux et floral. THC < 0.2%.",
    intensity: 1,
    flavours: ['Lavande', 'Floral', 'Chanvre doux'],
    feeling: ['Endormissement', 'Sommeil profond', 'Apaisement'],
    rating: 4.8,
    reviewCount: 173,
    priceOptions: [
      { grams: 10, price: 44.9 },
      { grams: 30, price: 99.9 },
    ],
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80',
    badge: 'Nuit',
    badgeColor: '#2d3a6b',
    bgColor: '#e8ecf8',
  },
]

export default function ProduitsPage() {
  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height) + 80px)' }}>

        {/* ─── PAGE HEADER ─── */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-surface-offset)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Breadcrumb */}
            <nav aria-label="Fil d\'ariane" style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Link href="/" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Accueil</Link>
              <span style={{ color: 'var(--color-text-faint)', fontSize: 'var(--text-xs)' }}>›</span>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', color: 'var(--color-primary)' }}>Boutique</span>
            </nav>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <span style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}>&#9670; {products.length} produits &#9670;</span>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: 'var(--color-text)',
                }}>
                  La <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>boutique</em>
                </h1>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '52ch', lineHeight: 1.6 }}>
                  Fleurs, résines et huiles CBD sélectionnées pour leur qualité et leurs arômes d'exception. Tous nos produits sont testés en laboratoire indépendant.
                </p>
              </div>

              {/* Trust signals */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {[
                  '&#9752; Biologique',
                  '&#9670; THC &lt; 0.3%',
                  '&#10022; Livraison 24h',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="badge"
                    style={{
                      fontFamily: 'var(--font-stamp)',
                      color: 'var(--color-primary)',
                      borderColor: 'var(--color-primary)',
                      padding: '6px 12px',
                    }}
                    dangerouslySetInnerHTML={{ __html: tag }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT STACK ─── */}
        <section
          style={{
            padding: 'clamp(var(--space-10), 7vw, var(--space-16)) var(--space-4)',
            maxWidth: 'var(--content-wide)',
            margin: '0 auto',
          }}
        >
          <MorphingProductStack products={products} defaultLayout="grid" />
        </section>

        {/* ─── FOOTER BAND ─── */}
        <section
          style={{
            background: 'var(--color-gold)',
            borderTop: '2px solid var(--color-text)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'var(--space-5) var(--space-4)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex',
            gap: 'var(--space-8)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {[
              { icon: '&#9752;', label: 'Naturel & Biologique' },
              { icon: '&#9670;', label: 'Sans THC détectable' },
              { icon: '&#10022;', label: 'Livraison offerte dès 40€' },
              { icon: '&#9820;', label: 'Test Laboratoire' },
            ].map((item) => (
              <span
                key={item.label}
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: item.icon }} style={{ fontSize: 16 }} />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer
          style={{
            background: 'var(--color-surface-offset)',
            borderTop: '2px solid var(--color-border)',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          <div style={{
            maxWidth: 'var(--content-wide)',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-primary)',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >Kanamaste</Link>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-faint)',
              fontFamily: 'var(--font-stamp)',
              letterSpacing: '0.06em',
            }}>
              &copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
