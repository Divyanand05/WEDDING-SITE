import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
import { playHarpChime, playPaperRustle } from './AudioPlayer';

interface EnvelopeScreenProps {
  onOpenComplete: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpenComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'glowing' | 'opening' | 'open' | 'done'>('idle');

  const handleTap = useCallback(() => {
    if (phase !== 'idle') return;

    // Phase 1: subtle glow around envelope
    setPhase('glowing');

    setTimeout(() => {
      // Phase 2: flap starts opening
      setPhase('opening');
      playPaperRustle();

      setTimeout(() => {
        // Phase 3: fully open, card emerges
        setPhase('open');
        playHarpChime();

        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#FFFDF9', '#EAD8C0', '#C5A059', '#F5ECE0'],
          disableForReducedMotion: true,
        });

        // Phase 4: transition out to notification
        setTimeout(() => {
          setPhase('done');
          onOpenComplete();
        }, 1800);

      }, 900);
    }, 300);
  }, [phase, onOpenComplete]);

  const isOpening = phase === 'opening' || phase === 'open' || phase === 'done';
  const cardUp = phase === 'open' || phase === 'done';
  const glowing = phase === 'glowing' || isOpening;

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
        background: 'radial-gradient(ellipse at 50% 40%, #FFFDF9 0%, #F4ECDF 55%, #E9DDC8 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Warm ambient light blob */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.13) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          transition: 'opacity 1s ease',
          opacity: glowing ? 1 : 0.4,
        }}
      />

      {/* Soft corner botanical SVG accents */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '220px', opacity: 0.55, pointerEvents: 'none' }} viewBox="0 0 220 220" fill="none">
        <path d="M10 200 Q30 120 100 80 Q60 140 40 210" stroke="#C5A059" strokeWidth="1" fill="none" opacity="0.6"/>
        <ellipse cx="100" cy="80" rx="22" ry="14" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(-30 100 80)"/>
        <ellipse cx="70" cy="110" rx="18" ry="11" fill="#FDF6EC" stroke="#C5A059" strokeWidth="0.8" transform="rotate(-15 70 110)"/>
        <ellipse cx="48" cy="148" rx="16" ry="10" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.7" transform="rotate(5 48 148)"/>
        <circle cx="99" cy="80" r="6" fill="#F4E9DC"/>
        <circle cx="69" cy="110" r="5" fill="#F0E4D5"/>
      </svg>
      <svg style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '220px', opacity: 0.55, pointerEvents: 'none', transform: 'scaleX(-1)' }} viewBox="0 0 220 220" fill="none">
        <path d="M10 200 Q30 120 100 80 Q60 140 40 210" stroke="#C5A059" strokeWidth="1" fill="none" opacity="0.6"/>
        <ellipse cx="100" cy="80" rx="22" ry="14" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(-30 100 80)"/>
        <ellipse cx="70" cy="110" rx="18" ry="11" fill="#FDF6EC" stroke="#C5A059" strokeWidth="0.8" transform="rotate(-15 70 110)"/>
        <ellipse cx="48" cy="148" rx="16" ry="10" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.7" transform="rotate(5 48 148)"/>
        <circle cx="99" cy="80" r="6" fill="#F4E9DC"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '200px', opacity: 0.5, pointerEvents: 'none', transform: 'scaleY(-1)' }} viewBox="0 0 220 220" fill="none">
        <path d="M10 200 Q30 120 100 80 Q60 140 40 210" stroke="#C5A059" strokeWidth="1" fill="none" opacity="0.6"/>
        <ellipse cx="100" cy="80" rx="22" ry="14" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(-30 100 80)"/>
        <ellipse cx="70" cy="110" rx="18" ry="11" fill="#FDF6EC" stroke="#C5A059" strokeWidth="0.8" transform="rotate(-15 70 110)"/>
        <circle cx="99" cy="80" r="6" fill="#F4E9DC"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '200px', opacity: 0.5, pointerEvents: 'none', transform: 'scale(-1,-1)' }} viewBox="0 0 220 220" fill="none">
        <path d="M10 200 Q30 120 100 80 Q60 140 40 210" stroke="#C5A059" strokeWidth="1" fill="none" opacity="0.6"/>
        <ellipse cx="100" cy="80" rx="22" ry="14" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="0.8" transform="rotate(-30 100 80)"/>
        <ellipse cx="70" cy="110" rx="18" ry="11" fill="#FDF6EC" stroke="#C5A059" strokeWidth="0.8" transform="rotate(-15 70 110)"/>
      </svg>

      {/* Invitation label above envelope */}
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#9A7B38',
          marginBottom: '28px',
          zIndex: 12,
        }}
      >
        A Special Invitation For You
      </motion.p>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          THE REALISTIC CSS ENVELOPE
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        onClick={handleTap}
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: 'min(92vw, 420px)',
          cursor: phase === 'idle' || phase === 'glowing' ? 'pointer' : 'default',
          zIndex: 12,
          filter: glowing
            ? 'drop-shadow(0 0 28px rgba(212,175,55,0.55)) drop-shadow(0 18px 40px rgba(60,40,20,0.25))'
            : 'drop-shadow(0 12px 30px rgba(60,40,20,0.18))',
          transition: 'filter 0.5s ease',
        }}
      >
        {/* ── ENVELOPE BODY ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '66%',      // aspect ratio ~3:2
            borderRadius: '6px',
            overflow: 'visible',
          }}
        >
          {/* Back panel — gives the envelope depth */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '6px',
              background: 'linear-gradient(160deg, #F8F3E8 0%, #EDE3D0 100%)',
              border: '1px solid rgba(197,160,89,0.45)',
              boxShadow: '0 8px 32px rgba(60,40,20,0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          />

          {/* ── INVITATION CARD (inside, slides up on open) ── */}
          <motion.div
            animate={
              cardUp
                ? { y: '-115%', zIndex: 8, boxShadow: '0 30px 60px rgba(50,35,20,0.3), 0 0 25px rgba(212,175,55,0.3)' }
                : { y: '-6%', zIndex: 2, boxShadow: '0 4px 16px rgba(50,35,20,0.12)' }
            }
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
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
            {/* Inner gold foil double border */}
            <div style={{ position: 'absolute', inset: '5px', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px', pointerEvents: 'none' }} />

            {/* Couple photo on card (uncropped portrait) */}
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

          {/* ── ENVELOPE FRONT FACE GEOMETRY ── */}
          {/* Left triangle flap */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 4 }}
            viewBox="0 0 210 280" preserveAspectRatio="none"
          >
            <polygon points="0,0 0,280 210,140" fill="#F5ECD8" />
            <polygon points="0,0 0,280 210,140" fill="none" stroke="#C5A059" strokeWidth="0.7" opacity="0.5" />
          </svg>
          {/* Right triangle flap */}
          <svg
            style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 4 }}
            viewBox="0 0 210 280" preserveAspectRatio="none"
          >
            <polygon points="210,0 210,280 0,140" fill="#F0E4CC" />
            <polygon points="210,0 210,280 0,140" fill="none" stroke="#C5A059" strokeWidth="0.7" opacity="0.5" />
          </svg>
          {/* Bottom triangle flap */}
          <svg
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', pointerEvents: 'none', zIndex: 5 }}
            viewBox="0 0 420 185" preserveAspectRatio="none"
          >
            <polygon points="0,185 420,185 210,0" fill="#F8F2E4" />
            <polygon points="0,185 420,185 210,0" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.55" />
          </svg>

          {/* ── TOP FLAP — 3D realistic CSS rotate ── */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '55%',         /* The flap covers upper 55% */
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: isOpening ? 1 : 7,
              perspective: '900px',
            }}
            animate={{
              rotateX: isOpening ? 185 : 0,   /* Flips back and over */
            }}
            transition={{ duration: 0.9, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Front face of flap — ivory triangle pointing down */}
            <svg
              viewBox="0 0 420 231"
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Paper shadow gradient for depth */}
              <defs>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF8" />
                  <stop offset="100%" stopColor="#EEE4D0" />
                </linearGradient>
                <linearGradient id="flapEdge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(197,160,89,0.6)" />
                  <stop offset="100%" stopColor="rgba(197,160,89,0.2)" />
                </linearGradient>
              </defs>
              <polygon points="0,0 420,0 210,231" fill="url(#flapGrad)" />
              <polygon points="0,0 420,0 210,231" fill="none" stroke="url(#flapEdge)" strokeWidth="1" />
              {/* Subtle texture lines to make paper feel realistic */}
              <line x1="100" y1="30" x2="160" y2="110" stroke="rgba(197,160,89,0.08)" strokeWidth="0.8" />
              <line x1="320" y1="30" x2="260" y2="110" stroke="rgba(197,160,89,0.08)" strokeWidth="0.8" />
            </svg>

            {/* Back face of flap (shown when open = champagne interior lining) */}
            <svg
              viewBox="0 0 420 231"
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              <defs>
                <linearGradient id="innerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EFE3CA" />
                  <stop offset="100%" stopColor="#F7EDD8" />
                </linearGradient>
              </defs>
              <polygon points="0,0 420,0 210,231" fill="url(#innerGrad)" />
            </svg>

            {/* ── WAX SEAL — sits at the flap apex (bottom of flap svg = center of envelope) ── */}
            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }}
                  style={{
                    position: 'absolute',
                    bottom: '-28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    width: '58px',
                    height: '58px',
                  }}
                >
                  <WaxSeal monogram={weddingConfig.couple.monogram} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* ── TAP PROMPT ── */}
      <AnimatePresence>
        {(phase === 'idle' || phase === 'glowing') && (
          <motion.div
            key="tap-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }, opacity: { duration: 0.5, delay: 0.5 } }}
            onClick={handleTap}
            style={{
              marginTop: '36px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              zIndex: 12,
            }}
          >
            {/* Animated chevron down arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                >
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M1 1L10 10L19 1" stroke="#C5A059" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#8A7060',
              fontWeight: 500,
            }}>
              Tap to open
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening status message */}
      <AnimatePresence>
        {isOpening && !cardUp && (
          <motion.p
            key="opening-msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '28px',
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#8A7060',
              zIndex: 12,
            }}
          >
            Opening...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Wax Seal SVG Component ── */
const WaxSeal: React.FC<{ monogram: string }> = ({ monogram }) => (
  <svg viewBox="0 0 58 58" width="58" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sealGrad" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#E8C870" />
        <stop offset="45%" stopColor="#C5A050" />
        <stop offset="100%" stopColor="#8C6820" />
      </radialGradient>
      <filter id="sealShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.35)" />
      </filter>
    </defs>
    {/* Outer wax blob — slightly organic shape */}
    <ellipse cx="29" cy="30" rx="27" ry="26" fill="url(#sealGrad)" filter="url(#sealShadow)" />
    {/* Inner circle ring */}
    <circle cx="29" cy="29" r="20" fill="none" stroke="rgba(255,245,210,0.35)" strokeWidth="1.2" strokeDasharray="3 2" />
    {/* Highlight */}
    <ellipse cx="22" cy="21" rx="8" ry="5" fill="rgba(255,250,230,0.3)" transform="rotate(-20 22 21)" />
    {/* Monogram text */}
    <text
      x="50%"
      y="54%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Cinzel, serif"
      fontSize="11"
      fontWeight="700"
      fill="#3A2808"
      opacity="0.85"
      letterSpacing="1"
    >
      {monogram}
    </text>
  </svg>
);
