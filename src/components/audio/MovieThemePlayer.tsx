"use client";

import { useEffect } from 'react';
import { useAudioContext } from '@/context/AudioContext';

type Props = {
  movieId: string;
  src: string;
  volume?: number;
  loop?: boolean;
};

export default function MovieThemePlayer({ movieId, src, volume = 0.4, loop = true }: Props) {
  const { playMovieTheme, stopCurrentTrack } = useAudioContext();

  useEffect(() => {
    if (src) {
      playMovieTheme(movieId, src, { loop, volume });
    }
    return () => {
      stopCurrentTrack();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, src]);

  return null;
}
