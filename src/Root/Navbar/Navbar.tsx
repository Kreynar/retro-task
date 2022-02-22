import React from "react";
import { getClassName } from "../getClassName";
import {
  getAscendingEvaluatedSprintIds,
  getAscendingSprintIds,
  getIsEvaluationInProgressForLastSprint,
  getLastSprintId,
} from "../sprintEvaluationsUtils";
import { SprintEvaluations } from "../types";
import perchpeekTitle from "./perchpeek-logo-white.png";

interface NavbarProps {
  sprintEvaluations: SprintEvaluations;
  selectedSprintId?: number;
  setSelectedSprintId: (selectedSprintId: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  sprintEvaluations,
  selectedSprintId,
  setSelectedSprintId,
}) => {
  const ascendingSprintIds = getAscendingSprintIds(sprintEvaluations);
  const lastSprintId = getLastSprintId(sprintEvaluations);
  const isEvaluationInProgressForLastSprint =
    getIsEvaluationInProgressForLastSprint(sprintEvaluations);
  const ascendingEvaluatedSprintIds =
    getAscendingEvaluatedSprintIds(sprintEvaluations);

  return (
    <nav className="w-80 flex flex-col h-auto bg-blue-900 text-white text-center">
      <img src={perchpeekTitle} alt="Perchpeek" className="m-8" />
      {!!ascendingSprintIds.length && (
        <>
          {isEvaluationInProgressForLastSprint && (
            <>
              <button
                onClick={() => setSelectedSprintId(lastSprintId as number)}
                className={getClassName(
                  `uppercase my-3 h-14 hover:backdrop-brightness-90`,
                  selectedSprintId === lastSprintId && "bg-blue-800"
                )}
              >
                current sprint
              </button>
              <hr className="border-t-1 border-white m-8" />
            </>
          )}
          {!!ascendingEvaluatedSprintIds.length && (
            <section className="flex flex-col">
              <h3 className="uppercase text-xs">previous sprints</h3>
              {ascendingEvaluatedSprintIds.map((sprintId) => (
                <button
                  onClick={() => setSelectedSprintId(sprintId)}
                  className={getClassName(
                    "my-3 h-10 hover:backdrop-brightness-90 ",
                    sprintId === selectedSprintId && "bg-blue-800"
                  )}
                  key={sprintId}
                >
                  Sprint #{sprintId}
                </button>
              ))}
            </section>
          )}
        </>
      )}
    </nav>
  );
};
