import { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe Kanamaste pour toute question sur nos produits CBD.',
}

export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height) + 80px)' }}>
        {/* Header */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-primary)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'clamp(var(--space-12), 8vw, var(--space-20)) var(--space-4)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-gold-light)' }}>&#9670; Nous écrire &#9670;</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--color-text-inverse)', lineHeight: 1.1 }}>
              <em style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>Contact</em>
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(245,240,232,0.72)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Une question sur nos produits, une commande ou un partenariat ? Notre équipe répond sous 24h.
            </p>
          </div>
        </section>

        {/* Form */}
        <section style={{ padding: 'clamp(var(--space-10), 6vw, var(--space-16)) var(--space-4)', maxWidth: 'var(--content-narrow)', margin: '0 auto' }}>
          <form
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-text)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
            }}
          >
            {[{ id: 'name', label: 'Nom complet', type: 'text', placeholder: 'Marie Dubois' }, { id: 'email', label: 'Email', type: 'email', placeholder: 'marie@exemple.fr' }].map((field) => (
              <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label htmlFor={field.id} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{field.label}</label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    padding: '12px var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    transition: 'border-color var(--transition)',
                  }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label htmlFor="sujet" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Sujet</label>
              <select id="sujet" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', padding: '12px var(--space-4)', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none' }}>
                <option>Question produit</option>
                <option>Commande / livraison</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label htmlFor="message" style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Message</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Votre message..."
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', padding: '12px var(--space-4)', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none', resize: 'vertical', minHeight: 120 }}
              />
            </div>
            <button
              type="submit"
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--color-text)',
                boxShadow: 'var(--shadow-card)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
              }}
            >
              Envoyer le message &#10148;
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Kanamaste</Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.06em' }}>&copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
