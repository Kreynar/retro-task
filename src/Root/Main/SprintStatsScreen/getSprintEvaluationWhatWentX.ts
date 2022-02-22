import { SprintEvaluation } from "../../types";

export const getSprintEvaluationWhatWentX = (
  sprintEvaluation: SprintEvaluation
): {
  whatWentRight: string[];
  whatWentWrong: string[];
  whatToImprove: string[];
} => {
  const { userEvaluations } = sprintEvaluation;
  const whatWentRight: string[] = [];
  const whatWentWrong: string[] = [];
  const whatToImprove: string[] = [];
  Object.keys(userEvaluations).forEach((userId) => {
    whatWentRight.push(...userEvaluations[Number(userId)].whatWentRight);
    whatWentWrong.push(...userEvaluations[Number(userId)].whatWentWrong);
    whatToImprove.push(...userEvaluations[Number(userId)].whatToImprove);
  });
  return {
    whatWentRight,
    whatWentWrong,
    whatToImprove,
  };
};
