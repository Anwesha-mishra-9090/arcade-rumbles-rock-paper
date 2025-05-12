
import { useState, useEffect } from 'react';
import { Result } from '@/utils/gameUtils';
import { Button } from '@/components/ui/button';
import { Sparkle } from 'lucide-react';

interface GameResultProps {
  result: Result | null;
  message: string;
  onPlayAgain: () => void;
  visible: boolean;
}

const GameResult = ({ result, message, onPlayAgain, visible }: GameResultProps) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (visible) {
      setAnimationClass('animate-scale');
    } else {
      setAnimationClass('');
    }
  }, [visible]);

  if (!visible) return null;

  const getBgColor = () => {
    switch (result) {
      case 'win': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'lose': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'draw': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className={`${animationClass} w-full p-4 rounded-xl text-center mb-6 ${getBgColor()}`}>
      <div className="flex items-center justify-center gap-2 font-bold text-xl mb-2">
        {result === 'win' && <Sparkle className="text-yellow-500" size={20} />}
        {message}
        {result === 'win' && <Sparkle className="text-yellow-500" size={20} />}
      </div>
      <Button 
        onClick={onPlayAgain} 
        className="mt-2"
        variant={result === 'win' ? 'default' : 'outline'}
      >
        Play Again
      </Button>
    </div>
  );
};

export default GameResult;
