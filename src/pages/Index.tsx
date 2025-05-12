
import { useState, useEffect } from 'react';
import { 
  Choice, 
  Result, 
  getComputerChoice, 
  determineWinner, 
  getResultMessage,
  saveGameToStorage,
  getGamesFromStorage,
  GameRecord
} from '@/utils/gameUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import GameChoice from '@/components/GameChoice';
import ScoreBoard from '@/components/ScoreBoard';
import GameResult from '@/components/GameResult';
import ThemeToggle from '@/components/ThemeToggle';
import SoundToggle from '@/components/SoundToggle';
import useSounds from '@/hooks/useSounds';
import { ThemeProvider } from '@/hooks/useTheme';

const GamePage = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [games, setGames] = useState<GameRecord[]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  
  const isMobile = useIsMobile();
  const { playSound } = useSounds(muted);

  // Load games from local storage
  useEffect(() => {
    const savedGames = getGamesFromStorage();
    setGames(savedGames);
  }, []);

  const handleChoiceClick = (choice: Choice) => {
    // Don't allow new choices during animation
    if (gameInProgress) return;
    
    playSound('click');
    setGameInProgress(true);
    setPlayerChoice(choice);
    
    // Delayed computer choice for suspense
    setTimeout(() => {
      const cpuChoice = getComputerChoice();
      setComputerChoice(cpuChoice);
      
      // Determine the winner
      const gameResult = determineWinner(choice, cpuChoice);
      setResult(gameResult);
      setResultMessage(getResultMessage(gameResult));
      
      // Play appropriate sound effect
      playSound(gameResult);
      
      // Record the game
      const newGame: GameRecord = {
        playerChoice: choice,
        computerChoice: cpuChoice,
        result: gameResult,
        timestamp: Date.now()
      };
      
      // Update state and local storage
      setGames(prevGames => [...prevGames, newGame]);
      saveGameToStorage(newGame);
      
      // Show the result
      setShowResult(true);
    }, 1000);
  };

  const resetGame = () => {
    playSound('click');
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setResultMessage('');
    setShowResult(false);
    setGameInProgress(false);
  };

  const handleResetScoreboard = () => {
    setGames([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/20 flex flex-col items-center justify-center p-4">
      <div className="fixed top-4 right-4 flex gap-2">
        <SoundToggle onToggle={setMuted} />
        <ThemeToggle />
      </div>
      
      <main className="max-w-md w-full game-container mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gradient">
          Rock Paper Scissors
        </h1>
        
        {/* Game Result Display */}
        <GameResult 
          result={result} 
          message={resultMessage} 
          onPlayAgain={resetGame} 
          visible={showResult} 
        />
        
        {/* Game Choices Area */}
        <div className="mb-8">
          {!showResult ? (
            <>
              <h2 className="text-center text-lg mb-4 text-muted-foreground">
                Make your choice:
              </h2>
              <div className="flex justify-center gap-4 sm:gap-8">
                <GameChoice 
                  choice="rock" 
                  selected={playerChoice === 'rock'} 
                  onClick={() => handleChoiceClick('rock')}
                  disabled={gameInProgress}
                />
                <GameChoice 
                  choice="paper" 
                  selected={playerChoice === 'paper'} 
                  onClick={() => handleChoiceClick('paper')}
                  disabled={gameInProgress}
                />
                <GameChoice 
                  choice="scissors" 
                  selected={playerChoice === 'scissors'} 
                  onClick={() => handleChoiceClick('scissors')}
                  disabled={gameInProgress}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 mb-2">
                <div className="text-center">
                  <p className="text-sm mb-2 text-muted-foreground">You chose:</p>
                  <GameChoice 
                    choice={playerChoice as Choice} 
                    selected={true} 
                    onClick={() => {}} 
                    disabled={true}
                    large={true}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm mb-2 text-muted-foreground">Computer chose:</p>
                  <GameChoice 
                    choice={computerChoice as Choice} 
                    selected={true} 
                    onClick={() => {}} 
                    disabled={true}
                    animated={true}
                    large={true}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Scoreboard */}
        <ScoreBoard games={games} onReset={handleResetScoreboard} />
      </main>
    </div>
  );
};

const Index = () => (
  <ThemeProvider>
    <GamePage />
  </ThemeProvider>
);

export default Index;
