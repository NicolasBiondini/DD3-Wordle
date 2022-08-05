import React from "react";
import Button from "./Button";

type Props = {
  toogleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ toogleModal }: Props) => {
  return (
    <div className="w-screen h-screen z-20	 bg-light/[.4] fixed top-0 left-0 flex  justify-center items-center">
      <div className="bg-light dark:bg-backDark w-1/3 h-5/6 rounded-xl border-base dark:border-backLight border-4 flex flex-col gap-2 justify-evenly items-center p-8">
        <h1 className="text-3xl font-bold">Cómo jugar?</h1>
        <div className="flex h-32 flex-col items-start justify-around text-sm">
          <p>Adivina la palabra oculta en cinco intentos.</p>
          <p>Cada intento debe ser una palabra válida de 5 letras.</p>
          <p>
            Después de cada intento el color de las letras cambia para mostrar
            que tan cerca estás de acertar la palabra
          </p>
        </div>
        <h2 className="text-xl font-semibold self-start">Ejemplos</h2>
        <div className="flex flex-row gap-2">
          {["G", "A", "T", "O", "S"].map((letter) => {
            return (
              <div
                key={letter}
                className={`${
                  letter === "G" ? "bg-green" : "bg-white"
                } text-black w-[76px] h-[75px] text-[45px] flex items-center justify-center rounded font-extrabold
                  border-2 border-base 
                `}
              >
                {letter}
              </div>
            );
          })}
        </div>
        <p className="self-start text-sm">
          La letra <span className="font-semibold">G</span> está en la palabra y
          en la posición correcta.
        </p>
        <div className="flex flex-row gap-2">
          {["V", "O", "C", "A", "L"].map((letter) => {
            return (
              <div
                key={letter}
                className={`${
                  letter === "C" ? "bg-yellow" : "bg-white"
                } text-black w-[76px] h-[75px] text-[45px] flex items-center justify-center rounded font-extrabold
                  border-2 border-base 
                `}
              >
                {letter}
              </div>
            );
          })}
        </div>
        <p className="self-start text-sm">
          La letra <span className="font-semibold">C</span> está en la palabra
          pero en la posición incorrecta.
        </p>
        <div className="flex flex-row gap-2">
          {["C", "A", "N", "T", "O"].map((letter) => {
            return (
              <div
                key={letter}
                className={`${
                  letter === "O" ? "bg-grey" : "bg-white"
                } text-black w-[76px] h-[75px] text-[45px] flex items-center justify-center rounded font-extrabold
                  border-2 border-base 
                `}
              >
                {letter}
              </div>
            );
          })}
        </div>
        <p className="self-start text-sm">
          La letra <span className="font-semibold">O</span> no está en la
          palabra.
        </p>
        <p className="self-start" text-sm>
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
        <p className="text-sm">¡Una palabra nueva cada 5 minutos!</p>
        <Button toogleModal={toogleModal} first={true} text={"¡JUGAR!"} />
      </div>
    </div>
  );
};

export default Modal;
