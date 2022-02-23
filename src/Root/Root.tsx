import React, { useCallback, useEffect } from "react";
import { Navbar } from "./Navbar/Navbar";
import { getSprintEvaluations } from "./getSprintEvaluations";
import { addNewSprintEvaluation } from "./addNewSprintEvaluation";
import {
  getIsEvaluationInProgressForLastSprint,
  getLastSprintId,
} from "./sprintEvaluationsUtils";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GenericScreen } from "./GenericScreen/GenericScreen";
import { ButtonCreateNewSprint } from "./ButtonCreateNewSprint/ButtonCreateNewSprint";
import { SprintScreen } from "./SprintScreen/SprintScreen";
import {
  useSetSprintEvaluations,
  useSprintEvaluations,
} from "../SprintEvaluationsProvider";

export const Root = () => {
  const navigate = useNavigate();
  const sprintEvaluations = useSprintEvaluations();
  const setSprintEvaluations = useSetSprintEvaluations();

  useEffect(() => {
    getSprintEvaluations().then(setSprintEvaluations);
    setInterval(() => getSprintEvaluations().then(setSprintEvaluations), 500);
  }, []);

  const addNewSprintEvaluation_ = useCallback(() => {
    addNewSprintEvaluation().then((sprintEvaluations) => {
      setSprintEvaluations(sprintEvaluations);
      navigate(`/sprints/${getLastSprintId(sprintEvaluations)}`);
    });
  }, []);

  const isEvaluationInProgressForLastSprint =
    getIsEvaluationInProgressForLastSprint(sprintEvaluations);

  return (
    <div className="flex flex-row h-max w-max min-h-screen min-w-full">
      <Navbar />
      <div className="w-full flex flex-col">
        <header className="h-20 border-b-2 border-gray-300 flex flex-row-reverse">
          <ButtonCreateNewSprint
            isEvaluationInProgressForLastSprint={
              isEvaluationInProgressForLastSprint
            }
            addNewSprintEvaluation={addNewSprintEvaluation_}
          />
        </header>
        <main className="h-full">
          <Routes>
            <Route
              path="/"
              element={
                <GenericScreen text="Select existing or create a new sprint" />
              }
            />
            <Route path="/sprints/:sprintId" element={<SprintScreen />} />
            <Route path="*" element={<GenericScreen text="Page not found" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
