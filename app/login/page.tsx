'use client';
import { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Starfield } from '@/components/Starfield';
import { Input } from '@/components/ui/Input';

const BORDER_SIDES = ['top', 'right', 'bottom', 'left'] as const;
type Side = typeof BORDER_SIDES[number];

const BORDER_SIDE_CLASSES: Record<Side, string> = {
  top:    'top-0 left-0 h-[2px] w-[50%] bg-gradient-to-r',
  right:  'top-0 right-0 h-[50%] w-[2px] bg-gradient-to-b',
  bottom: 'bottom-0 right-0 h-[2px] w-[50%] bg-gradient-to-r',
  left:   'bottom-0 left-0 h-[50%] w-[2px] bg-gradient-to-b',
};

const BORDER_ANIM_KEY: Record<Side, string> = {
  top: 'left', right: 'top', bottom: 'right', left: 'bottom',
};

const CardBorderGlow = memo(function CardBorderGlow() {
  return (
    <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
      {BORDER_SIDES.map((side, i) => (
        <motion.div
          key={side}
          className={cn(
            'absolute from-transparent via-white to-transparent opacity-70',
            BORDER_SIDE_CLASSES[side]
          )}
          animate={{
            [BORDER_ANIM_KEY[side]]: ['-50%', '100%'],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div
      className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <Starfield
        starColor="rgba(255,153,0,0.8)"
        bgColor="rgba(10,10,10,1)"
        speed={0.6}
        quantity={350}
        mouseAdjust
        opacity={1}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-black/15 via-black/5 to-black/10 blur-sm" />
            <CardBorderGlow />

            <div
              className="relative rounded-2xl p-6 shadow-2xl overflow-hidden"
              style={{
                background: 'rgba(0,0,0,0.01)',
                backdropFilter: 'blur(6px) saturate(20%)',
                WebkitBackdropFilter: 'blur(6px) saturate(20%)',
                border: '1px solid rgba(0,0,0,0.01)',
                boxShadow: 'rgba(0,0,0,0.6) 0px 8px 32px, rgba(0,0,0,0.01) 0px 1px 0px inset',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent" />

              <div className="text-center space-y-1 mb-5">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                >
                  Bon retour
                </motion.h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <motion.div
                    className={`relative ${focusedInput === 'email' ? 'z-10' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="relative flex items-center overflow-hidden rounded-lg">
                      <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === 'email' ? 'text-white' : 'text-white/40'}`} />
                      <Input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        autoComplete="email"
                        required
                        className="bg-white/5 border-transparent focus:border-white/20 h-10 pl-10 pr-3 focus:bg-white/10"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className={`relative ${focusedInput === 'password' ? 'z-10' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="relative flex items-center overflow-hidden rounded-lg">
                      <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === 'password' ? 'text-white' : 'text-white/40'}`} />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        autoComplete="current-password"
                        required
                        className="bg-white/5 border-transparent focus:border-white/20 h-10 pl-10 pr-10 focus:bg-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 cursor-pointer text-white/40 hover:text-white transition-colors duration-300"
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      >
                        {showPassword
                          ? <Eye className="w-4 h-4" />
                          : <EyeClosed className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe((v) => !v)}
                        className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-white checked:border-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
                      />
                      {rememberMe && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center text-black pointer-events-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </motion.div>
                      )}
                    </div>
                    <label htmlFor="remember-me" className="text-xs text-white/60 hover:text-white/80 transition-colors duration-200 cursor-pointer">
                      Se souvenir de moi
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-xs text-white/60 hover:text-white transition-colors duration-200">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group/button mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" style={{ backgroundColor: 'rgba(255,153,0,0.3)' }} />
                  <div className="relative overflow-hidden text-black font-medium h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ff9000' }}>
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="w-4 h-4 border-2 border-black/70 border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-sm font-medium">
                          Se connecter <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                <div className="relative mt-2 mb-5 flex items-center">
                  <div className="flex-grow border-t border-white/5" />
                  <span className="mx-3 text-xs text-white/40">ou</span>
                  <div className="flex-grow border-t border-white/5" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full relative group/google"
                >
                  <div className="relative overflow-hidden bg-white/5 text-white font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-white/80">G</div>
                    <span className="text-white/80 group-hover/google:text-white transition-colors text-xs">Se connecter avec Google</span>
                  </div>
                </motion.button>

                <motion.p
                  className="text-center text-xs text-white/60 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Pas encore de compte ?{' '}
                  <Link href="/signup" className="relative inline-block group/signup">
                    <span className="relative z-10 text-white group-hover/signup:text-white/70 transition-colors duration-300 font-medium">S&apos;inscrire</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover/signup:w-full transition-all duration-300" />
                  </Link>
                </motion.p>

                <p className="text-center text-[10px] text-white/25 mt-2">
                  En vous connectant, vous acceptez notre{' '}
                  <Link href="/politique-de-confidentialite" className="text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors duration-200">
                    politique de confidentialité
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
