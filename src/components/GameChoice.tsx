
import { useEffect, useState } from 'react';
import { Hand, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Choice } from '@/utils/gameUtils';

interface GameChoiceProps {
  choice: Choice;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  animated?: boolean;
  large?: boolean;
}

const GameChoice = ({
  choice,
  selected,
  onClick,
  disabled = false,
  animated = false,
  large = false
}: GameChoiceProps) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (animated) {
      setAnimationClass('animate-bounce-custom');
      const timer = setTimeout(() => setAnimationClass(''), 500);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const getIcon = () => {
    switch (choice) {
      case 'rock':
        return <Hand className="rotate-90" size={large ? 60 : 40} />;
      case 'paper':
        // Using Hand with different rotation for paper
        return <Hand className="rotate-0" size={large ? 60 : 40} />;
      case 'scissors':
        return <Scissors size={large ? 60 : 40} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'game-card',
        selected && 'ring-4 ring-accent', 
        disabled ? 'opacity-70 cursor-not-allowed' : 'hover:ring-2 hover:ring-primary/50',
        large && 'sm:w-[130px] sm:h-[130px]',
        animationClass
      )}
      onClick={!disabled ? onClick : undefined}
      aria-label={`Select ${choice}`}
    >
      {getIcon()}
      <span className="sr-only">{choice}</span>
    </div>
  );
};

export default GameChoice;
