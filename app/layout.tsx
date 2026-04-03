import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kanamaste — CBD Naturel & Bien-être',
    template: '%s | Kanamaste',
  },
  description: 'Kanamaste — Fleurs, résines et huiles CBD d’exception. Qualité artisanale, sourcing responsable.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
