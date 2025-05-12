
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameRecord, getGameStats, clearGamesStorage } from '@/utils/gameUtils';
import { RefreshCw, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface ScoreBoardProps {
  games: GameRecord[];
  onReset: () => void;
}

const ScoreBoard = ({ games, onReset }: ScoreBoardProps) => {
  const stats = getGameStats(games);

  const handleReset = () => {
    clearGamesStorage();
    onReset();
    toast.success('Leaderboard has been reset!');
  };

  return (
    <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-accent" size={20} />
            <span>Leaderboard</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="h-8 px-2 text-xs"
          >
            <RefreshCw size={14} className="mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">{stats.win}</div>
            <div className="text-xs text-green-700 dark:text-green-400">Wins</div>
          </div>
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-md">
            <div className="text-xl font-bold text-red-600 dark:text-red-400">{stats.lose}</div>
            <div className="text-xs text-red-700 dark:text-red-400">Losses</div>
          </div>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.draw}</div>
            <div className="text-xs text-blue-700 dark:text-blue-400">Draws</div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-center text-muted-foreground">
          {games.length > 0 
            ? `Total games played: ${games.length}`
            : "No games played yet. Make your first move!"}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;
