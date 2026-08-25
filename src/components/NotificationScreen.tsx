import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface NotificationScreenProps {
  onOpen: () => void;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({ onOpen }) => {
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
      }}
    >
      {/* Warm ambient background lighting */}
      <div
        className="ambient-glow"
        style={{
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(234, 201, 198, 0.18) 50%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '440px',
          position: 'relative',
        }}
      >
        {/* Decorative corner florals styling container */}
        <div
          className="glass-panel"
          style={{
            borderRadius: '24px',
            padding: '36px 28px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 20px 50px rgba(74, 58, 42, 0.15), 0 0 25px rgba(212, 175, 55, 0.12)',
          }}
        >
          {/* Inner double border for boutique stationery feel */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              right: '8px',
              bottom: '8px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '18px',
              pointerEvents: 'none',
            }}
          />

          {/* Top Tag: NEW MESSAGE — NOW */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '999px',
              marginBottom: '22px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                display: 'inline-block',
                boxShadow: '0 0 8px #D4AF37',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#7D6A4C',
              }}
            >
              NEW MESSAGE — NOW
            </span>
          </motion.div>

          {/* Monogram / Crest */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                letterSpacing: '0.25em',
                color: 'var(--color-gold-deep)',
                display: 'inline-block',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                paddingBottom: '4px',
              }}
            >
              {weddingConfig.couple.monogram}
            </span>
          </motion.div>

          {/* Animated Heart Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: 1 }}
            transition={{
              scale: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
              opacity: { duration: 0.6, delay: 0.3 },
            }}
            style={{
              margin: '10px auto 20px',
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFF 20%, #F5EFEB 100%)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(212, 175, 55, 0.25)',
            }}
          >
            <Heart
              style={{
                width: '26px',
                height: '26px',
                fill: '#C5A059',
                color: '#C5A059',
                filter: 'drop-shadow(0 2px 4px rgba(197, 160, 89, 0.4))',
              }}
            />
          </motion.div>

          {/* Quote Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: '1.35rem',
              lineHeight: 1.5,
              color: '#38302A',
              fontStyle: 'italic',
              marginBottom: '8px',
            }}
          >
            "A beautiful new chapter is about to begin..."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '1.6rem',
              color: '#9C7A3C',
              marginBottom: '28px',
            }}
          >
            {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
          </motion.p>

          {/* TAP TO OPEN Button */}
          <motion.button
            onClick={onOpen}
            id="tap-to-open-button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '16px 28px',
              fontSize: '0.88rem',
              letterSpacing: '0.2em',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.45)',
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px' }} />
            <span>TAP TO OPEN</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
