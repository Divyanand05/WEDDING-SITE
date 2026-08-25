import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface NotificationScreenProps {
  onDone: () => void;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({ onDone }) => {
  // Auto-transition to full invitation after 4.5 seconds
  useEffect(() => {
    const timer = setTimeout(onDone, 4500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        zIndex: 10,
        background: 'radial-gradient(ellipse at 50% 40%, #FFFDF9 0%, #F4ECDF 55%, #E9DDC8 100%)',
      }}
    >
      {/* Ambient gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '420px' }}>

        {/* Card container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255, 253, 249, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '28px',
            border: '1px solid rgba(212,175,55,0.4)',
            boxShadow: '0 24px 64px rgba(60,40,20,0.16), 0 0 30px rgba(212,175,55,0.18)',
            padding: '44px 28px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner double border */}
          <div style={{
            position: 'absolute', top: '9px', left: '9px', right: '9px', bottom: '9px',
            border: '1px solid rgba(212,175,55,0.22)', borderRadius: '21px', pointerEvents: 'none',
          }} />

          {/* Couple photo — circular at top */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: '0 auto 20px',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {/* Spinning gold conic ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '-5px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #D4AF37 0%, #F3E5AB 30%, #C5A059 60%, #ECC880 85%, #D4AF37 100%)',
                filter: 'blur(2px)',
                opacity: 0.75,
              }}
            />
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #D4AF37',
              boxShadow: '0 6px 22px rgba(212,175,55,0.35)',
            }}>
              <img
                src={weddingConfig.couplePhotoUrl}
                alt="The Couple"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </motion.div>

          {/* NEW MESSAGE badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '5px 14px',
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '999px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <Heart style={{ width: '14px', height: '14px', fill: '#E63946', color: '#E63946' }} />
            </motion.div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.73rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#5C4A38',
            }}>
              NEW MESSAGE — NOW
            </span>
          </motion.div>

          {/* Main romantic message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              lineHeight: 1.55,
              color: '#38302A',
              fontStyle: 'italic',
              marginBottom: '14px',
            }}
          >
            "A beautiful new chapter is about to begin..."
          </motion.p>

          {/* Couple names in script */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '2rem',
              color: '#9C7A3C',
              lineHeight: 1.1,
              marginBottom: '22px',
            }}
          >
            {weddingConfig.couple.groom.firstName} &amp; {weddingConfig.couple.bride.firstName}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              margin: '0 auto 22px', maxWidth: '260px',
            }}
          >
            <span style={{ height: '1px', flex: 1, background: 'rgba(212,175,55,0.45)' }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C7 1 2 4.5 2 7.5C2 9.98 4.24 12 7 12C9.76 12 12 9.98 12 7.5C12 4.5 7 1 7 1Z" fill="#C5A059" opacity="0.8"/>
            </svg>
            <span style={{ height: '1px', flex: 1, background: 'rgba(212,175,55,0.45)' }} />
          </motion.div>

          {/* Countdown to auto-reveal text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.76rem',
              letterSpacing: '0.12em',
              color: '#9A8A7C',
              fontStyle: 'italic',
            }}
          >
            Your invitation is being revealed...
          </motion.p>

          {/* Animated gold progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 3.0, ease: 'linear' }}
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, #D4AF37, #ECC880, #C5A059)',
              borderRadius: '2px',
              marginTop: '14px',
              transformOrigin: 'left center',
              boxShadow: '0 0 6px rgba(212,175,55,0.5)',
            }}
          />
        </motion.div>

        {/* Skip / tap to continue hint */}
        <motion.button
          onClick={onDone}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          style={{
            marginTop: '24px',
            display: 'block',
            width: '100%',
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#9A8A7C',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          Tap to continue →
        </motion.button>
      </div>
    </div>
  );
};
