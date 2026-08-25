import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';
import { playHarpChime, playPaperRustle } from './AudioPlayer';

interface EnvelopeScreenProps {
  onOpenComplete: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [cardEmerged, setCardEmerged] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening || isOpen) return;

    // 1. Disable repeated clicks
    setIsOpening(true);
    setIsOpen(true);

    // Audio SFX
    playPaperRustle();

    // 2. Step: Flap opens in 3D (0.5s)
    setTimeout(() => {
      // 5. Reveal invitation card & slide upward
      setCardEmerged(true);
      playHarpChime();

      // Confetti celebration
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FDFBF7', '#E7C9C6', '#C5A059'],
        disableForReducedMotion: true,
      });

      // 8. After card rises, smoothly transition to full wedding invitation
      setTimeout(() => {
        onOpenComplete();
      }, 1600);
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Surrounding ambient romantic glow */}
      <div
        className="ambient-glow"
        style={{
          width: '450px',
          height: '450px',
          background: isOpen
            ? 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(235, 210, 205, 0.25) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(235, 210, 205, 0.12) 50%, transparent 70%)',
          transition: 'all 1s ease',
        }}
      />

      {/* Screen 2 Top Title: A SPECIAL INVITATION FOR YOU */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: 'center',
          marginBottom: '28px',
          zIndex: 12,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-deep)',
            marginBottom: '6px',
          }}
        >
          A Special Invitation For You
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            color: '#42362C',
            lineHeight: 1.1,
          }}
        >
          {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
        </h1>
      </motion.div>

      {/* Botanical Floral Frame Accents (SVG White Roses & Delicate Leaves) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Top Left Floral Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-35px',
            left: '-25px',
            width: '120px',
            height: '120px',
            pointerEvents: 'none',
            zIndex: 15,
            opacity: 0.9,
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 70C20 40 45 20 75 15C55 35 50 60 45 80" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M40 30C35 15 20 10 10 20C15 35 30 40 40 30Z" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="0.75" />
            <path d="M60 25C65 10 80 8 88 18C82 32 68 36 60 25Z" fill="#F5EFE6" stroke="#D4AF37" strokeWidth="0.75" />
            <circle cx="38" cy="42" r="16" fill="#FFFFFF" stroke="#EAD8C0" strokeWidth="1.5" />
            <circle cx="38" cy="42" r="11" fill="#FAF6EE" stroke="#D4AF37" strokeWidth="0.75" />
            <circle cx="38" cy="42" r="6" fill="#F4E9DC" />
            {/* Rose petal lines */}
            <path d="M32 38C35 34 42 34 45 38" stroke="#C5A059" strokeWidth="0.7" strokeLinecap="round" />
            <path d="M34 44C37 47 43 46 45 43" stroke="#C5A059" strokeWidth="0.7" strokeLinecap="round" />
          </svg>
        </div>

        {/* Bottom Right Floral Accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '-35px',
            right: '-25px',
            width: '125px',
            height: '125px',
            pointerEvents: 'none',
            zIndex: 15,
            opacity: 0.9,
            transform: 'rotate(180deg)',
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 70C20 40 45 20 75 15C55 35 50 60 45 80" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M40 30C35 15 20 10 10 20C15 35 30 40 40 30Z" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="0.75" />
            <path d="M60 25C65 10 80 8 88 18C82 32 68 36 60 25Z" fill="#F5EFE6" stroke="#D4AF37" strokeWidth="0.75" />
            <circle cx="38" cy="42" r="16" fill="#FFFFFF" stroke="#EAD8C0" strokeWidth="1.5" />
            <circle cx="38" cy="42" r="11" fill="#FAF6EE" stroke="#D4AF37" strokeWidth="0.75" />
            <circle cx="38" cy="42" r="6" fill="#F4E9DC" />
            <path d="M32 38C35 34 42 34 45 38" stroke="#C5A059" strokeWidth="0.7" strokeLinecap="round" />
          </svg>
        </div>

        {/* 3D Envelope Container */}
        <div
          className="envelope-perspective-wrapper"
          onClick={handleEnvelopeClick}
          id="wedding-envelope"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            height: '255px',
            cursor: isOpening ? 'default' : 'pointer',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Envelope Glow when clicked */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '20px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(237, 210, 205, 0.2) 60%, transparent 80%)',
                filter: 'blur(10px)',
                zIndex: 1,
              }}
            />
          )}

          {/* 1. Envelope Back Interior Panel */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#F3ECE0',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-envelope)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            {/* Elegant luxury lining pattern inside envelope */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, #FFFDF8 0%, #EFE5D5 100%)',
                opacity: 0.9,
              }}
            />
            {/* Gold foil interior border */}
            <div
              style={{
                position: 'absolute',
                inset: '8px',
                border: '1px dashed rgba(212, 175, 55, 0.4)',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* 2. INVITATION CARD (Tucked inside, then smoothly emerges) */}
          <motion.div
            initial={{ y: 0, scale: 0.95, opacity: 0.9 }}
            animate={
              cardEmerged
                ? {
                    y: -130,
                    scale: 1.02,
                    opacity: 1,
                    boxShadow: '0 30px 60px rgba(50, 40, 30, 0.28), 0 0 30px rgba(212, 175, 55, 0.35)',
                  }
                : { y: 0, scale: 0.95, opacity: 0.9 }
            }
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: 'absolute',
              top: '12px',
              left: '16px',
              right: '16px',
              height: '235px',
              backgroundColor: '#FFFDF9',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              padding: '16px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: cardEmerged ? 8 : 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          >
            {/* Inner Gold Foil Frame */}
            <div
              style={{
                position: 'absolute',
                inset: '6px',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '6px',
                pointerEvents: 'none',
              }}
            />

            {/* Monogram on Card */}
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                letterSpacing: '0.3em',
                color: 'var(--color-gold-deep)',
                marginBottom: '4px',
              }}
            >
              {weddingConfig.couple.monogram}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#8A7B6E',
                marginBottom: '4px',
              }}
            >
              SAVE THE DATE
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.9rem',
                color: '#382D25',
                lineHeight: 1.1,
                marginBottom: '4px',
              }}
            >
              {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                color: 'var(--color-gold-primary)',
                fontWeight: 600,
              }}
            >
              {weddingConfig.schedule.displayDate}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: '0.8rem',
                color: '#7A6E64',
                fontStyle: 'italic',
                marginTop: '4px',
              }}
            >
              {weddingConfig.venue.name}
            </p>
          </motion.div>

          {/* 3. Envelope Front Pocket (Left, Right, and Bottom Flaps) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 4,
              pointerEvents: 'none',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* Left triangle flap */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '127.5px 0 127.5px 190px',
                borderColor: 'transparent transparent transparent #F6EFE3',
                filter: 'drop-shadow(2px 0 6px rgba(70, 50, 30, 0.08))',
              }}
            />

            {/* Right triangle flap */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '127.5px 190px 127.5px 0',
                borderColor: 'transparent #F6EFE3 transparent transparent',
                filter: 'drop-shadow(-2px 0 6px rgba(70, 50, 30, 0.08))',
              }}
            />

            {/* Bottom triangle pocket */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 190px 135px 190px',
                borderColor: 'transparent transparent #FAF5EC transparent',
                filter: 'drop-shadow(0 -3px 8px rgba(70, 50, 30, 0.12))',
              }}
            />

            {/* Subtle Gold Pocket Trim */}
            <svg
              viewBox="0 0 380 255"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <path
                d="M0 255 L190 120 L380 255"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* 4. Top Flap with 3D Rotate Effect (transform-origin: top center) */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 1 : 6,
            }}
            transition={{
              duration: 0.85,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '135px',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              pointerEvents: isOpen ? 'none' : 'auto',
            }}
          >
            {/* Front of Top Flap (Ivory Paper Triangle pointing down) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '135px 190px 0 190px',
                borderColor: '#F9F4EB transparent transparent transparent',
                filter: 'drop-shadow(0 4px 8px rgba(50, 35, 20, 0.18))',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Gold border accent on top flap */}
              <div
                style={{
                  position: 'absolute',
                  top: '-135px',
                  left: '-190px',
                  width: '380px',
                  height: '135px',
                  pointerEvents: 'none',
                }}
              >
                <svg viewBox="0 0 380 135" style={{ width: '100%', height: '100%' }}>
                  <path
                    d="M0 0 L190 133 L380 0"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    opacity="0.65"
                  />
                </svg>
              </div>
            </div>

            {/* Back of Top Flap (Champagne/Gold interior visible when flap opens 180deg) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '135px 190px 0 190px',
                borderColor: '#EFE5D5 transparent transparent transparent',
                transform: 'rotateY(180deg) rotateZ(180deg)',
                transformOrigin: '50% 50%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                filter: 'drop-shadow(0 -4px 8px rgba(50, 35, 20, 0.1))',
              }}
            />

            {/* Wax Seal placed at the apex of the top flap */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ scale: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: '105px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                  }}
                >
                  <div className="wax-seal">
                    <div className="wax-seal-inner">
                      <span>{weddingConfig.couple.monogram}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Screen 2 Bottom Instruction: Tap the envelope to open 💌 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          marginTop: '32px',
          textAlign: 'center',
          zIndex: 12,
        }}
      >
        <motion.div
          animate={
            isOpen
              ? { scale: 0.9, opacity: 0 }
              : { scale: [1, 1.05, 1], opacity: 1 }
          }
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
          onClick={handleEnvelopeClick}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#5C4E3E',
            }}
          >
            {isOpening ? 'Opening Invitation...' : 'Tap the envelope to open 💌'}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
