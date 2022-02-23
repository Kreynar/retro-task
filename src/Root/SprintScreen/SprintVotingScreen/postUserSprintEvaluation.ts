import { getSprintEvaluations } from "../../getSprintEvaluations";
import { getLastSprintId } from "../../sprintEvaluationsUtils";
import { SprintEvaluations, User, UserEvaluation } from "../../../types";

// In real world here should be a call to BE.
export const postUserSprintEvaluation = async (
  user: User,
  userEvaluation: UserEvaluation
): Promise<SprintEvaluations> => {
  const sprintEvaluations = await getSprintEvaluations();
  const lastSprintId = getLastSprintId(sprintEvaluations);

  // In this case we know, that lastSprintId is not undefined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  sprintEvaluations[lastSprintId!].userEvaluations[Number(user.id)] =
    userEvaluation;
  localStorage.setItem("sprintEvaluations", JSON.stringify(sprintEvaluations));
  return sprintEvaluations;
};
