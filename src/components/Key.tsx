import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameProvider";
import Delete from "./icons/Delete";

type Props = {
  letter: string;
  large?: boolean;
};

const Key = ({ letter, large }: Props) => {
  const {
    newLine,
    deleteLetter,
    addLetter,
    letters,
    gameState,
    newGame,
    theme,
  } = useContext(GameContext);

  const [color, setColor] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (letter === "ENTER") {
      newLine();
    } else if (letter === "DEL") {
      deleteLetter();
    } else {
      addLetter(letter);
    }
  };

  useEffect(() => {
    if (letters.green.includes(letter)) {
      setColor("green");
    } else if (letters.yellow.includes(letter)) {
      setColor("yellow");
    } else if (letters.grey.includes(letter)) {
      setColor("grey");
    } else {
      return;
    }
  }, [gameState.lineIndex]);

  useEffect(() => {
    if (newGame) {
      setColor("");
    }
  }, [newGame]);

  return (
    <div
      className={`w-[44px] h-[50px] cursor-pointer flex items-center justify-center radius bg-lightKey dark:bg-darkKey ${
        large && "w-[61px]"
      } ${color === "green" && "bg-green dark:bg-green"} ${
        color === "yellow" && "bg-yellow dark:bg-yellow"
      } ${color === "grey" && "bg-grey dark:bg-grey"} `}
      onClick={(e) => handleClick(e)}
    >
      {letter === "DEL" ? (
        <Delete color={theme === "ligth" ? "black" : "white"} />
      ) : (
        <> {letter} </>
      )}
    </div>
  );
};

export default Key;
