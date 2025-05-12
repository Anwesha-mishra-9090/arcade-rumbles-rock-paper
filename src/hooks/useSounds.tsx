
import { useState, useEffect, useCallback, useMemo } from 'react';

interface Sounds {
  win: HTMLAudioElement;
  lose: HTMLAudioElement;
  draw: HTMLAudioElement;
  click: HTMLAudioElement;
}

const useSounds = (isMuted: boolean) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const sounds = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const soundFiles: Sounds = {
      win: new Audio('/sounds/win.mp3'),
      lose: new Audio('/sounds/lose.mp3'),
      draw: new Audio('/sounds/draw.mp3'),
      click: new Audio('/sounds/click.mp3')
    };

    // Preload sounds
    Object.values(soundFiles).forEach(sound => {
      sound.load();
      sound.volume = 0.5;
    });

    // Click sound should be quieter
    soundFiles.click.volume = 0.2;

    return soundFiles;
  }, []);

  useEffect(() => {
    if (sounds) {
      setIsLoaded(true);
    }
  }, [sounds]);

  const playSound = useCallback((soundName: keyof Sounds) => {
    if (isMuted || !sounds || !isLoaded) return;
    
    try {
      const sound = sounds[soundName];
      sound.currentTime = 0;
      sound.play().catch(e => console.error("Error playing sound:", e));
    } catch (error) {
      console.error("Error in playSound:", error);
    }
  }, [sounds, isMuted, isLoaded]);

  return { playSound, isLoaded };
};

export default useSounds;
