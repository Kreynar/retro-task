import React from "react";
import { getClassName } from "../../getClassName";
import { getHasUserEvaluatedSprint } from "../../sprintEvaluationsUtils";
import { SprintEvaluation } from "../../types";
import { User } from "../types";

interface UserCardProps {
  user: User;
  selectedSprintEvaluation: SprintEvaluation;
  setSelectedUser: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  selectedSprintEvaluation,
  setSelectedUser,
}) => {
  const hasUserEvaluatedSprint = getHasUserEvaluatedSprint(
    user,
    selectedSprintEvaluation
  );
  return (
    <button
      onClick={() =>
        hasUserEvaluatedSprint ? undefined : setSelectedUser(user)
      }
      className={getClassName(
        `flex flex-col place-items-center w-40 h-40 m-2 shadow-md shadow-slate-300 rounded`,
        hasUserEvaluatedSprint && "opacity-50",
        !hasUserEvaluatedSprint && "hover:shadow-slate-500"
      )}
      key={user.id}
    >
      <div className="h-8 w-full">
        {hasUserEvaluatedSprint && (
          <div className="h-4 w-fit mx-4 mt-3 uppercase bg-orange-500 text-xs font-bold px-2 text-white">
            voted
          </div>
        )}
      </div>
      <img
        src={user.profile_photo}
        alt="photo"
        className="rounded-full w-20 h-20"
      />
      <div className="font-bold">{user.name}</div>
      <div className="text-xs">{user.team}</div>
    </button>
  );
};
