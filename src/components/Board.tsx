import { useContext, useEffect } from "react";
import { GameContext } from "../context/GameProvider";
import Letter from "./Letter";

type Props = {};

const Board = (props: Props) => {
  const { board, modifyBoard, newGame, modifyGameState } =
    useContext(GameContext);

  useEffect(() => {
    if (newGame) {
      modifyBoard([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ]);
      modifyGameState({ lineIndex: 0, letterIndex: 0 });
    }
  }, [newGame]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {board.map((line, indexLine) => {
        return line.map((letter, indexLetter) => {
          return (
            <Letter
              key={`${line}${indexLetter}${letter}${indexLine}`}
              letter={letter}
              indexLine={indexLine}
              indexLetter={indexLetter}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
