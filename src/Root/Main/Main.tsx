import React from "react";
import { getClassName } from "../getClassName";
import {
  getAscendingSprintIds,
  getIsEvaluationInProgressForLastSprint,
  getLastSprintId,
} from "../sprintEvaluationsUtils";
import { SprintEvaluations } from "../types";
import { DefaultScreen } from "./DefaultScreen/DefaultScreen";
import { SprintStatsScreen } from "./SprintStatsScreen/SprintStats";
import { SprintVotingScreen } from "./SprintVotingScreen/SprintVotingScreen";

interface MainProps {
  sprintEvaluations: SprintEvaluations;
  selectedSprintId?: number;
  addNewSprintEvaluation: () => void;
}

export const Main: React.FC<MainProps> = ({
  sprintEvaluations,
  selectedSprintId,
  addNewSprintEvaluation,
}) => {
  const isEvaluationInProgressForLastSprint =
    getIsEvaluationInProgressForLastSprint(sprintEvaluations);
  const lastSprintId = getLastSprintId(sprintEvaluations);
  const isEvaluationInProgressSprintSelected =
    isEvaluationInProgressForLastSprint && selectedSprintId === lastSprintId;

  return (
    <div className="w-full flex flex-col">
      <header className="h-20 border-b-2 border-gray-300 flex flex-row-reverse">
        <button
          className={getClassName(
            "uppercase text-blue-800 w-36 mr-4 font-bold",
            isEvaluationInProgressForLastSprint && "text-blue-200"
          )}
          onClick={
            isEvaluationInProgressForLastSprint
              ? undefined
              : addNewSprintEvaluation
          }
        >
          create new sprint
        </button>
      </header>
      <main className="h-full">
        {selectedSprintId === undefined ? (
          <DefaultScreen />
        ) : isEvaluationInProgressSprintSelected ? (
          <SprintVotingScreen
            selectedSprintId={selectedSprintId}
            selectedSprintEvaluation={sprintEvaluations[selectedSprintId]}
          />
        ) : (
          <SprintStatsScreen
            selectedSprintId={selectedSprintId}
            selectedSprintEvaluation={sprintEvaluations[selectedSprintId]}
          />
        )}
      </main>
    </div>
  );
};
