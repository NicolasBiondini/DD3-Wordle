import { createContext, useEffect, useRef, useState } from "react";

interface gameState {
  lineIndex: number;
  letterIndex: number;
}

interface playerStats {
  start: boolean;
  currentStatus: string;
  gameNumber: number;
  winNumber: number;
}

interface gameStructure {
  newGame: boolean;
  modifyNewGame: (value: boolean) => void;
  theme: string;
  modifyTheme: (theme: string) => void;
  words: words;
  modifyWords: (words: words) => void;
  board: string[][];
  modifyBoard: (newGame: string[][]) => void;
  gameState: gameState;
  modifyGameState: (newGameState: gameState) => void;
  letters: letters;
  modifyLetters: (newLetters: letters) => void;
  playerStats: playerStats;
  modifyPlayerStats: (playerStats: playerStats) => void;
  newLine: () => void;
  deleteLetter: () => void;
  addLetter: (letter: string) => void;
  startNewGame: () => void;
  time: number;
  modifyStartCount: (value: boolean) => void;
  resultModal: boolean;
  modifyResultModal: () => void;
}

interface words {
  selectedWord: string;
  finalWords: Set<string>;
}

interface letters {
  green: string[];
  yellow: string[];
  grey: string[];
}

const initialMode = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const localStorageData = window.localStorage.getItem("color-theme");
    if (typeof localStorageData === "string") {
      return localStorageData;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  // Default Theme
  return "light";
};

const defaultState = {
  newGame: false,
  modifyNewGame: () => null,
  theme: initialMode(),
  modifyTheme: () => null,
  words: { selectedWord: "CASAS", finalWords: new Set([""]) },
  modifyWords: () => null,
  board: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  modifyBoard: () => null,
  gameState: { lineIndex: 0, letterIndex: 0 },
  modifyGameState: () => null,
  letters: { green: [""], yellow: [""], grey: [""] },
  modifyLetters: () => null,
  playerStats: {
    start: false,
    gameNumber: 0,
    winNumber: 0,
    currentStatus: "PENDING",
  },
  modifyPlayerStats: () => null,
  newLine: () => null,
  deleteLetter: () => null,
  addLetter: () => null,
  startNewGame: () => null,
  time: 0,
  modifyStartCount: () => null,
  resultModal: false,
  modifyResultModal: () => null,
};

export const GameContext = createContext<gameStructure>(defaultState);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const GameProvider = ({ children }: Props) => {
  const [newGame, setNewGame] = useState(false);
  const [theme, setTheme] = useState(defaultState.theme);
  const [board, setBoard] = useState(defaultState.board);
  const [gameState, setGameState] = useState(defaultState.gameState);
  const [words, setWords] = useState(defaultState.words);
  const [letters, setLetters] = useState(defaultState.letters);
  const [playerStats, setPlayerStats] = useState(defaultState.playerStats);
  const [time, setTime] = useState(defaultState.time);
  const [startCount, setStartCount] = useState(false);
  const [resultModal, setResultModal] = useState(defaultState.resultModal);

  // ModifyNewGame
  const modifyNewGame = (value: boolean) => {
    setNewGame(value);
    startNewGame();
  };

  // Save theme on LocalStorage
  const rawSetTheme = (rawTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);

    localStorage.setItem("color-theme", rawTheme);
  };

  // Modify Theme
  const modifyTheme = (theme: string) => {
    setTheme(theme);
  };

  // Modify state from the board
  const modifyBoard = (newBoard: string[][]) => {
    setBoard(newBoard);
  };

  // Modify state from the gameState
  const modifyGameState = (newGameState: gameState) => {
    setGameState(newGameState);
  };

  // Modify words from words
  const modifyWords = (words: words) => {
    setWords(words);
  };

  // Modify Letters
  const modifyLetters = (letters: letters) => {
    setLetters(letters);
  };

  // Modify PlayerStats
  const modifyPlayerStats = (playerStats: playerStats) => {
    setPlayerStats(playerStats);
  };

  // Manage inputs from the user related with the keys
  // Send the writed word and jump into the new line
  const newLine = () => {
    if (gameState.letterIndex !== 5)
      return alert(
        "Tienes que completar todos los caracteres antes de evniar el resultado!"
      );
    let posibleWord = board[gameState.lineIndex].join("");
    if (words.selectedWord === posibleWord.toUpperCase()) {
      // Last check
      // Add a victory and game
      modifyPlayerStats({
        ...playerStats,
        gameNumber: playerStats.gameNumber + 1,
        winNumber: playerStats.winNumber + 1,
        currentStatus: "WIN",
        start: false,
      });
      modifyStartCount(false);
      modifyResultModal();
    } else if (!words.finalWords.has(posibleWord.toUpperCase())) {
      return alert("Inserte una palabra correcta!");
    } else if (gameState.lineIndex === 4) {
      // LOSE CASE
      modifyPlayerStats({
        ...playerStats,
        gameNumber: playerStats.gameNumber + 1,
        currentStatus: "LOSE",
        start: false,
      });
      modifyStartCount(false);
      modifyResultModal();
    } else {
      // Else make jump of line
      modifyGameState({ lineIndex: gameState.lineIndex + 1, letterIndex: 0 });
    }
  };

  // Remove a letter from the board
  const deleteLetter = () => {
    if (gameState.letterIndex === 0)
      return alert("Primero inserta una letra si quieres borrar.");

    let newBoard = [...board];
    newBoard[gameState.lineIndex][gameState.letterIndex - 1] = "";
    modifyBoard(newBoard);
    modifyGameState({
      ...gameState,
      letterIndex: gameState.letterIndex - 1,
    });
  };

  // Add a new letter into the board
  const addLetter = (letter: string) => {
    // Check if the position is lower tha four
    if (gameState.letterIndex > 4) return;
    let newBoard = [...board];
    newBoard[gameState.lineIndex][gameState.letterIndex] = letter;
    modifyBoard(newBoard);
    modifyGameState({
      ...gameState,
      letterIndex: gameState.letterIndex + 1,
    });
  };

  // New Game
  const startNewGame = () => {
    // Select an unique and new word
    let tempArr = Array.from(words.finalWords);
    let newWord = tempArr.splice(Math.floor(Math.random() * tempArr.length), 1);
    let newSet = new Set(tempArr);
    modifyWords({ selectedWord: newWord[0], finalWords: newSet });

    // Restart Time
    modifyStartCount(true);
    modifyPlayerStats({
      ...playerStats,
      start: true,
      currentStatus: "PENDING",
    });
  };

  // Modify startGameCount
  const modifyStartCount = (value: boolean) => {
    if (value) {
      setStartCount(value);
    } else {
      setStartCount(value);
    }
  };

  const modifyResultModal = () => {
    setResultModal(!resultModal);
  };

  // Timer
  useEffect(() => {
    let intervalId: any;
    if (startCount) {
      setTime(60 * 5);
      intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [startCount]);

  useEffect(() => {
    if (time <= 0 && startCount) {
      modifyPlayerStats({
        ...playerStats,
        gameNumber: playerStats.gameNumber + 1,
      });

      setTime(5 * 60);
      //Restart Game

      modifyNewGame(true);
    }
  }, [time, startCount]);

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <GameContext.Provider
      value={{
        newGame,
        modifyNewGame,
        theme,
        modifyTheme,
        words,
        modifyWords,
        board,
        modifyBoard,
        gameState,
        modifyGameState,
        letters,
        modifyLetters,
        playerStats,
        modifyPlayerStats,
        newLine,
        deleteLetter,
        addLetter,
        startNewGame,
        time,
        modifyStartCount,
        resultModal,
        modifyResultModal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
