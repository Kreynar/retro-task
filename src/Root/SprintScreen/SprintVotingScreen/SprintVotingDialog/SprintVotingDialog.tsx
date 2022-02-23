import React, { useState } from "react";
import xIcon from "./x-icon.svg";
import { TAGS } from "./tags";
import { getClassName } from "../../../getClassName";
import { WhatWentX, WhatWentXType } from "../../WhatWentX/WhatWentX";
import { User, UserEvaluation } from "../../../../types";

interface SprintVotingDialogProps {
  selectedUser: User;
  selectedSprintId: number;
  submitDialog: (userEvaluation: UserEvaluation) => void;
  closeDialog: () => void;
}

export const SprintVotingDialog: React.FC<SprintVotingDialogProps> = ({
  selectedUser,
  selectedSprintId,
  submitDialog,
  closeDialog,
}) => {
  const [score, setScore] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [whatWentRight, setWhatWentRight] = useState<string[]>([]);
  const [whatWentWrong, setWhatWentWrong] = useState<string[]>([]);
  const [whatToImprove, setWhatToImprove] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setScore_ = (e: React.ChangeEvent<HTMLInputElement>) =>
    setScore(e.target.value);

  const addWhatWentRight = (item: string) =>
    setWhatWentRight((items) => [...items, item]);
  const addWhatWentWrong = (item: string) =>
    setWhatWentWrong((items) => [...items, item]);
  const addWhatToImprove = (item: string) =>
    setWhatToImprove((items) => [...items, item]);

  const onTagClick = (clickedTag: string) => {
    if (selectedTags.includes(clickedTag)) {
      setSelectedTags(() => selectedTags.filter((tag) => tag !== clickedTag));
      return;
    }
    setSelectedTags(() => [...selectedTags, clickedTag]);
  };

  const submitDialog_ = () => {
    if (score === "") {
      setErrorMessage("Please enter score");
      return;
    }
    const scoreNumber = Number(score);
    if (scoreNumber < 0 || scoreNumber > 10) {
      setErrorMessage("Score must be 0 - 10");
      return;
    }
    if (selectedTags.length > 3) {
      setErrorMessage("Please select no more than 3 tags");
      return;
    }
    const userEvaluation: UserEvaluation = {
      score: scoreNumber,
      tags: selectedTags,
      whatWentRight,
      whatWentWrong,
      whatToImprove,
    };
    submitDialog(userEvaluation);
  };

  return (
    <div className="fixed z-50 inset-0 bg-slate-300 bg-opacity-60 overflow-y-auto h-full w-full flex items-center">
      <div className="flex flex-col place-items-center p-8 relative mx-auto shadow-lg rounded-xl bg-white max-w-2xl">
        <div className="w-full flex justify-between mb-4">
          <h1 className="text-lg font-bold">
            {selectedUser.name}, how did sprint #{selectedSprintId} go?
          </h1>
          <button onClick={closeDialog}>
            <img src={xIcon} />
          </button>
        </div>

        <div className="flex flex-col w-3/4">
          <section className="flex flex-col my-4">
            <h3 className="text-xs uppercase font-bold">overall score</h3>
            <input
              type="number"
              placeholder="Enter 0-10 score"
              className="border-2 rounded-md text-center w-52 self-center text-xs p-2"
              value={score}
              onChange={setScore_}
            />
          </section>
          <section className="flex flex-col my-4">
            <h3 className="text-xs uppercase font-bold">tags</h3>
            <div className="flex flex-wrap justify-center max-w-full w-full">
              {TAGS.map((tag) => (
                <button
                  onClick={() => onTagClick(tag)}
                  className={getClassName(
                    "border-2 border-blue-800 rounded-md m-0.5 w-fit px-4 ",
                    selectedTags.includes(tag)
                      ? "bg-blue-800 text-white"
                      : "bg-white text-blue-800 hover:brightness-90"
                  )}
                  key={tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>
          <div className="flex flex-row my-4 h-64">
            <WhatWentX
              type={WhatWentXType.whatWentRight}
              items={whatWentRight}
              addItem={addWhatWentRight}
            />
            <WhatWentX
              type={WhatWentXType.whatWentWrong}
              items={whatWentWrong}
              addItem={addWhatWentWrong}
            />
            <WhatWentX
              type={WhatWentXType.whatToImprove}
              items={whatToImprove}
              addItem={addWhatToImprove}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse w-full mt-2">
          <div className="text-red-600 w-full -mr-8 text-center absolute text-lg pointer-events-none">
            {errorMessage}
          </div>
          <button
            className="font-bold text-xl uppercase z-51 hover:font-extrabold"
            onClick={submitDialog_}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
