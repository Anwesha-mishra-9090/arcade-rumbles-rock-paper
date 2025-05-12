
export type Choice = 'rock' | 'paper' | 'scissors';
export type Result = 'win' | 'lose' | 'draw';

export interface GameRecord {
  playerChoice: Choice;
  computerChoice: Choice;
  result: Result;
  timestamp: number;
}

export const choices: Choice[] = ['rock', 'paper', 'scissors'];

export const getComputerChoice = (): Choice => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

export const determineWinner = (playerChoice: Choice, computerChoice: Choice): Result => {
  if (playerChoice === computerChoice) return 'draw';
  
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  }
  
  return 'lose';
};

export const getChoiceEmoji = (choice: Choice): string => {
  switch (choice) {
    case 'rock': return '✊';
    case 'paper': return '✋'; 
    case 'scissors': return '✌️';
    default: return '';
  }
};

export const getResultMessage = (result: Result): string => {
  switch (result) {
    case 'win': return 'You win!';
    case 'lose': return 'You lose!';
    case 'draw': return "It's a draw!";
    default: return '';
  }
};

export const saveGameToStorage = (game: GameRecord): void => {
  try {
    const savedGames: GameRecord[] = JSON.parse(localStorage.getItem('rpsGames') || '[]');
    savedGames.push(game);
    localStorage.setItem('rpsGames', JSON.stringify(savedGames));
  } catch (error) {
    console.error('Error saving game to storage:', error);
  }
};

export const getGamesFromStorage = (): GameRecord[] => {
  try {
    return JSON.parse(localStorage.getItem('rpsGames') || '[]');
  } catch (error) {
    console.error('Error loading games from storage:', error);
    return [];
  }
};

export const clearGamesStorage = (): void => {
  localStorage.setItem('rpsGames', '[]');
};

export const getGameStats = (games: GameRecord[]) => {
  return games.reduce(
    (stats, game) => {
      stats[game.result]++;
      return stats;
    },
    { win: 0, lose: 0, draw: 0 }
  );
};
