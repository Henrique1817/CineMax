"use client";

import { FaPlay, FaPause, FaStop, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudioContext } from '@/context/AudioContext';

export default function AudioControls() {
  const {
    currentTrackId,
    isPlaying,
    volume,
    isMuted,
    togglePlay,
    toggleMute,
    setVolume,
    stopCurrentTrack,
  } = useAudioContext();

  if (!currentTrackId) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white rounded-xl shadow-xl px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded transition" aria-label="Play/Pause">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={stopCurrentTrack} className="p-2 hover:bg-white/20 rounded transition" aria-label="Stop">
          <FaStop />
        </button>
        <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded transition" aria-label="Mute/Unmute">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-28 accent-red-600"
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
