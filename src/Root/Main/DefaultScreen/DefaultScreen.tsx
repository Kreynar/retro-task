import React from "react";
import perchieLogo from "../perchie.png";

export const DefaultScreen = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={perchieLogo} alt="Perchie" className="w-60 -mb-5" />
      <h1 className="font-bold text-2xl">
        Select previous or create a new sprint
      </h1>
    </div>
  );
};
