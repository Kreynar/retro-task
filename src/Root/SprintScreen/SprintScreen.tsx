import React from "react";
import { useParams } from "react-router-dom";
import { useSprintEvaluations } from "../../SprintEvaluationsProvider";
import { GenericScreen } from "../GenericScreen/GenericScreen";
import { SprintStatsScreen } from "./SprintStatsScreen/SprintStats";
import { SprintVotingScreen } from "./SprintVotingScreen/SprintVotingScreen";

export const SprintScreen: React.FC = () => {
  const sprintEvaluations = useSprintEvaluations();
  const { sprintId } = useParams();

  const selectedSprintId = sprintId ? Number(sprintId) : undefined;
  const selectedSprintEvaluation =
    selectedSprintId !== undefined
      ? sprintEvaluations[selectedSprintId]
      : undefined;

  const isEvaluationInProgressForSelectedSprint =
    selectedSprintEvaluation?.isEvaluationInProgress;

  return (
    <main className="h-full">
      {!selectedSprintEvaluation ? (
        <GenericScreen text={`Sprint #${sprintId} not found`} />
      ) : (
        <>
          {isEvaluationInProgressForSelectedSprint ? (
            <SprintVotingScreen selectedSprintId={selectedSprintId as number} />
          ) : (
            <SprintStatsScreen selectedSprintId={selectedSprintId as number} />
          )}
        </>
      )}
    </main>
  );
};
