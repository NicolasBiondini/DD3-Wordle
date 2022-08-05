import { useContext, useEffect } from "react";
import { GameContext } from "../context/GameProvider";

type Props = {
  letter: string;
  indexLine: number;
  indexLetter: number;
};

const Letter = ({ letter, indexLine, indexLetter }: Props) => {
  const { words, gameState, letters, modifyLetters, board, newGame } =
    useContext(GameContext);

  let green =
    words.selectedWord[indexLetter].toUpperCase() === letter.toUpperCase();

  let yellow =
    !green &&
    letter !== "" &&
    words.selectedWord.toUpperCase().includes(letter.toUpperCase());

  let grey =
    !green &&
    !yellow &&
    letter !== "" &&
    gameState.lineIndex >= 1 &&
    board[gameState.lineIndex - 1]
      .join("")
      .toUpperCase()
      .includes(letter.toUpperCase());

  let state = gameState.lineIndex > indexLine;

  let base = gameState.lineIndex <= indexLine;

  useEffect(() => {
    if (green) {
      // If it's not on the array, add the value
      if (!letters.green.includes(letter)) {
        let tempArr = letters.green;
        tempArr.push(letter);

        // Remove from yellow
        if (letters.yellow.includes(letter)) {
          let tempArrYellow = letters.yellow;
          const index = tempArrYellow.indexOf(letter);
          if (index > -1) {
            tempArrYellow.splice(index, 1);
          }
          modifyLetters({ ...letters, green: tempArr, yellow: tempArrYellow });
        } else {
          modifyLetters({ ...letters, green: tempArr });
        }
      }
    } else if (yellow) {
      if (!letters.yellow.includes(letter)) {
        let tempArr = letters.yellow;
        tempArr.push(letter);
        modifyLetters({ ...letters, yellow: tempArr });
      }
    } else if (grey) {
      if (!letters.grey.includes(letter)) {
        let tempArr = letters.grey;
        tempArr.push(letter);
        modifyLetters({ ...letters, grey: tempArr });
      }
    } else {
      return;
    }
  }, [gameState.lineIndex]);

  useEffect(() => {
    if (newGame) {
      modifyLetters({ green: [""], yellow: [""], grey: [""] });
    }
  }, [newGame]);

  return (
    <div
      className={`${letters.green.includes(letter) && "bg-green"} ${
        yellow && state && "bg-yellow"
      } ${
        letters.grey.includes(letter) && "bg-grey "
      } text-white w-[76px] h-[75px] text-[45px] flex items-center justify-center rounded font-extrabold ${
        base && "bg-base"
      }`}
    >
      {letter}
    </div>
  );
};

export default Letter;
