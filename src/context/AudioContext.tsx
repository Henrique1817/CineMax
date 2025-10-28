'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

type PlayOptions = { loop?: boolean; volume?: number };

type AudioContextType = {
  currentTrackId: string | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  playMovieTheme: (movieId: string, src: string, opts?: PlayOptions) => Promise<void>;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  stopCurrentTrack: () => void;
};

const Ctx = createContext<AudioContextType | null>(null);

export const useAudioContext = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAudioContext must be used within AudioProvider');
  return ctx;
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, []);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
    return audioRef.current!;
  };

  const playMovieTheme = async (movieId: string, src: string, opts?: PlayOptions) => {
    const audio = ensureAudio();
    if (audio.src !== (typeof window !== 'undefined' ? new URL(src, window.location.origin).toString() : src)) {
      audio.src = src;
    }
    audio.loop = opts?.loop ?? true;
    audio.volume = isMuted ? 0 : (opts?.volume ?? volume);
    try {
      await audio.play();
      setCurrentTrackId(movieId);
    } catch (e) {
      // Autoplay pode ser bloqueado; controles permitirão dar play manualmente
      setCurrentTrackId(movieId);
    }
  };

  const stopCurrentTrack = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTrackId(null);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) audioRef.current.volume = next ? 0 : volume;
  };

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current && !isMuted) audioRef.current.volume = clamped;
  };

  return (
    <Ctx.Provider
      value={{
        currentTrackId,
        isPlaying,
        volume,
        isMuted,
        playMovieTheme,
        togglePlay,
        toggleMute,
        setVolume,
        stopCurrentTrack,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}