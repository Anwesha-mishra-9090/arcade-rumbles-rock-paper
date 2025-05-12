
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  onToggle: (isMuted: boolean) => void;
}

const SoundToggle = ({ onToggle }: SoundToggleProps) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem('sound-muted');
    return savedPreference === 'true';
  });

  useEffect(() => {
    // Save preference to localStorage when it changes
    localStorage.setItem('sound-muted', String(isMuted));
    // Call the onToggle prop to notify parent component
    onToggle(isMuted);
  }, [isMuted, onToggle]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsMuted(!isMuted)}
      className="w-8 h-8 p-0"
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? <VolumeX size={18} /> : <Volume size={18} />}
    </Button>
  );
};

export default SoundToggle;
