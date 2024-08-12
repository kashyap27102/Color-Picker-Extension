import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ColorPicker from "../components/ColorPicker";
import SpecialColors from "../components/SpecialColors";
import ColorHistory from "../components/ColorHistory";
import ColorPalette from "../components/ColorPalette";
import ColorAnalyzer from "../components/ColorAnalyzer";
import ColorPickerFromPage from "../components/ColorPickerFromPage";
import { featuresList } from "../utils";
import "./popup.css";

export type View = "A" | "B" | "C" | "D" | "E" | "F" | "G";

const App: React.FC = () => {
  const [view, setView] = useState<View | "">("");

  const renderContent = () => {
    switch (view) {
      case "A":
        return <ColorPicker setView={setView} />;
      case "B":
        return <SpecialColors />;
      case "C":
        return <ColorHistory />;
      case "D":
        return <ColorPalette />;
      case "E":
        return <ColorAnalyzer />;
      case "F":
        return <ColorPickerFromPage />;
      case "G":
        chrome.runtime.openOptionsPage();
      default:
        return (
          <div className="w-[200px]">
            <ul>
              {featuresList.map((item) => (
                <li
                  key={item.id}
                  className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
                  onClick={() => setView(item.view as View)}
                >
                  <img src={item.icon} alt="icon" width={15} height={15} />
                  <span className="text-sm">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
