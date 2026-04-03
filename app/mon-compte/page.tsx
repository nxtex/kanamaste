'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeClosed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Starfield } from '@/components/Starfield';

type Tab = 'login' | 'register';

export default function MonComptePage() {
  const [tab, setTab] = useState<Tab>('login');
  const loginRef = useRef<HTMLButtonElement>(null);
  const registerRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, x: 0 });

  useEffect(() => {
    const btn = tab === 'login' ? loginRef.current : registerRef.current;
    if (!btn) return;
    setIndicatorStyle({ width: btn.offsetWidth, x: btn.offsetLeft - 4 });
  }, [tab]);

  // Init on mount
  useEffect(() => {
    if (loginRef.current) setIndicatorStyle({ width: loginRef.current.offsetWidth, x: 0 });
  }, []);

  return (
    <div
      className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center px-4"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <Starfield starColor="rgba(255,153,0,0.8)" bgColor="rgba(10,10,10,1)" speed={0.6} quantity={350} mouseAdjust opacity={1} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px',
            padding: '4px',
            position: 'relative',
          }}>
            {/* Sliding indicator */}
            <motion.div
              animate={{ width: indicatorStyle.width, x: indicatorStyle.x }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                position: 'absolute',
                top: 4,
                left: 0,
                height: 'calc(100% - 8px)',
                borderRadius: '999px',
                background: '#ff9900',
                zIndex: 0,
              }}
            />
            <button
              ref={loginRef}
              onClick={() => setTab('login')}
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '0.45rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                color: tab === 'login' ? '#000' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.25s',
                outline: 'none',
              }}
            >
              Connexion
            </button>
            <button
              ref={registerRef}
              onClick={() => setTab('register')}
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '0.45rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                color: tab === 'register' ? '#000' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.25s',
                outline: 'none',
              }}
            >
              Inscription
            </button>
          </div>
        </div>

        {/* Glass box */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px) saturate(20%)',
          WebkitBackdropFilter: 'blur(12px) saturate(20%)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
          padding: '1.75rem',
          position: 'relative',
        }}>
          {/* Top shine */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', pointerEvents: 'none' }} />

          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.div key="login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                <LoginForm onSwitchTab={() => setTab('register')} />
              </motion.div>
            ) : (
              <motion.div key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                <RegisterForm onSwitchTab={() => setTab('login')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function LoginForm({ onSwitchTab }: { onSwitchTab: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <form className="space-y-4">
      <Field label="Identifiant ou e-mail" icon={<Mail className="w-4 h-4" />}>
        <Input type="email" placeholder="votre@email.com" autoComplete="email" required className="bg-white/5 border-transparent focus:border-white/20 h-10 pl-10 focus:bg-white/10" />
      </Field>
      <Field label="Mot de passe" icon={<Lock className="w-4 h-4" />}>
        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" autoComplete="current-password" required className="bg-white/5 border-transparent focus:border-white/20 h-10 pl-10 pr-10 focus:bg-white/10" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-white/40 hover:text-white transition-colors">
          {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
        </button>
      </Field>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="accent-[#ff9900] w-3.5 h-3.5" />
          <span className="text-xs text-white/50">Se souvenir de moi</span>
        </label>
        <Link href="/forgot-password" className="text-xs text-white/40 hover:text-white/80 transition-colors">Mot de passe oublié ?</Link>
      </div>
      <SubmitButton>Se connecter</SubmitButton>
      <p className="text-center text-xs text-white/40 pt-1">
        Pas encore de compte ?{' '}
        <button type="button" onClick={onSwitchTab} className="text-white hover:text-white/70 font-medium underline underline-offset-2 transition-colors">S&apos;inscrire</button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitchTab }: { onSwitchTab: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-4">
      <Field label="Adresse e-mail" icon={<Mail className="w-4 h-4" />}>
        <Input type="email" placeholder="votre@email.com" autoComplete="email" required className="bg-white/5 border-transparent focus:border-white/20 h-10 pl-10 focus:bg-white/10" />
      </Field>
      <Field label="Mot de passe" icon={<Lock className="w-4 h-4" />}>
        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" autoComplete="new-password" required className="bg-white/5 border-transparent focus:border-white/20 h-10 pl-10 pr-10 focus:bg-white/10" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-white/40 hover:text-white transition-colors">
          {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
        </button>
      </Field>
      <SubmitButton>S&apos;inscrire</SubmitButton>
      <p className="text-center text-xs text-white/40 pt-1">
        Déjà un compte ?{' '}
        <button type="button" onClick={onSwitchTab} className="text-white hover:text-white/70 font-medium underline underline-offset-2 transition-colors">Se connecter</button>
      </p>
    </form>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-[0.7rem] font-medium uppercase tracking-widest text-white/45">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-white/40">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="w-full h-10 rounded-lg font-semibold text-sm text-black cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98]" style={{ background: '#ff9900' }}>
      {children}
    </button>
  );
}
