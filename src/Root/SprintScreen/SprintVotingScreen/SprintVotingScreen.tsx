import React, { useCallback, useEffect, useState } from "react";
import perchieLogo from "../../perchie.png";
import { getUsers } from "./getUsers";
import { SprintVotingDialog } from "./SprintVotingDialog/SprintVotingDialog";
import { User, UserEvaluation } from "../../../types";
import { getHaveAllUsersEvaluatedSprint } from "../../sprintEvaluationsUtils";
import { postUserSprintEvaluation } from "./postUserSprintEvaluation";
import { updateSprintEvaluationAsCompleted } from "./updateSprintEvaluationAsCompleted";
import { UserCard } from "./UserCard";
import { useSprintEvaluations } from "../../../SprintEvaluationsProvider";

interface SprintVotingScreenProps {
  selectedSprintId: number;
}

export const SprintVotingScreen: React.FC<SprintVotingScreenProps> = ({
  selectedSprintId,
}) => {
  const sprintEvaluations = useSprintEvaluations();

  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const closeDialog = useCallback(() => setSelectedUser(null), []);
  const submitDialog = useCallback(
    async (userEvaluation: UserEvaluation) => {
      const sprintEvaluations = await postUserSprintEvaluation(
        selectedUser as User,
        userEvaluation
      );
      const haveAllUsersEvaluatedSprint = getHaveAllUsersEvaluatedSprint(
        users as User[],
        sprintEvaluations[selectedSprintId]
      );
      if (haveAllUsersEvaluatedSprint) {
        updateSprintEvaluationAsCompleted(selectedSprintId);
      }
      setSelectedUser(null);
    },
    [users, selectedUser]
  );

  return (
    <>
      {selectedUser && (
        <SprintVotingDialog
          selectedUser={selectedUser}
          selectedSprintId={selectedSprintId}
          submitDialog={submitDialog}
          closeDialog={closeDialog}
        />
      )}
      <div className="flex flex-col items-center">
        <img src={perchieLogo} alt="Perchie" className="w-60 -mb-5" />
        {users === undefined ? (
          <h1 className="font-bold text-2xl">Loading user list...</h1>
        ) : users.length === 0 ? (
          <h1 className="font-bold text-2xl">No users found</h1>
        ) : (
          <>
            <h1 className="font-bold text-2xl mb-5">Voting in progress...</h1>
            <div className="flex flex-wrap justify-center max-w-fit">
              {users.map((user) => (
                <UserCard
                  user={user}
                  selectedSprintEvaluation={sprintEvaluations[selectedSprintId]}
                  setSelectedUser={setSelectedUser}
                  key={user.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
