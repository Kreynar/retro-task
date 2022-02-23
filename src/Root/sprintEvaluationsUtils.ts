import { SprintEvaluation, SprintEvaluations, User } from "../types";

/**
 * @returns an array of ascending sprint IDs or empty array, if no sprint evaluations
 */
export const getAscendingSprintIds = (
  sprintEvaluations: SprintEvaluations
): number[] => {
  const ascendingSprintIds = Object.keys(sprintEvaluations)
    .map((sprintIdString) => Number(sprintIdString))
    .sort((a, b) => a - b);
  return ascendingSprintIds;
};

/**
 * @returns an array of ascending evaluated sprint IDs or empty array, if
 * no sprint evaluations or only single sprint evaluation and it's in progress.
 */
export const getAscendingEvaluatedSprintIds = (
  sprintEvaluations: SprintEvaluations
): number[] => {
  const ascendingSprintIds = getAscendingSprintIds(sprintEvaluations);
  if (!ascendingSprintIds.length) {
    return [];
  }
  const isEvaluationInProgressForLastSprint =
    getIsEvaluationInProgressForLastSprint(sprintEvaluations);
  if (isEvaluationInProgressForLastSprint) {
    ascendingSprintIds.pop();
    return ascendingSprintIds;
  }
  return ascendingSprintIds;
};

/**
 * @returns last sprint ID or undefined, if no sprint evaluations
 */
export const getLastSprintId = (
  sprintEvaluations: SprintEvaluations
): number | undefined => {
  const ascendingSprintIds = getAscendingSprintIds(sprintEvaluations);
  const lastSprintId = ascendingSprintIds[ascendingSprintIds.length - 1] as
    | number
    | undefined;
  return lastSprintId;
};

/**
 * @returns last evaluated sprint ID or undefined, if no sprint evaluations or only single sprint evaluation and it's in progress.
 */
export const getLastEvaluatedSprintId = (
  sprintEvaluations: SprintEvaluations
): number | undefined => {
  const ascendingEvaluatedSprintIds =
    getAscendingEvaluatedSprintIds(sprintEvaluations);
  const lastEvaluatedSprintId = ascendingEvaluatedSprintIds[
    ascendingEvaluatedSprintIds.length - 1
  ] as number | undefined;
  return lastEvaluatedSprintId;
};

/**
 * @returns false, if evaluation for last sprint is complete or no sprint evaluations, otherwise returns true
 */
export const getIsEvaluationInProgressForLastSprint = (
  sprintEvaluations: SprintEvaluations
): boolean => {
  const lastSprintId = getLastSprintId(sprintEvaluations);
  if (lastSprintId === undefined) {
    return false;
  }
  return sprintEvaluations[lastSprintId].isEvaluationInProgress;
};

export const getIsEvaluationInProgressForSelectedSprint = (
  sprintEvaluations: SprintEvaluations,
  selectedSprintId: number
): boolean => {
  const selectedSprint = sprintEvaluations[selectedSprintId];
  return selectedSprint.isEvaluationInProgress;
};

export const getHasUserEvaluatedSprint = (
  user: User,
  sprintEvaluation: SprintEvaluation
): boolean => {
  const idsOfUsersWhoEvaluatedSprint = Object.keys(
    sprintEvaluation.userEvaluations
  );
  const hasUserEvaluatedSprint = idsOfUsersWhoEvaluatedSprint.includes(user.id);
  return hasUserEvaluatedSprint;
};

export const getHaveAllUsersEvaluatedSprint = (
  users: User[],
  sprintEvaluation: SprintEvaluation
): boolean => {
  const userIds = users.map(({ id }) => id).map((id) => Number(id));
  const idsOfUsersWhoEvaluatedSprint = Object.keys(
    sprintEvaluation.userEvaluations
  ).map((id) => Number(id));
  const haveAllUsersEvaluatedSprint = userIds.every((userId) =>
    idsOfUsersWhoEvaluatedSprint.includes(userId)
  );
  return haveAllUsersEvaluatedSprint;
};
