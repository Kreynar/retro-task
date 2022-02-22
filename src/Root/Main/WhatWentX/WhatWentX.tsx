import React, { useMemo, useState } from "react";
import xIcon from "./x-icon.svg";
import plusIcon from "./plus-icon.svg";
import checkIcon from "./check-icon.svg";
import { getClassName } from "../../getClassName";

export const enum WhatWentXType {
  whatWentRight = "whatWentRight",
  whatWentWrong = "whatWentWrong",
  whatToImprove = "whatToImprove",
}

interface WhatWentXProps {
  type: WhatWentXType;
  items: string[];
  addItem?: (item: string) => void;
}

export const WhatWentX: React.FC<WhatWentXProps> = ({
  type,
  items,
  addItem,
}) => {
  const [isNewItemInputShown, setIsNewItemInputShown] = useState(false);
  const [newItem, setNewItem] = useState("");

  const toggleIsNewItemInputShown = () =>
    setIsNewItemInputShown((isShown) => !isShown);

  const onNewItemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewItem(e.target.value);
  };

  const submitNewItem = addItem
    ? () => {
        addItem(newItem);
        setNewItem("");
        setIsNewItemInputShown(false);
      }
    : undefined;

  const { title, titleBackGroundColorClass } = useMemo(() => {
    if (type === WhatWentXType.whatWentRight) {
      return {
        title: "What went right?",
        titleBackGroundColorClass: "bg-emerald-500",
      };
    }
    if (type === WhatWentXType.whatWentWrong) {
      return {
        title: "What went wrong?",
        titleBackGroundColorClass: "bg-orange-500",
      };
    }
    return {
      title: "What to improve?",
      titleBackGroundColorClass: "bg-amber-500",
    };
  }, [type]);

  return (
    <section className="h-full w-40 flex flex-col border relative">
      <div
        className={getClassName(
          "h-12 text-white text-md flex items-center justify-center",
          titleBackGroundColorClass
        )}
      >
        <h4 className="text-sm">{title}</h4>
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden w-full">
        <ul className="list-disc list-inside p-1">
          {items.map((item, index) => (
            <>
              <li key={index} className="text-sm list-item">
                {item}
              </li>
            </>
          ))}
          {isNewItemInputShown && (
            <div>
              <textarea
                value={newItem}
                onChange={onNewItemChange}
                placeholder="Enter your thoughts"
                className="border rounded-md max-w-full text-sm px-1 w-full"
              />
              <button
                onClick={toggleIsNewItemInputShown}
                className="w-5 h-5 -my-1"
              >
                <img src={xIcon} alt="close" />
              </button>
              <button onClick={submitNewItem} className="w-5 h-5 -my-1">
                <img src={checkIcon} alt="add" />
              </button>
            </div>
          )}
        </ul>
      </div>
      {!!submitNewItem && (
        <button
          onClick={toggleIsNewItemInputShown}
          className="absolute right-5 bottom-2 bg-slate-100 rounded-sm w-5 h-5"
        >
          <img src={plusIcon} alt="add" />
        </button>
      )}
    </section>
  );
};
