import React, { useContext } from "react";
import { GameContext } from "../context/GameProvider";

type Props = {
  text: string;
  toogleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  first?: boolean;
};

const Button = ({ text, toogleModal, first }: Props) => {
  const { playerStats, modifyStartCount, modifyNewGame } =
    useContext(GameContext);

  return (
    <button
      onClick={() => {
        if (toogleModal !== undefined) {
          if (first) {
            modifyStartCount(true);
          }
          if (
            playerStats.currentStatus === "WIN" ||
            playerStats.currentStatus === "LOSE"
          ) {
            modifyNewGame(true);
          }
          toogleModal(false);
        }
      }}
      className="bg-green px-12 py-2 font-semibold text-2xl text-white rounded-md"
    >
      {text}
    </button>
  );
};

export default Button;
