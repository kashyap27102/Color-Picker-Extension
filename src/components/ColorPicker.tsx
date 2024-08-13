import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { View } from "../popup/popup";
import ColorHistory from "./ColorHistory";
import {
  LocalStorageOption,
  clearHistory,
  getColorOptions,
  getLastStoredColor,
  getStoredColorHistory,
  setStoreColor,
} from "../utils/storage";

interface ColorPickerProps {
  setView: (view: View) => void;
}

/* 
  Color Picker component that provide a color picker pannel where user can select a color and save it.
*/
const ColorPicker = ({ setView }: ColorPickerProps) => {
  const [color, setColor] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [options, setOptions] = useState<LocalStorageOption | null>(null);

  // Function to handle color change
  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex);
  };

  // Function to handle color save
  const handleSaveColor = () => {
    options.saveColor && setStoreColor(color);
    chrome.action.setBadgeBackgroundColor({
      color: color,
    });
    setView(null);
  };

  // Function to fetch data from storage
  const fetchData = async () => {
    const color = await getLastStoredColor();
    const colorHistory = await getStoredColorHistory();
    const options = await getColorOptions();
    setOptions(options);
    setColor(color);
    setColorHistory(colorHistory);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!color && !options) {
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
        <div>
          <ColorHistory />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
