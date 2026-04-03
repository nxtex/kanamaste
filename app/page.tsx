import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="relative z-10 text-center space-y-4 px-4">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={220}
            height={80}
            priority
            className="object-contain"
          />
        </div>
        <p className="text-white/60">Un espace pour tester des choses</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-[#ff9900] text-black rounded-lg font-medium hover:bg-[#ff9900]/90 transition-colors"
          >
            Se connecter →
          </Link>
          <Link
            href="/signup"
            className="inline-block px-6 py-2 bg-white/5 text-white border border-white/10 rounded-lg font-medium hover:bg-white/10 hover:border-white/20 transition-colors"
          >
            S&apos;inscrire
          </Link>
          <Link
            href="/payment"
            className="inline-block px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/80 transition-colors"
          >
            Paiement 💳
          </Link>
        </div>
      </div>
    </main>
  );
}
