import React, { useEffect, useState } from "react";
import Compact from "@uiw/react-color-compact";
import { copyToClipboard } from "../utils";
import {
  LocalStorageOption,
  getStoredOptions,
  setStoreColor,
} from "../utils/storage";

const SpecialColors = () => {
  const [curColor, setCurColor] = useState<string>("#ffffff");
  const [buttonText, setButtonText] = useState<string>("OK");
  const [options, setOptions] = useState<LocalStorageOption | null>(null);

  // Get options from storage
  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  // Update color when options change
  const onClickHandler = () => {
    // Save color to storage
    options.saveColor && setStoreColor(curColor);

    // copy to clipboard
    if (options.autoCopy) {
      setButtonText("Copied");
      setTimeout(() => {
        setButtonText("OK");
      }, 1000);
      copyToClipboard(curColor);
    }
    // Change color of Background
    chrome.action.setBadgeBackgroundColor({
      color: curColor,
    });
  };

  if (!options) {
    return null;
  }

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
