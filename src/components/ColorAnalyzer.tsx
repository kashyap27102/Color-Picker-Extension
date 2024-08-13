import React, { useEffect, useState } from "react";
import { copyToClipboard } from "../utils";
import {
  LocalStorageOption,
  getStoredOptions,
  setStoreColor,
} from "../utils/storage";

const ColorAnalyzer: React.FC = () => {
  const [extractedColors, setExtractedColors] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [options, setOptions] = useState<LocalStorageOption | null>(null);
  console.log("render", extractedColors);
  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  useEffect(() => {
    setIsloading(true);
    // Fetch data from the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id,
        { type: "FETCH_DATA" },
        (response) => {
          setExtractedColors(response.response);
        }
      );
    });
    setIsloading(false);
  }, []);

  const onClickHandler = (curColor: string) => {
    // Save color to storage
    options.saveColor && setStoreColor(curColor);

    // copy to clipboard
    if (options.autoCopy) {
      copyToClipboard(curColor);
    }
    // Change color of Background
    chrome.action.setBadgeBackgroundColor({
      color: curColor,
    });
  };

  if (isloading) {
    return (
      <div className="w-[400px] p-4 text-center text-sm text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[400px] p-4 ">
      <div className="grid grid-cols-10 gap-1">
        {extractedColors.length > 0 ? (
          extractedColors.map((item, index) => (
            <div
              key={index}
              className="col-span-1 rounded-sm h-5 cursor-pointer"
              style={{ backgroundColor: item }}
              onClick={() => {
                onClickHandler(item);
              }}
            />
          ))
        ) : (
          <div className="col-span-10 text-center text-sm text-gray-400">
            No colors found
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorAnalyzer;
