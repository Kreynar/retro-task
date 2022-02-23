import React from "react";
import { useSprintEvaluations } from "../../../SprintEvaluationsProvider";
import { WhatWentX, WhatWentXType } from "../WhatWentX/WhatWentX";
import { getSprintEvaluationAverageScore } from "./getSprintEvaluationAverageScore";
import { getSprintEvaluationMentionedTags } from "./getSprintEvaluationMentionedTags";
import { getSprintEvaluationWhatWentX } from "./getSprintEvaluationWhatWentX";

interface SprintStatsScreenProps {
  selectedSprintId: number;
}

export const SprintStatsScreen: React.FC<SprintStatsScreenProps> = ({
  selectedSprintId,
}) => {
  const sprintEvaluations = useSprintEvaluations();
  const selectedSprintEvaluation = sprintEvaluations[selectedSprintId];
  const { whatWentRight, whatWentWrong, whatToImprove } =
    getSprintEvaluationWhatWentX(selectedSprintEvaluation);
  return (
    <section className="flex flex-col h-full">
      <h1 className="font-bold text-2xl mt-4 mb-6 ml-14">
        Sprint #{selectedSprintId}
      </h1>
      <div className="flex flex-col items-center h-5/6">
        <div className="font-bold m-5">
          The average score was:{" "}
          <span className="text-blue-800 text-lg">
            {getSprintEvaluationAverageScore(selectedSprintEvaluation)}
          </span>
        </div>
        <div className="font-bold flex flex-col m-5 text-center">
          The team mentioned the following tags:
          <div className="text-blue-800 text-lg flex flex-col items-center">
            {getSprintEvaluationMentionedTags(selectedSprintEvaluation).join(
              ", "
            )}
          </div>
        </div>
        <div className="m-5 flex flex-row h-full">
          <WhatWentX type={WhatWentXType.whatWentRight} items={whatWentRight} />
          <WhatWentX type={WhatWentXType.whatWentWrong} items={whatWentWrong} />
          <WhatWentX type={WhatWentXType.whatToImprove} items={whatToImprove} />
        </div>
      </div>
    </section>
  );
};
