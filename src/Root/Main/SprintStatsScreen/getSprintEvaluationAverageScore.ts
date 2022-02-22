import { SprintEvaluation } from "../../types";

export const getSprintEvaluationAverageScore = (
  sprintEvaluation: SprintEvaluation
): number => {
  const { userEvaluations } = sprintEvaluation;
  const sprintEvaluationTotalScore = Object.keys(userEvaluations).reduce(
    (totalScore, userId) => totalScore + userEvaluations[Number(userId)].score,
    0
  );
  const sprintEvaluationAverageScore =
    sprintEvaluationTotalScore / Object.keys(userEvaluations).length;
  return sprintEvaluationAverageScore;
};
