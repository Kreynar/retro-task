import { SprintEvaluation } from "../../types";

export const getSprintEvaluationMentionedTags = (
  sprintEvaluation: SprintEvaluation
): string[] => {
  const { userEvaluations } = sprintEvaluation;
  const sprintEvaluationMentionedTags: string[] = [];
  Object.keys(userEvaluations).forEach((userId) => {
    const userMentionedTags = userEvaluations[Number(userId)].tags;
    userMentionedTags.forEach((tag) => {
      if (!sprintEvaluationMentionedTags.includes(tag)) {
        sprintEvaluationMentionedTags.push(tag);
      }
    });
  });
  return sprintEvaluationMentionedTags;
};
