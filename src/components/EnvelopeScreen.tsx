import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
import { playHarpChime, playPaperRustle } from './AudioPlayer';

interface EnvelopeScreenProps {
  onOpenComplete: () => void;
}

export type InteractiveStep = 'candle' | 'envelope' | 'card_slide';

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpenComplete }) => {
  const [step, setStep] = useState<InteractiveStep>('candle');
  const [candleLit, setCandleLit] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  // 1. Candle Tap Handler
  const handleCandleTap = () => {
    playHarpChime();
    setCandleLit(true);
    setTimeout(() => {
      setStep('envelope');
    }, 1200);
  };

  // 2. Wax Seal Tap Handler
  const handleSealTap = () => {
    if (sealCracked) return;
    playPaperRustle();
    setSealCracked(true);

    // After crack animation (600ms), slide card up
    setTimeout(() => {
      setStep('card_slide');
      playHarpChime();

      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#FFFDF9', '#EAD8C0', '#C5A059', '#F5ECE0'],
        disableForReducedMotion: true,
      });

      // After card emerges, complete transition to full website
      setTimeout(() => {
        onOpenComplete();
      }, 1900);
    }, 700);
  };

  const isEnvelopeOpen = step === 'card_slide';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        backgroundImage: `url(${weddingConfig.couplePhotoUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        overflow: 'hidden',
        padding: '24px 16px',
      }}
    >
      {/* Warm rich mahogany translucent overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: candleLit
            ? 'linear-gradient(180deg, rgba(35, 20, 12, 0.6) 0%, rgba(25, 12, 6, 0.72) 100%)'
            : 'linear-gradient(180deg, rgba(30, 18, 10, 0.68) 0%, rgba(20, 10, 5, 0.78) 100%)',
          transition: 'background 1.2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Warm ambient flame glow when candle is lit */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: candleLit
            ? 'radial-gradient(circle, rgba(255, 180, 50, 0.28) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          transition: 'all 1.2s ease',
        }}
      />

      <AnimatePresence mode="wait">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 1: 🕯️ LIGHT THE CANDLE RITUAL
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {step === 'candle' && (
          <motion.div
            key="step-candle"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.7 }}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 12,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '8px',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              STEP 1 OF 2
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                color: '#FFFDF9',
                marginBottom: '28px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              Light the Flame to Celebrate
            </h2>


            {/* Interactive Candle / Diya Stand */}
            <motion.div
              onClick={handleCandleTap}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'relative',
                width: '140px',
                height: '160px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
            >
              {/* Flame (Ignites when tapped) */}
              <AnimatePresence>
                {candleLit && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                    transition={{
                      scale: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
                      opacity: { duration: 0.3 },
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      width: '24px',
                      height: '38px',
                      borderRadius: '50% 50% 35% 35%',
                      background: 'radial-gradient(circle at 50% 80%, #FFF 0%, #FFB703 45%, #FB8500 80%, transparent 100%)',
                      boxShadow: '0 0 25px #FFB703, 0 0 45px #FB8500',
                      filter: 'drop-shadow(0 -4px 10px #FFB703)',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Candle Body */}
              <div
                style={{
                  width: '42px',
                  height: '85px',
                  borderRadius: '6px 6px 4px 4px',
                  background: 'linear-gradient(180deg, #FFFDF8 0%, #F5ECE0 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  boxShadow: '0 8px 20px rgba(60, 40, 20, 0.12)',
                  position: 'relative',
                }}
              >
                {/* Wick */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '3px',
                    height: '10px',
                    backgroundColor: '#4A3E38',
                    borderRadius: '2px',
                  }}
                />
              </div>

              {/* Candle Brass Holder Base */}
              <div
                style={{
                  width: '90px',
                  height: '22px',
                  borderRadius: '12px 12px 6px 6px',
                  background: 'linear-gradient(180deg, #ECC880 0%, #D4AF37 50%, #9A7B38 100%)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  marginTop: '-2px',
                }}
              />
            </motion.div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                color: '#8A7060',
                marginTop: '28px',
                textTransform: 'uppercase',
              }}
            >
              {candleLit ? '🔥 Celebration blessed!' : '🕯️ Tap candle to light flame'}
            </p>
          </motion.div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 3: 🔐 SECRET WAX SEAL & ENVELOPE OPENING
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {(step === 'envelope' || step === 'card_slide') && (
          <motion.div
            key="step-envelope"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.7 }}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 12,
              width: '100%',
              maxWidth: '440px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '8px',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              STEP 2 OF 2
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                color: '#FFFDF9',
                marginBottom: '24px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              Tap the Wax Seal to Break It
            </h2>


            {/* REALISTIC 3D CSS ENVELOPE WITH INTERACTIVE WAX SEAL */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '66%',
                borderRadius: '6px',
                perspective: '1200px',
                filter: sealCracked
                  ? 'drop-shadow(0 0 30px rgba(212,175,55,0.55)) drop-shadow(0 18px 40px rgba(60,40,20,0.25))'
                  : 'drop-shadow(0 12px 30px rgba(60,40,20,0.18))',
                transition: 'filter 0.5s ease',
              }}
            >
              {/* Back panel */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '6px',
                  background: 'linear-gradient(160deg, #F8F3E8 0%, #EDE3D0 100%)',
                  border: '1px solid rgba(197,160,89,0.45)',
                  boxShadow: '0 8px 32px rgba(60,40,20,0.14)',
                }}
              />

              {/* INVITATION CARD (Slides Up on Seal Break) */}
              <motion.div
                animate={
                  isEnvelopeOpen
                    ? { y: '-115%', zIndex: 8, boxShadow: '0 30px 60px rgba(50,35,20,0.3)' }
                    : { y: '-6%', zIndex: 2 }
                }
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: '14%',
                  left: '8%',
                  right: '8%',
                  height: '82%',
                  borderRadius: '4px',
                  background: 'linear-gradient(170deg, #FFFDF9 0%, #FDF7EE 100%)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 18px',
                  textAlign: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: '5px', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px', pointerEvents: 'none' }} />

                <div
                  style={{
                    width: '75px',
                    height: '95px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 3px 10px rgba(212,175,55,0.3)',
                    marginBottom: '6px',
                    flexShrink: 0,
                    background: '#FFFDF9',
                  }}
                >
                  <img
                    src={weddingConfig.couplePhotoUrl}
                    alt="The Couple"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A7060', marginBottom: '3px' }}>
                  SAVE THE DATE
                </p>
                <h3 style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: '#3A2C22', lineHeight: 1.1, marginBottom: '4px' }}>
                  {weddingConfig.couple.groom.firstName} &amp; {weddingConfig.couple.bride.firstName}
                </h3>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.15em', color: '#C5A059', fontWeight: 600 }}>
                  {weddingConfig.schedule.displayDate}
                </p>
              </motion.div>

              {/* Envelope Front Flaps */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 4 }} viewBox="0 0 210 280" preserveAspectRatio="none">
                <polygon points="0,0 0,280 210,140" fill="#F5ECD8" />
              </svg>
              <svg style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 4 }} viewBox="0 0 210 280" preserveAspectRatio="none">
                <polygon points="210,0 210,280 0,140" fill="#F0E4CC" />
              </svg>
              <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', pointerEvents: 'none', zIndex: 5 }} viewBox="0 0 420 185" preserveAspectRatio="none">
                <polygon points="0,185 420,185 210,0" fill="#F8F2E4" />
              </svg>

              {/* Top Flap (3D Unfolding) */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '55%',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  zIndex: sealCracked ? 1 : 7,
                }}
                animate={{
                  rotateX: sealCracked ? 185 : 0,
                }}
                transition={{ duration: 0.9, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <svg viewBox="0 0 420 231" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backfaceVisibility: 'hidden' }}>
                  <polygon points="0,0 420,0 210,231" fill="#F4ECE0" stroke="rgba(197,160,89,0.5)" strokeWidth="1" />
                </svg>

                {/* INTERACTIVE WAX SEAL WITH CRACK ANIMATION */}
                <div
                  onClick={handleSealTap}
                  style={{
                    position: 'absolute',
                    bottom: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    width: '60px',
                    height: '60px',
                    cursor: 'pointer',
                  }}
                >
                  <motion.div
                    animate={
                      sealCracked
                        ? { scale: [1, 1.25, 0.8], opacity: [1, 1, 0] }
                        : { scale: [1, 1.06, 1] }
                    }
                    transition={
                      sealCracked
                        ? { duration: 0.6 }
                        : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                    }
                    style={{ position: 'relative' }}
                  >
                    {/* Wax Seal Base */}
                    <svg viewBox="0 0 60 60" width="60" height="60">
                      <circle cx="30" cy="30" r="28" fill="#C5A059" stroke="#8C6820" strokeWidth="2" />
                      <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 2" />
                      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="13" fontWeight="700" fill="#3A2808">
                        {weddingConfig.couple.monogram}
                      </text>

                      {/* Crack Lines overlay when tapped */}
                      {sealCracked && (
                        <g stroke="#3A2808" strokeWidth="2" strokeLinecap="round">
                          <line x1="30" y1="10" x2="30" y2="50" />
                          <line x1="12" y1="25" x2="48" y2="35" />
                          <line x1="18" y1="42" x2="42" y2="18" />
                        </g>
                      )}
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                color: '#8A7060',
                marginTop: '36px',
                textTransform: 'uppercase',
              }}
            >
              {sealCracked ? '🔓 Seal Broken!' : '🔐 Tap the wax seal to break it'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
