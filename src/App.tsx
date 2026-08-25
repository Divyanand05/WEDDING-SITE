import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { NotificationScreen } from './components/NotificationScreen';
import { InvitationContent } from './components/InvitationContent';
import { FloatingPetals } from './components/FloatingPetals';
import { AudioPlayer } from './components/AudioPlayer';

// NEW FLOW:
// 1. envelope  →  user taps envelope, it opens naturally
// 2. notification  →  "A new chapter is about to begin..." auto-fades in
// 3. invitation  →  full wedding details auto-reveals after a moment

export type ScreenState = 'envelope' | 'notification' | 'invitation';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('envelope');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const handleEnvelopeOpened = () => {
    setIsMusicPlaying(true);
    setScreen('notification');
  };

  const handleNotificationDone = () => {
    setScreen('invitation');
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >
      <FloatingPetals />
      <AudioPlayer isPlaying={isMusicPlaying} onToggle={handleToggleMusic} />

      <AnimatePresence mode="wait">
        {screen === 'envelope' && (
          <motion.div
            key="screen-envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
            transition={{ duration: 0.7 }}
            style={{ width: '100%' }}
          >
            <EnvelopeScreen onOpenComplete={handleEnvelopeOpened} />
          </motion.div>
        )}

        {screen === 'notification' && (
          <motion.div
            key="screen-notification"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <NotificationScreen onDone={handleNotificationDone} />
          </motion.div>
        )}

        {screen === 'invitation' && (
          <motion.div
            key="screen-invitation"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <InvitationContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
