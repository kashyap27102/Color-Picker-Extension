import React, { useState } from "react";
import { setStoreColor } from "../utils/storage";
import { copyToClipboard } from "../utils";

interface ColorPaletteProps {}

const popularColors = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#F1C40F", // Yellow
  "#8E44AD", // Purple
  "#E67E22", // Orange
  "#2ECC71", // Emerald
  "#3498DB", // Sky Blue
  "#E74C3C", // Tomato
  "#1ABC9C", // Turquoise
];

const ColorPalette: React.FC<ColorPaletteProps> = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (color: string, index: number) => {
    setStoreColor(color);
    chrome.action.setBadgeBackgroundColor({ color });
    copyToClipboard(color);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000);
  };

  // Function to lighten or darken a color
  const adjustColor = (color: string, amount: number) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const generatePalette = (baseColor: string) => {
    const colors = [];
    // Generate shades
    for (let i = -50; i <= 50; i += 5) {
      colors.push(adjustColor(baseColor, i));
    }
    setPalette(colors);
    setSelectedColor(baseColor);
  };

  return (
    <div className="p-4 w-[500px] bg-gray-800">
      <h2 className="text-lg font-bold mb-4 text-white">Popular Colors</h2>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {popularColors.map((color, index) => (
          <div
            key={index}
            className="col-span-1 h-10 rounded cursor-pointer shadow-md flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: color }}
            onClick={() => generatePalette(color)}
          >
            <span>{color}</span>
          </div>
        ))}
      </div>

      {selectedColor && (
        <div>
          <h3 className="text-lg font-bold mb-2 text-white">
            Palette for {selectedColor}
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {palette.map((color, index) => (
              <div
                key={index}
                className="h-10 rounded shadow-md flex items-center justify-center text-white text-sm relative cursor-pointer group"
                style={{ backgroundColor: color }}
                onClick={() => handleCopy(color, index)}
              >
                <span className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-1">
                  {copiedIndex === index ? "Copied!" : color}
                  <svg
                    className="absolute text-black h-2 w-full left-0 top-full"
                    viewBox="0 0 255 255"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
