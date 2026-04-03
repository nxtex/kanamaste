'use client';

import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Starfield } from '@/components/Starfield';

/* ── Border glow ────────────────────────────────────────── */
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
          className={`absolute from-transparent via-white to-transparent opacity-70 ${BORDER_SIDE_CLASSES[side]}`}
          animate={{ [BORDER_ANIM_KEY[side]]: ['-50%', '100%'], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1, delay: i * 0.6 }}
        />
      ))}
    </div>
  );
});

/* ── Card helpers ────────────────────────────────────────── */
type CardType = 'amex' | 'visa' | 'mastercard' | 'discover' | 'unknown';

function detectCardType(num: string): CardType {
  const n = num.replace(/\s/g, '');
  if (/^3[47]/.test(n))           return 'amex';
  if (/^4/.test(n))               return 'visa';
  if (/^5[1-5]|^2[2-7]/.test(n)) return 'mastercard';
  if (/^6011|^65/.test(n))        return 'discover';
  return 'unknown';
}

function formatCardNumber(val: string, type: CardType): string {
  const digits = val.replace(/\D/g, '');
  if (type === 'amex') {
    return [digits.slice(0,4), digits.slice(4,10), digits.slice(10,15)].filter(Boolean).join(' ');
  }
  return (digits.match(/.{1,4}/g) || []).join(' ');
}

function maskNumber(formatted: string): string {
  const chars = formatted.split('');
  let digitIdx = 0;
  return chars.map(c => {
    if (c === ' ') return c;
    const masked = digitIdx >= 4 && digitIdx <= 11 ? '\u25cf' : c;
    digitIdx++;
    return masked;
  }).join('');
}

function formatExpiry(val: string): string {
  const d = val.replace(/\D/g, '').slice(0, 4);
  return d.length <= 2 ? d : d.slice(0,2) + '/' + d.slice(2);
}

const TEST_CARDS = ['4000056655665556','5200828282828210','371449635398431','6011000990139424'];

