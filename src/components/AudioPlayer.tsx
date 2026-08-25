import React, { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';


// Web Audio API Procedural Sound Effects (Zero External Audio File Dependency)
export const playHarpChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Romantic Pentatonic chime frequencies (C major / A minor pentatonic: C5, E5, G5, A5, C6, E6)
    const notes = [523.25, 659.25, 783.99, 880.0, 1046.5, 1318.51];
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const startTime = ctx.currentTime + index * 0.08;
      const duration = 1.4;
      
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch (e) {
    console.debug('Audio not supported or blocked:', e);
  }
};

export const playPaperRustle = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {
    console.debug('Paper sound effect:', e);
  }
};

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasAudioUrl] = useState(Boolean(weddingConfig.theme.musicUrl));

  useEffect(() => {
    if (!audioRef.current || !hasAudioUrl) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser prevented autoplay before interaction
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, hasAudioUrl]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {hasAudioUrl && (
        <audio
          ref={audioRef}
          src={weddingConfig.theme.musicUrl}
          loop
          preload="auto"
        />
      )}
      <button
        onClick={onToggle}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '999px',
          background: 'rgba(20, 12, 8, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 175, 55, 0.45)',
          color: '#F4E5C3',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>♬</span>
        <span>{isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}</span>
      </button>
    </div>
  );

};

