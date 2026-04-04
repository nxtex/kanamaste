'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import { useAuth } from '@/context/AuthContext';

type Tab = 'login' | 'register';

// ─── Logo SVG inline (retro cannabis leaf) ────────────────────────────────────
function KanaLogo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Kanamaste logo"
      style={{ display: 'block' }}
    >
      {/* outer circle */}
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
      {/* stylised leaf / K mark */}
      <path
        d="M24 36 C24 36 14 28 14 20 C14 14 18 11 24 13 C30 11 34 14 34 20 C34 28 24 36 24 36Z"
        fill="var(--color-primary)"
        opacity="0.9"
      />
      <line x1="24" y1="36" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* vein */}
      <path d="M24 13 L24 32" stroke="#f5f0e8" strokeWidth="1" opacity="0.6" />
      <path d="M24 20 L18 16" stroke="#f5f0e8" strokeWidth="0.8" opacity="0.5" />
      <path d="M24 20 L30 16" stroke="#f5f0e8" strokeWidth="0.8" opacity="0.5" />
      <path d="M24 25 L17 22" stroke="#f5f0e8" strokeWidth="0.8" opacity="0.5" />
      <path d="M24 25 L31 22" stroke="#f5f0e8" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MonComptePage() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');
  const loginRef = useRef<HTMLButtonElement>(null);
  const registerRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, x: 0 });

  // ── Redirect immediately if already logged in ──────────────────────────────
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, router]);

  // ── Animate tab indicator ──────────────────────────────────────────────────
  useEffect(() => {
    const btn = tab === 'login' ? loginRef.current : registerRef.current;
    if (!btn) return;
    setIndicatorStyle({ width: btn.offsetWidth, x: btn.offsetLeft });
  }, [tab]);

  // Init indicator on mount
  useEffect(() => {
    if (loginRef.current) {
      setIndicatorStyle({ width: loginRef.current.offsetWidth, x: loginRef.current.offsetLeft });
    }
  }, []);

  // Don't flash form while redirecting
  if (isLoggedIn) return null;

  return (
    <>
      <FloatingNav />
      <main
        style={{
          minHeight: '100dvh',
          width: '100%',
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          /* nav bar is at bottom ~80px, extra top breathing room */
          paddingTop: 'clamp(48px, 8vw, 80px)',
          paddingBottom: 'clamp(96px, 14vw, 120px)',
          paddingInline: 'var(--space-4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Decorative bg rings ─────────────────────────────────────────── */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-12%', right: '-8%',
            width: 'clamp(260px, 55vw, 520px)', height: 'clamp(260px, 55vw, 520px)',
            borderRadius: '50%', border: '2px solid var(--color-primary)', opacity: 0.06,
          }} />
          <div style={{
            position: 'absolute', bottom: '8%', left: '-6%',
            width: 'clamp(140px, 30vw, 300px)', height: 'clamp(140px, 30vw, 300px)',
            borderRadius: '50%', border: '1.5px solid var(--color-gold)', opacity: 0.07,
          }} />
        </div>

        {/* ── Header / Logo ───────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: 'var(--space-8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-3)',
            textAlign: 'center',
          }}
        >
          {/* Logo wrapper — fixed size, no offset */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '2.5px solid var(--color-text)',
            boxShadow: '3px 3px 0 var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            flexShrink: 0,
          }}>
            <KanaLogo size={48} />
          </div>

          <span style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
          }}>
            &diams;&nbsp;Mon Compte&nbsp;&diams;
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 900,
            color: 'var(--color-text)',
            lineHeight: 1.1,
            margin: 0,
          }}>
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Bienvenue</em>
            {' '}chez Kanamaste
          </h1>
        </motion.header>

        {/* ── Tab switcher ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          style={{ marginBottom: 'var(--space-6)', width: '100%', maxWidth: 520 }}
        >
          <div style={{
            display: 'flex',
            background: 'var(--color-surface-offset)',
            border: '2px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            padding: '4px',
            position: 'relative',
          }}>
            {/* sliding indicator */}
            <motion.div
              animate={{ width: indicatorStyle.width, x: indicatorStyle.x }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              style={{
                position: 'absolute',
                top: 4,
                left: 0,
                height: 'calc(100% - 8px)',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-primary)',
                border: '1.5px solid var(--color-text)',
                boxShadow: '2px 2px 0 var(--color-text)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                ref={t === 'login' ? loginRef : registerRef}
                onClick={() => setTab(t)}
                style={{
                  position: 'relative', zIndex: 1, flex: 1,
                  padding: '10px 0',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-stamp)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                  color: tab === t ? '#f5f0e8' : 'var(--color-text-muted)',
                  transition: 'color 0.18s',
                }}
              >
                {t === 'login' ? 'Connexion' : 'Inscription'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Form card ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="retro-grain"
          style={{
            width: '100%',
            maxWidth: 520,
            background: 'var(--color-surface)',
            border: '2px solid var(--color-text)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '5px 5px 0 var(--color-text)',
            padding: 'clamp(var(--space-6), 5vw, var(--space-10))',
            position: 'relative',
          }}
        >
          {/* corner stamp */}
          <div aria-hidden style={{
            position: 'absolute', top: 14, right: 14,
            width: 44, height: 44, borderRadius: '50%',
            border: '2px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.35,
          }}>
            <span style={{
              fontFamily: 'var(--font-stamp)', fontSize: 7,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textAlign: 'center', lineHeight: 1.4,
              color: 'var(--color-text-muted)',
            }}>CBD<br />SHOP</span>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.2 }}
              >
                <LoginForm
                  onSwitchTab={() => setTab('register')}
                  login={login}
                  router={router}
                />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.2 }}
              >
                <RegisterForm onSwitchTab={() => setTab('login')} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* legal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{
            marginTop: 'var(--space-5)',
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-faint)',
            letterSpacing: '0.06em',
            textAlign: 'center',
            maxWidth: 420,
          }}
        >
          &diams; R&eacute;serv&eacute; aux adultes (+18). Produits l&eacute;gaux &le; 0.3% THC. &diams;
        </motion.p>
      </main>
    </>
  );
}

