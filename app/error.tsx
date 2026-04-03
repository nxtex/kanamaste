'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#0a0a0a' }}>
      <h1 className="text-white text-2xl font-bold">Une erreur est survenue</h1>
      <p className="text-white/50 text-sm">{error.message || 'Erreur inattendue'}</p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#ff9900] text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
