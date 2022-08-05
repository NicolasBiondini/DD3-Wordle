import React, { useCallback, useEffect, useContext } from "react";
import { GameContext } from "../context/GameProvider";
import Key from "./Key";

type Props = {};

const Keyboard = (props: Props) => {
  const { board, gameState, newLine, deleteLetter, addLetter } =
    useContext(GameContext);

  const qwerty = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        newLine();
      } else if (e.key === "Backspace") {
        deleteLetter();
      } else {
        qwerty.forEach((line) => {
          if (line.includes(e.key.toUpperCase())) {
            addLetter(e.key.toUpperCase());
          }
        });
      }
    },
    [board, gameState]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="w-[638px] h-[238px] mb-[165px] flex flex-col gap-2 justify-center items-center rounded-2xl bg-backKey dark:bg-darkKey/[0.4]"
    >
      {qwerty.map((line, index) => {
        return (
          <div key={`${index}line`} className="flex flex-row gap-2">
            {index === 2 && <Key letter="ENTER" large={true} />}
            {line.map((key, index) => {
              return <Key key={index} letter={key} />;
            })}
            {index === 2 && <Key letter="DEL" large={true} />}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
