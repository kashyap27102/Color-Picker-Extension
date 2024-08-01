import React, { useEffect, useState } from "react";
import { sortRgbStringsByBrightness } from "../utils";

const ColorAnalyzer: React.FC = () => {
  const [extractedColors, setExtractedColors] = React.useState([]);
  const [isloading, setIsloading] = React.useState(false);

  useEffect(() => {
    setIsloading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id,
        { type: "FETCH_DATA" },
        (response) => {
          const sortedColors = sortRgbStringsByBrightness(response.colorSet);
          console.log("Response from content script:", sortedColors);
          setExtractedColors(sortedColors);
        }
      );
    });
    setIsloading(false);
  }, []);

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
                chrome.action.setBadgeBackgroundColor({
                  color: item,
                });
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
