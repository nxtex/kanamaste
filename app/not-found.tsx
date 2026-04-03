import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#0a0a0a' }}>
      <p className="text-[#ff9900] text-sm font-medium tracking-widest uppercase">404</p>
      <h1 className="text-white text-3xl font-bold">Page introuvable</h1>
      <p className="text-white/50 text-sm">La page que vous cherchez n&apos;existe pas.</p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 bg-[#ff9900] text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
