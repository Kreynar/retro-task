import React from "react";
import perchieLogo from "../perchie.png";

interface GenericScreenProps {
  text: string;
}

export const GenericScreen: React.FC<GenericScreenProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={perchieLogo} alt="Perchie" className="w-60 -mb-5" />
      <h1 className="font-bold text-2xl">{text}</h1>
    </div>
  );
};
