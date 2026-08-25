import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
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
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
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
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-[#D4AF37]/40 shadow-lg text-[#6B5A3E] transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          boxShadow: isPlaying ? '0 0 15px rgba(212, 175, 55, 0.35)' : '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {isPlaying ? (
          <>
            <div className="relative">
              <Volume2 className="w-4 h-4 text-[#C5A059] animate-pulse" />
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37] absolute -top-1.5 -right-1.5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="text-[11px] font-medium tracking-wider uppercase hidden sm:inline text-[#6B5A3E]">
              Music Playing
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-stone-400" />
            <span className="text-[11px] font-medium tracking-wider uppercase hidden sm:inline text-stone-500">
              Music Off
            </span>
          </>
        )}
      </button>
    </div>
  );
};
