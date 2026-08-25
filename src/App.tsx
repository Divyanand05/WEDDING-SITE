import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NotificationScreen } from './components/NotificationScreen';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { InvitationContent } from './components/InvitationContent';
import { FloatingPetals } from './components/FloatingPetals';
import { AudioPlayer } from './components/AudioPlayer';

export type ScreenState = 'notification' | 'envelope' | 'invitation';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('notification');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Transition from Screen 1 (Notification) -> Screen 2 (Envelope)
  const handleOpenNotification = () => {
    setScreen('envelope');
    // Start ambient background music on first direct user gesture
    setIsMusicPlaying(true);
  };

  // Transition from Screen 2 (Envelope Animation Finished) -> Screen 3 & 4 (Full Details)
  const handleEnvelopeOpened = () => {
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
      }}
    >
      {/* Floating Canvas Rose Petals */}
      <FloatingPetals />

      {/* Floating Background Music Controller */}
      <AudioPlayer isPlaying={isMusicPlaying} onToggle={handleToggleMusic} />

      {/* Main Flow Presentation with Cinematic AnimatePresence */}
      <AnimatePresence mode="wait">
        {screen === 'notification' && (
          <motion.div
            key="screen-notification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >
            <NotificationScreen onOpen={handleOpenNotification} />
          </motion.div>
        )}

        {screen === 'envelope' && (
          <motion.div
            key="screen-envelope"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
            transition={{ duration: 0.7 }}
            style={{ width: '100%' }}
          >
            <EnvelopeScreen onOpenComplete={handleEnvelopeOpened} />
          </motion.div>
        )}

        {screen === 'invitation' && (
          <motion.div
            key="screen-invitation"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
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
