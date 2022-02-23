export interface User {
  id: string;
  name: string;
  team: string;
  profile_photo: string;
}

export interface SprintEvaluations {
  [sprintId: number]: SprintEvaluation;
}

export interface SprintEvaluation {
  isEvaluationInProgress: boolean;
  userEvaluations: UserEvaluations;
}

export interface UserEvaluations {
  [userId: number]: UserEvaluation;
}

export interface UserEvaluation {
  score: number;
  tags: string[];
  whatWentRight: string[];
  whatWentWrong: string[];
  whatToImprove: string[];
}
