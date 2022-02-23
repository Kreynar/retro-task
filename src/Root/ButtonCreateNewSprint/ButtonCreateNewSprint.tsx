import React from "react";
import { getClassName } from "../getClassName";

interface ButtonCreateNewSprintProps {
  isEvaluationInProgressForLastSprint: boolean;
  addNewSprintEvaluation: () => void;
}

export const ButtonCreateNewSprint: React.FC<ButtonCreateNewSprintProps> = ({
  isEvaluationInProgressForLastSprint,
  addNewSprintEvaluation,
}) => {
  return (
    <button
      className={getClassName(
        "uppercase text-blue-800 w-32 mr-4 font-bold",
        isEvaluationInProgressForLastSprint && "text-blue-200",
        !isEvaluationInProgressForLastSprint && "hover:font-extrabold"
      )}
      onClick={
        isEvaluationInProgressForLastSprint ? undefined : addNewSprintEvaluation
      }
    >
      create new sprint
    </button>
  );
};
