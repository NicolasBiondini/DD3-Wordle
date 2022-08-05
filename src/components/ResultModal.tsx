import React, { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import Button from "./Button";
import { parseTime } from "../helpers/parseTime";

type Props = {
  toogleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResultModal = ({ toogleModal }: Props) => {
  const { words, playerStats, time } = useContext(GameContext);

  const { minutes, seconds } = parseTime(time);

  return (
    <div className="w-screen h-screen bg-light/[.4] fixed top-0 left-0 flex  justify-center items-center ">
      <div className="bg-light dark:bg-backDark w-1/3 h-100 rounded-xl border-base dark:border-backLight border-4 flex flex-col gap-8 justify-evenly items-center p-8">
        <h1 className="text-3xl font-bold pt-10">Estadísticas</h1>
        <div className="flex flex-row justify-around w-5/6">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-bold">{playerStats.gameNumber}</h2>
            <h3 className="text-xl ">Jugadas</h3>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-bold">{playerStats.winNumber}</h2>
            <h3 className="text-xl ">Victorias</h3>
          </div>
        </div>
        {playerStats.currentStatus !== "PENDING" && (
          <div>
            <p>
              La palabra era :{" "}
              <span className="font-bold">{words.selectedWord}</span>
            </p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="">SIGUIENTE PALABRA</p>
          <p className="font-bold">
            {minutes}:{seconds}
          </p>
        </div>
        <Button toogleModal={toogleModal} text={"Aceptar"} />
      </div>
    </div>
  );
};

export default ResultModal;
