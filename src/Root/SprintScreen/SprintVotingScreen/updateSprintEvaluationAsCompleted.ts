import { getSprintEvaluations } from "../../getSprintEvaluations";

// In real world here should be a call to BE.
export const updateSprintEvaluationAsCompleted = async (sprintId: number) => {
  const sprintEvaluations = await getSprintEvaluations();
  sprintEvaluations[sprintId].isEvaluationInProgress = false;
  localStorage.setItem("sprintEvaluations", JSON.stringify(sprintEvaluations));
};