/* ── Component ───────────────────────────────────────────── */
export default function PaymentCard() {
  const [name, setName]             = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry]         = useState('');
  const [cvv, setCvv]               = useState('');
  const [flipped, setFlipped]       = useState(false);
  const [isLoading, setIsLoading]   = useState(false);

  const cardType      = detectCardType(cardNumber);
  const displayNumber = cardNumber || '0123 4567 8910 1112';
  const maskedNumber  = maskNumber(displayNumber);
  const displayName   = name.toUpperCase() || 'JEAN DUPONT';
  const displayExpiry = expiry || '01/23';
  const displayCvv    = cvv || '985';

  /* tilt ±5° — box only */
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);
  const handleMouseLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

  function handleCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const fmt = formatCardNumber(e.target.value, cardType);
    if (fmt.length <= (cardType === 'amex' ? 17 : 19)) setCardNumber(fmt);
  }
  function handleExpiry(e: React.ChangeEvent<HTMLInputElement>) { setExpiry(formatExpiry(e.target.value)); }
  function handleCvv(e: React.ChangeEvent<HTMLInputElement>) { setCvv(e.target.value.replace(/\D/g,'').slice(0,4)); }
  function generateRandom() {
    const raw  = TEST_CARDS[Math.floor(Math.random() * TEST_CARDS.length)];
    const type = detectCardType(raw);
    setCardNumber(formatCardNumber(raw, type));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  const inputCls = "w-full bg-white/5 border border-white/10 focus:border-white/20 focus:bg-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200";
  const labelCls = "block text-xs text-white/50 mb-1.5";

  return (
    <div
      className="min-h-screen w-screen relative overflow-hidden flex items-center justify-center px-6 py-12"
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

      {/* gap-16 mobile (64px) | gap-12 desktop (48px) */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row md:items-center gap-16 md:gap-12">

        {/* ── CARTE — gauche desktop / haut mobile ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-[380px] md:shrink-0"
        >
          <div style={{ perspective: '800px' }}>
            <div
              onClick={() => setFlipped(f => !f)}
              className="relative w-full cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                height: '190px',
              }}
            >
              {/* FRONT */}
              <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                <svg viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '100%', borderRadius: '18px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                  <defs>
                    <pattern id="cardImg" patternUnits="userSpaceOnUse" x="0" y="0" width="750" height="259">
                      <image href="/card.png" x="0" y="0" width="750" height="259" preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                    <linearGradient id="imgOverlay" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
                    </linearGradient>
                    <clipPath id="cardShape">
                      <rect width="750" height="471" rx="40" />
                    </clipPath>
                  </defs>
                  <rect width="750" height="471" rx="40" fill="#111" />
                  <rect x="0" y="0" width="750" height="259" fill="url(#cardImg)" clipPath="url(#cardShape)" />
                  <rect x="0" y="0" width="750" height="259" fill="url(#imgOverlay)" clipPath="url(#cardShape)" />
                  <path fill="#ff9000" d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"/>
                  <rect x="65" y="56" width="105" height="72" rx="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <rect x="65" y="70" width="1.5" height="44" fill="rgba(255,255,255,0.4)"/>
                  <rect x="168.5" y="70" width="1.5" height="44" fill="rgba(255,255,255,0.4)"/>
                  <rect x="83" y="82" width="26" height="1.5" fill="rgba(255,255,255,0.4)"/>
                  <rect x="83" y="108" width="26" height="1.5" fill="rgba(255,255,255,0.4)"/>
                  <rect x="143" y="82" width="26" height="1.5" fill="rgba(255,255,255,0.4)"/>
                  <rect x="143" y="108" width="26" height="1.5" fill="rgba(255,255,255,0.4)"/>
                  <text x="65" y="245" fill="white" fillOpacity="0.55" fontSize="22" fontFamily="'Source Code Pro',monospace">numéro de carte</text>
                  <text x="65" y="295" fill="white" fontSize="44" fontFamily="'Source Code Pro',monospace" fontWeight="600" letterSpacing="2">{maskedNumber}</text>
                  <text x="54" y="385" fill="white" fillOpacity="0.55" fontSize="20" fontFamily="'Source Code Pro',monospace">titulaire</text>
                  <text x="54" y="422" fill="white" fontSize="28" fontFamily="'Source Code Pro',monospace" fontWeight="400">{displayName}</text>
                  <text x="480" y="384" fill="white" fillOpacity="0.55" fontSize="20" fontFamily="'Source Code Pro',monospace">expiration</text>
                  <text x="480" y="410" fill="white" fontSize="13" fontFamily="'Source Code Pro',monospace" fontWeight="300">VALIDE</text>
                  <text x="480" y="428" fill="white" fontSize="13" fontFamily="'Source Code Pro',monospace" fontWeight="300">JUSQU&apos;AU</text>
                  <polygon fill="white" points="554.5,416 540.4,409 540.4,423" />
                  <text x="574" y="428" fill="white" fontSize="32" fontFamily="'Source Code Pro',monospace" fontWeight="400">{displayExpiry}</text>
                </svg>
              </div>

              {/* BACK */}
              <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <svg viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '100%', borderRadius: '18px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                  <defs>
                    <pattern id="cardImgBack" patternUnits="userSpaceOnUse" x="0" y="0" width="750" height="471">
                      <image href="/card.png" x="0" y="0" width="750" height="471" preserveAspectRatio="xMidYMid slice" />
                    </pattern>
                    <clipPath id="cardShapeBack">
                      <rect width="750" height="471" rx="40" />
                    </clipPath>
                  </defs>
                  <rect width="750" height="471" rx="40" fill="#ff9000" />
                  <rect width="750" height="471" rx="40" fill="rgba(255,255,255,0.08)" clipPath="url(#cardShapeBack)" />
                  <rect x="0" y="0" width="750" height="471" fill="url(#cardImgBack)" fillOpacity="0.12" clipPath="url(#cardShapeBack)" />
                  <rect y="61.6" width="750" height="78" fill="rgba(0,0,0,0.75)" />
                  <rect x="42.9" y="184.6" width="565" height="64.5" rx="4"
                    fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <rect x="42.9" y="198.6" width="565" height="10.5" fill="rgba(255,255,255,0.1)"/>
                  <rect x="42.9" y="224.5" width="565" height="10.5" fill="rgba(255,255,255,0.1)"/>
                  <rect x="618" y="184.6" width="90" height="64.5" rx="4"
                    fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                  <text x="630" y="227" fill="#1a1a1a" fontSize="27" fontFamily="'Source Code Pro',monospace" fontWeight="600">{displayCvv}</text>
                  <text x="518" y="280" fill="rgba(255,255,255,0.7)" fontSize="20" fontFamily="'Source Code Pro',monospace">code de sécurité</text>
                  <rect x="58" y="378" width="375" height="13" rx="3" fill="rgba(255,255,255,0.15)"/>
                  <rect x="58" y="405" width="421" height="13" rx="3" fill="rgba(255,255,255,0.15)"/>
                  <text x="59" y="230" fill="rgba(0,0,0,0.55)" fontSize="30" fontFamily="'Rock Salt',cursive">{name || 'Jean Dupont'}</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── GLASS BOX — droite desktop / bas mobile ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ perspective: 1500 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:flex-1"
        >
          <motion.div className="relative group" style={{ rotateX, rotateY }}>
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-black/15 via-black/5 to-black/10 blur-sm" />
            <CardBorderGlow />
            <div
              className="relative rounded-2xl p-6 shadow-2xl overflow-hidden"
              style={{
                background: 'rgba(0,0,0,0.01)',
                backdropFilter: 'blur(6px) saturate(20%)',
                WebkitBackdropFilter: 'blur(6px) saturate(20%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'rgba(0,0,0,0.6) 0px 8px 32px, rgba(255,255,255,0.03) 0px 1px 0px inset',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent" />

              <div className="text-center mb-5">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                >
                  Informations de paiement
                </motion.h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelCls} htmlFor="cc-name">Nom du titulaire</label>
                  <input id="cc-name" type="text" maxLength={20} placeholder="Jean Dupont"
                    value={name} onChange={e => setName(e.target.value)}
                    onFocus={() => setFlipped(false)} className={inputCls} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs text-white/50" htmlFor="cc-number">Numéro de carte</label>
                    <span onClick={generateRandom}
                      className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded cursor-pointer hover:bg-white/20 transition-colors">
                      générer un numéro
                    </span>
                  </div>
                  <input id="cc-number" type="text" inputMode="numeric" placeholder="0000 0000 0000 0000"
                    value={cardNumber} onChange={handleCardNumber}
                    onFocus={() => setFlipped(false)} className={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls} htmlFor="cc-expiry">Expiration (mm/aa)</label>
                    <input id="cc-expiry" type="text" inputMode="numeric" placeholder="MM/AA"
                      value={expiry} onChange={handleExpiry}
                      onFocus={() => setFlipped(false)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="cc-cvv">Code de sécurité</label>
                    <input id="cc-cvv" type="text" inputMode="numeric" placeholder="CVV"
                      value={cvv} onChange={handleCvv}
                      onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)}
                      className={inputCls} />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={isLoading}
                  className="w-full relative group/button mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(255,153,0,0.3)' }} />
                  <div className="relative overflow-hidden text-black font-medium h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#ff9000' }}>
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="w-4 h-4 border-2 border-black/70 border-t-transparent rounded-full animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-semibold tracking-wide">
                          Payer maintenant
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