// ─── Shared form components ────────────────────────────────────────────────────

function RetroField({
  label, icon, children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <label style={{
        fontFamily: 'var(--font-stamp)',
        fontSize: 'var(--text-xs)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span style={{
          position: 'absolute', left: 14,
          color: 'var(--color-primary)',
          display: 'flex', alignItems: 'center',
          pointerEvents: 'none',
        }}>
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

function RetroInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { hasRightButton?: boolean },
) {
  const { hasRightButton, style, onFocus, onBlur, ...rest } = props;
  return (
    <input
      {...rest}
      style={{
        width: '100%',
        height: 52,
        paddingLeft: 44,
        paddingRight: hasRightButton ? 48 : 16,
        background: 'var(--color-surface-offset)',
        border: '2px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-base)',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
        outline: 'none',
        transition: 'border-color 180ms, background 180ms',
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        e.currentTarget.style.background = 'var(--color-surface)';
        onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.background = 'var(--color-surface-offset)';
        onBlur?.(e);
      }}
    />
  );
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({
  onSwitchTab, login, router,
}: {
  onSwitchTab: () => void;
  login: (e: string, p: string) => boolean;
  router: ReturnType<typeof useRouter>;
}) {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // small delay for UX
    setTimeout(() => {
      const ok = login(email.trim(), password);
      if (ok) {
        router.replace('/dashboard');
      } else {
        setError('Identifiants incorrects. Essaie : anas@kanamaste.fr / anas');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <RetroField label="Adresse e-mail" icon={<Mail size={17} />}>
        <RetroInput
          type="email"
          placeholder="anas@kanamaste.fr"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </RetroField>

      <RetroField label="Mot de passe" icon={<Lock size={17} />}>
        <RetroInput
          type={showPwd ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="current-password"
          required
          hasRightButton
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPwd((v) => !v)}
          aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          style={{
            position: 'absolute', right: 14,
            background: 'none', border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', padding: 4,
          }}
        >
          {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </RetroField>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)',
              background: 'rgba(161,44,123,0.07)',
              border: '1.5px solid var(--color-error)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}
          >
            <AlertCircle size={15} color="var(--color-error)" style={{ marginTop: 1, flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-error)',
              letterSpacing: '0.04em',
            }}>
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          href="#"
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.06em',
            color: 'var(--color-primary)',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          Mot de passe oubli&eacute;&nbsp;?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%', height: 52,
          background: loading ? 'var(--color-text-muted)' : 'var(--color-primary)',
          color: '#f5f0e8',
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-md)',
          boxShadow: loading ? 'none' : '3px 3px 0 var(--color-text)',
          fontFamily: 'var(--font-stamp)',
          fontSize: 'var(--text-sm)',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
          transition: 'all 200ms',
          marginTop: 'var(--space-2)',
        }}
      >
        {loading ? (
          <span style={{ display: 'flex', gap: 5 }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#fff',
                  animation: `bounce 0.8s ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </span>
        ) : (
          <>
            Se connecter <ArrowRight size={16} />
          </>
        )}
      </button>

      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-muted)',
      }}>
        Pas encore de compte&nbsp;?{' '}
        <button
          type="button"
          onClick={onSwitchTab}
          style={{
            background: 'none', border: 'none',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            cursor: 'pointer',
          }}
        >
          S&apos;inscrire
        </button>
      </p>
    </form>
  );
}

// ─── Register form ────────────────────────────────────────────────────────────

function RegisterForm({ onSwitchTab }: { onSwitchTab: () => void }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
    >
      <RetroField label="Adresse e-mail" icon={<Mail size={17} />}>
        <RetroInput
          type="email"
          placeholder="votre@email.com"
          autoComplete="email"
          required
        />
      </RetroField>

      <RetroField label="Mot de passe" icon={<Lock size={17} />}>
        <RetroInput
          type={showPwd ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="new-password"
          required
          hasRightButton
        />
        <button
          type="button"
          onClick={() => setShowPwd((v) => !v)}
          aria-label={showPwd ? 'Masquer' : 'Afficher'}
          style={{
            position: 'absolute', right: 14,
            background: 'none', border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', padding: 4,
          }}
        >
          {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </RetroField>

      <RetroField label="Confirmer le mot de passe" icon={<Lock size={17} />}>
        <RetroInput
          type={showConfirm ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="new-password"
          required
          hasRightButton
        />
        <button
          type="button"
          onClick={() => setShowConfirm((v) => !v)}
          aria-label={showConfirm ? 'Masquer' : 'Afficher'}
          style={{
            position: 'absolute', right: 14,
            background: 'none', border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', padding: 4,
          }}
        >
          {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </RetroField>

      <button
        type="submit"
        style={{
          width: '100%', height: 52,
          background: 'var(--color-primary)', color: '#f5f0e8',
          border: '2px solid var(--color-text)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '3px 3px 0 var(--color-text)',
          fontFamily: 'var(--font-stamp)',
          fontSize: 'var(--text-sm)',
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
          marginTop: 'var(--space-2)',
        }}
      >
        Cr&eacute;er mon compte <ArrowRight size={16} />
      </button>

      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-muted)',
      }}>
        D&eacute;j&agrave; un compte&nbsp;?{' '}
        <button
          type="button"
          onClick={onSwitchTab}
          style={{
            background: 'none', border: 'none',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-stamp)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            cursor: 'pointer',
          }}
        >
          Se connecter
        </button>
      </p>
    </form>
  );
}
