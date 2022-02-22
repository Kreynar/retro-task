import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "./Navbar/Navbar";
import { Main } from "./Main/Main";
import { getSprintEvaluations } from "./getSprintEvaluations";
import { SprintEvaluations } from "./types";
import { addNewSprintEvaluation } from "./addNewSprintEvaluation";
import { getLastSprintId } from "./sprintEvaluationsUtils";

export const Root = () => {
  const [sprintEvaluations, setSprintEvaluations] = useState<SprintEvaluations>(
    {}
  );
  const [selectedSprintId, setSelectedSprintId] = useState<number>();

  useEffect(() => {
    getSprintEvaluations().then(setSprintEvaluations);
    setInterval(() => getSprintEvaluations().then(setSprintEvaluations), 500);
  }, []);

  const addNewSprintEvaluation_ = useCallback(() => {
    addNewSprintEvaluation().then((sprintEvaluations) => {
      setSprintEvaluations(sprintEvaluations);
      setSelectedSprintId(getLastSprintId(sprintEvaluations));
    });
  }, []);

  return (
    <div className="flex flex-row h-max w-max min-h-screen min-w-full">
      <Navbar
        sprintEvaluations={sprintEvaluations}
        selectedSprintId={selectedSprintId}
        setSelectedSprintId={setSelectedSprintId}
      />
      <Main
        sprintEvaluations={sprintEvaluations}
        selectedSprintId={selectedSprintId}
        addNewSprintEvaluation={addNewSprintEvaluation_}
      />
    </div>
  );
};
