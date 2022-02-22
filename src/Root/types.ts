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
