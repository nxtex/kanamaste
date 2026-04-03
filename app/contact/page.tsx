import { Metadata } from 'next'
import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'

export const metadata: Metadata = {
  title: 'Contact — Kanamaste',
  description: 'Contactez l\'équipe Kanamaste pour toute question sur nos produits CBD.',
}

export default function ContactPage() {
  return (
    <>
      <FloatingNav />
      <main style={{ paddingBottom: 'calc(var(--nav-height) + 80px)' }}>

        {/* ── HEADER */}
        <section
          className="retro-grain"
          style={{
            background: 'var(--color-primary)',
            borderBottom: '2px solid var(--color-text)',
            padding: 'clamp(var(--space-16), 10vw, var(--space-24)) var(--space-4) clamp(var(--space-10), 6vw, var(--space-16))',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 'var(--content-narrow)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,253,249,0.6)' }}>◆ Nous écrire ◆</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text-inverse)', lineHeight: 1.1 }}>
              Nous <em style={{ fontStyle: 'italic', color: 'var(--color-lavande)' }}>contacter</em>
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(245,240,232,0.75)', maxWidth: '44ch', lineHeight: 1.65 }}>
              Une question sur nos produits, une commande ou un partenariat ? Notre équipe répond sous 24h.
            </p>
          </div>
        </section>

        {/* ── EXPERT WHATSAPP CARD */}
        <section style={{ padding: 'clamp(var(--space-8), 5vw, var(--space-12)) var(--space-4)', maxWidth: 'var(--content-narrow)', margin: '0 auto' }}>
          <div style={{
            background: '#128C7E',
            border: '2px solid var(--color-text)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6) var(--space-6)',
            boxShadow: '4px 4px 0 var(--color-text)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              {/* WhatsApp icon SVG */}
              <div style={{
                flexShrink: 0,
                width: 52, height: 52,
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>Conseil personnalisé</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>
                  Nous contacter<br />
                  <em style={{ fontStyle: 'italic', color: '#dcf8c6' }}>Un expert te guide.</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  Lundi – Samedi  ·  9h00 – 18h00
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                fontFamily: 'var(--font-stamp)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#fff',
                color: '#075E54',
                padding: '13px 28px',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                alignSelf: 'flex-start',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#128C7E" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Discuter avec un expert →
            </a>
          </div>
        </section>

        {/* ── FORM */}
        <section style={{ padding: '0 var(--space-4) clamp(var(--space-10), 6vw, var(--space-16))', maxWidth: 'var(--content-narrow)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>✶ Ou écris-nous</span>
          </div>
          <form
            style={{
              background: 'var(--color-surface)',
              border: '2px solid var(--color-text)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
            }}
          >
            {[{ id: 'name', label: 'Nom complet', type: 'text', placeholder: 'Marie Dubois' }, { id: 'email', label: 'Email', type: 'email', placeholder: 'marie@exemple.fr' }].map((field) => (
              <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label htmlFor={field.id} style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{field.label}</label>
                <input
                  id={field.id} type={field.type} placeholder={field.placeholder}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', padding: '12px var(--space-4)', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none', transition: 'border-color var(--transition)' }}
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
                id="message" rows={5} placeholder="Votre message..."
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', padding: '12px var(--space-4)', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none', resize: 'vertical', minHeight: 120 }}
              />
            </div>
            <button
              type="submit"
              style={{ fontFamily: 'var(--font-stamp)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-primary)', color: 'var(--color-text-inverse)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-text)', boxShadow: 'var(--shadow-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}
            >
              Envoyer le message &#10148;
            </button>
          </form>
        </section>

        {/* ── FOOTER */}
        <footer style={{ background: 'var(--color-surface-offset)', borderTop: '2px solid var(--color-border)', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'var(--text-lg)', color: 'var(--color-primary)', fontWeight: 400, textDecoration: 'none' }}>Kanamaste</Link>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', fontFamily: 'var(--font-stamp)', letterSpacing: '0.06em' }}>&copy; {new Date().getFullYear()} Kanamaste. Produits légaux ≤ 0.3% THC. Réservé aux adultes.</p>
          </div>
        </footer>
      </main>
    </>
  )
}
