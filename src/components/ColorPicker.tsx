import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import {
  clearHistory,
  getLastStoredColor,
  getStoredColorHistory,
  setStoreColor,
} from "../utils/storage";
import { MdDelete } from "react-icons/md";

interface ColorPickerProps {
  setView: (view: string) => void;
}

const ColorPicker = ({ setView }: ColorPickerProps) => {
  const [color, setColor] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const fetchData = async () => {
    const color = await getLastStoredColor();
    const colorHistory = await getStoredColorHistory();
    setColor(color);
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

  const handleSaveColor = () => {
    setStoreColor(color);
    chrome.action.setBadgeBackgroundColor({
      color: color,
    });
    setView(null);
  };

  if (!color) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 m-2">
      <SketchPicker
        color={color}
        onChangeComplete={handleColorChange}
        width={320}
        height={240}
      />
      <div className="flex flex-col gap-2  w-[200px]">
        <button
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 font-semibold"
          onClick={handleSaveColor}
        >
          OK
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 font-semibold"
          onClick={() => setView(null)}
        >
          Cancle
        </button>
        <hr />
        <div className="">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base text-md">Color history</h3>
            <MdDelete
              className="h-5 w-5 cursor-pointer text-red-600"
              onClick={onDeleteIconClick}
            />
          </div>
          <div className="grid grid-cols-10">
            {colorHistory.map((item) => (
              <div
                key={item}
                className="col-span-1 border h-5 w-5 cursor-pointer"
                style={{ backgroundColor: item }}
                onClick={() => {
                  setColor(item);
                }}
              />
            ))}
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
            <div className="col-span-1 border h-5 w-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
