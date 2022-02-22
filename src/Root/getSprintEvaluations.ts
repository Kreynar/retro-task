import { SprintEvaluations } from "./types";

export const getSprintEvaluations = (): Promise<SprintEvaluations> => {
  // In real world here should be a call to BE.
  // Preferrably, client would call server/DB and check, if update timestamp
  // has changed. If not - then no need to for server to return the data.
  const sprintEvaluationsString =
    localStorage.getItem("sprintEvaluations") || "{}";
  const sprintEvaluations = JSON.parse(sprintEvaluationsString);
  return Promise.resolve(sprintEvaluations);
};
