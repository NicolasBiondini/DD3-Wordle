import React, { useEffect, useContext, useState, useRef } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import ResultModal from "./components/ResultModal";

import { GameContext } from "./context/GameProvider";
import { selectWords } from "./helpers/selectWords";
import More from "./components/icons/More";
import InfoLogo from "./components/icons/InfoLogo";
import Toogle from "./components/Toogle";

function App() {
  const {
    newGame,
    modifyNewGame,
    theme,
    modifyTheme,
    modifyWords,
    resultModal,
    modifyResultModal,
    playerStats,
    modifyPlayerStats,
  } = useContext(GameContext);
  const [infoModal, setInfoModal] = useState(true);

  const handleTheme = () => {
    let newTheme = theme === "ligth" ? "dark" : "ligth";
    modifyTheme(newTheme);
  };

  useEffect(() => {
    (async () => {
      const { selectedWord, finalWords } = await selectWords();
      modifyWords({ selectedWord, finalWords });
      modifyPlayerStats({ ...playerStats, start: true });
    })();
  }, []);

  const preventFirstTime = useRef(false);

  useEffect(() => {
    if (preventFirstTime.current && newGame) {
      modifyNewGame(false);
    }
    preventFirstTime.current = true;
  }, [newGame]);

  return (
    <div className="w-100 h-screen flex flex-col gap-16 font-roboto items-center justify-center bg-backLight text-fontLight dark:text-fontDark dark:bg-backDark">
      {infoModal && <Modal toogleModal={setInfoModal} />}
      {resultModal && <ResultModal toogleModal={modifyResultModal} />}
      <div className="w-[600px] h-[84px] mt-[83px] rounded-2xl flex flex-row items-center justify-between	px-6 bg-light dark:bg-dark">
        <div
          className="cursor-pointer"
          onClick={() => setInfoModal(!infoModal)}
        >
          <InfoLogo
            color={theme === "ligth" ? "rgba(147, 155, 159, 0.3)" : "#262B3C"}
          />
        </div>
        <h1 className="font-bold text-4xl">WORDLE</h1>
        <div className="flex flex-row gap-2">
          <div className="cursor-pointer" onClick={() => modifyResultModal()}>
            <More
              color={theme === "ligth" ? "rgba(147, 155, 159, 0.3)" : "#262B3C"}
            />
          </div>
          <Toogle handleTheme={handleTheme} />
        </div>
      </div>
      <Board />
      <Keyboard />
    </div>
  );
}

export default App;
