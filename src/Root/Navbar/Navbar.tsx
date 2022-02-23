import React from "react";
import { NavLink } from "react-router-dom";
import { useSprintEvaluations } from "../../SprintEvaluationsProvider";
import { getClassName } from "../getClassName";
import {
  getAscendingEvaluatedSprintIds,
  getAscendingSprintIds,
  getIsEvaluationInProgressForLastSprint,
  getLastSprintId,
} from "../sprintEvaluationsUtils";
import perchpeekTitle from "./perchpeek-logo-white.png";

export const Navbar: React.FC = () => {
  const sprintEvaluations = useSprintEvaluations();
  // TODO: use overloaded functions to optimize
  const ascendingSprintIds = getAscendingSprintIds(sprintEvaluations);
  const lastSprintId = getLastSprintId(sprintEvaluations);
  const isEvaluationInProgressForLastSprint =
    getIsEvaluationInProgressForLastSprint(sprintEvaluations);
  const ascendingEvaluatedSprintIds =
    getAscendingEvaluatedSprintIds(sprintEvaluations);

  return (
    <nav className="w-80 max-w-xs min-w-max flex flex-col h-auto bg-blue-900 text-white text-center">
      <img src={perchpeekTitle} alt="Perchpeek" className="m-8" />
      {!!ascendingSprintIds.length && (
        <>
          {isEvaluationInProgressForLastSprint && (
            <>
              <NavLink
                to={`/sprints/${lastSprintId}`}
                className={(isActive) =>
                  getClassName(
                    `uppercase my-3 h-14 hover:backdrop-brightness-90 flex items-center justify-center`,
                    isActive.isActive && "bg-blue-800"
                  )
                }
              >
                current sprint
              </NavLink>
              <hr className="border-t-1 border-white m-8" />
            </>
          )}
          {!!ascendingEvaluatedSprintIds.length && (
            <section className="flex flex-col">
              <h3 className="uppercase text-xs">previous sprints</h3>
              {ascendingEvaluatedSprintIds.map((sprintId) => (
                <NavLink
                  to={`/sprints/${sprintId}`}
                  className={(isActive) =>
                    getClassName(
                      "my-3 h-10 hover:backdrop-brightness-90 flex items-center justify-center",
                      isActive.isActive && "bg-blue-800"
                    )
                  }
                  key={sprintId}
                >
                  Sprint #{sprintId}
                </NavLink>
              ))}
            </section>
          )}
        </>
      )}
    </nav>
  );
};
