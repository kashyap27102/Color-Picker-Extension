import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  LocalStorageOption,
  clearHistory,
  getStoredColorHistory,
  getStoredOptions,
  setStoreColor,
} from "../utils/storage";
import { copyToClipboard } from "../utils";

const ColorHistory = () => {
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [options, setOptions] = useState<LocalStorageOption | null>(null);
  const [buttonText, setButtonText] = useState<string>("OK");
  const [color, setColor] = useState<string>("");

  // Fetch data from storage
  const fetchData = async () => {
    const colorHistory = await getStoredColorHistory();
    const settings = await getStoredOptions();
    setOptions(settings);
    setColorHistory(colorHistory);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle button click
  const onButtonClick = () => {
    options.saveColor && setStoreColor(color);
    options.autoCopy && copyToClipboard(color);
    setButtonText("Copied");
    setTimeout(() => {
      setButtonText("OK");
    }, 1000);
  };

  // Handle color box click
  const onColorBoxClick = (color: string) => {
    setColor(color);
    chrome.action.setBadgeBackgroundColor({ color });
  };

  // Handle delete icon click
  const onDeleteIconClick = () => {
    if (confirm("Are you sure you want to delete all history?")) {
      clearHistory();
      setColorHistory([]);
    }
  };

  //  Render the color history
  const renderColorHistory = () => {
    const length = colorHistory.length;
    const maxLength = options.historyLimit;
    const diff = maxLength - length;

    // Create an array to hold the rendered items
    const renderedItems = [];

    // If there are less colors than the max length
    if (diff > 0) {
      // Render the actual color history colors
      renderedItems.push(
        colorHistory.map((item, index) => (
          <div
            key={index}
            className="h-5 w-5 col-span-1 border cursor-pointer relative group"
            style={{ backgroundColor: item }}
            onClick={() => onColorBoxClick(item)}
          ></div>
        ))
      );

      // Render empty boxes for the remaining slots
      for (let i = 0; i < diff; i++) {
        renderedItems.push(
          <div
            key={`empty-${i}`}
            className=" col-span-1 border h-5 w-5 cursor-pointer"
            style={{ backgroundColor: "#dadada" }}
            onClick={() => {
              // Optional: handle click on empty box if needed
            }}
          ></div>
        );
      }
    } else {
      // If diff <= 0, simply slice the color history to maxLength
      renderedItems.push(
        ...colorHistory
          .slice(0, maxLength)
          .map((item, index) => (
            <div
              key={index}
              className="col-span-1 border h-5 w-5 cursor-pointer"
              style={{ backgroundColor: item }}
              onClick={() => onColorBoxClick(item)}
            ></div>
          ))
      );
    }

    return renderedItems;
  };

  // Check if options are available
  if (!options) {
    return null;
  }

  return (
    <div className="w-[200px] p-2 border rounded-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base text-md">Color history</h3>
        <MdDelete
          className="h-5 w-5 cursor-pointer text-red-600"
          onClick={onDeleteIconClick}
        />
      </div>
      <div className="grid grid-cols-10 mb-2">{renderColorHistory()}</div>
      <button
        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 font-semibold w-full"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ColorHistory;
