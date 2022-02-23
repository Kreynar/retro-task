import { getLastSprintId } from "./sprintEvaluationsUtils";
import { SprintEvaluations } from "../types";

export const addNewSprintEvaluation = (): Promise<SprintEvaluations> => {
  // In real world here should be a call to BE.
  const sprintEvaluations: SprintEvaluations = JSON.parse(
    localStorage.getItem("sprintEvaluations") || "{}"
  );
  const lastSprintId = getLastSprintId(sprintEvaluations);
  const newSprintId = lastSprintId === undefined ? 1 : lastSprintId + 1;
  const sprintEvaluationsWithNewSprint: SprintEvaluations = {
    ...sprintEvaluations,
    // Type conversion to make TS type checking work.
    [Number(newSprintId)]: {
      isEvaluationInProgress: true,
      userEvaluations: {},
    },
  };
  localStorage.setItem(
    "sprintEvaluations",
    JSON.stringify(sprintEvaluationsWithNewSprint)
  );
  return Promise.resolve(sprintEvaluationsWithNewSprint);
};
