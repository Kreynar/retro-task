import React, { useContext, useMemo, useState } from "react";
import { SprintEvaluations } from "./types";

const SprintEvaluationsContext = React.createContext<{
  sprintEvaluations: SprintEvaluations;
  setSprintEvaluations: (sprintEvaluations: SprintEvaluations) => void;
}>({ sprintEvaluations: {}, setSprintEvaluations: () => undefined });

export const useSprintEvaluations = () =>
  useContext(SprintEvaluationsContext).sprintEvaluations;

export const useSetSprintEvaluations = () =>
  useContext(SprintEvaluationsContext).setSprintEvaluations;

export const SprintEvaluationsProvider: React.FC = ({ children }) => {
  const [sprintEvaluations, setSprintEvaluations] = useState<SprintEvaluations>(
    {}
  );
  
  const value = useMemo(
    () => ({ sprintEvaluations, setSprintEvaluations }),
    [sprintEvaluations]
  );

  return (
    <SprintEvaluationsContext.Provider value={value}>
      {children}
    </SprintEvaluationsContext.Provider>
  );
};
