import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  clearHistory,
  getLastStoredColor,
  getStoredColorHistory,
} from "../utils/storage";

const ColorHistory = () => {
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const fetchData = async () => {
    const color = await getLastStoredColor();
    const colorHistory = await getStoredColorHistory();
    // setColor(color);
    setColorHistory(colorHistory);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDeleteIconClick = () => {
    if (confirm("Are you sure you want to delete all history?")) {
      clearHistory();
      setColorHistory([]);
    }
  };

  return (
    <div className="w-[200px] p-2 border rounded-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base text-md">Color history</h3>
        <MdDelete
          className="h-5 w-5 cursor-pointer text-red-600"
          onClick={onDeleteIconClick}
        />
      </div>
      <div className="grid grid-cols-10">
        {colorHistory.length > 0 ? (
          colorHistory.map((item, index) => (
            <div
              key={index}
              className="col-span-1 border h-5 w-5 cursor-pointer"
              style={{ backgroundColor: item }}
              onClick={() => {
                //   setColor(item);
                chrome.action.setBadgeBackgroundColor({
                  color: item,
                });
              }}
            />
          ))
        ) : (
          <div className="col-span-10 text-center text-sm text-gray-400">
            No color history
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorHistory;
