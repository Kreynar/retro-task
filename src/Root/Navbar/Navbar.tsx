import React from "react";
import { Link } from "react-router-dom";
import { getClassName } from "../getClassName";
import {
  getAscendingEvaluatedSprintIds,
  getAscendingSprintIds,
  getIsEvaluationInProgressForLastSprint,
  getLastSprintId,
} from "../sprintEvaluationsUtils";
import { SprintEvaluations } from "../../types";
import perchpeekTitle from "./perchpeek-logo-white.png";

interface NavbarProps {
  sprintEvaluations: SprintEvaluations;
  selectedSprintId?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  sprintEvaluations,
  selectedSprintId,
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
              <Link
                to={`/sprints/${lastSprintId}`}
                className={getClassName(
                  `uppercase my-3 h-14 hover:backdrop-brightness-90 flex items-center justify-center`,
                  selectedSprintId === lastSprintId && "bg-blue-800"
                )}
              >
                current sprint
              </Link>
              <hr className="border-t-1 border-white m-8" />
            </>
          )}
          {!!ascendingEvaluatedSprintIds.length && (
            <section className="flex flex-col">
              <h3 className="uppercase text-xs">previous sprints</h3>
              {ascendingEvaluatedSprintIds.map((sprintId) => (
                <Link
                  to={`/sprints/${sprintId}`}
                  className={getClassName(
                    "my-3 h-10 hover:backdrop-brightness-90 flex items-center justify-center",
                    sprintId === selectedSprintId && "bg-blue-800"
                  )}
                  key={sprintId}
                >
                  Sprint #{sprintId}
                </Link>
              ))}
            </section>
          )}
        </>
      )}
    </nav>
  );
};
