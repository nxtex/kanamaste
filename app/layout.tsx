import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Kanamaste — CBD Artisanal Français',
  description: 'Fleurs, résines et huiles CBD sélectionnées à la main. Qualité artisanale, sourcing responsable.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
