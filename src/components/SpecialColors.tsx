import React, { useState } from "react";
import Compact from "@uiw/react-color-compact";
import { copyToClipboard } from "../utils";

const SpecialColors = ({ setView }: { setView: (view: string) => void }) => {
  const [curColor, setCurColor] = useState<string>("#ffffff");
  const [buttonText, setButtonText] = useState<string>("OK");
  const onClickHandler = () => {
    setButtonText("Copied");
    setTimeout(() => {
      setButtonText("OK");
    }, 1000);
    copyToClipboard(curColor);
    chrome.action.setBadgeBackgroundColor({
      color: curColor,
    });
  };
  return (
    <div className="p-4 bg-gray-900">
      <Compact
        color={curColor}
        onChange={(color) => {
          setCurColor(color.hex);
        }}
        className="mb-2"
      />
      <button
        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 font-semibold w-full"
        onClick={onClickHandler}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SpecialColors;
