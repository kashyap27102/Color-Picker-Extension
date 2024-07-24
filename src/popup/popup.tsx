import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import useEyeDropper from "use-eye-dropper";
import { optionList } from "../utils";

const App: React.FC<{}> = () => {
  const { open, close, isSupported } = useEyeDropper();
  const [color, setColor] = useState("#fff");
  const [error, setError] = useState();
  const handleItemClick = (item) => {
    const openPicker = async () => {
      try {
        const color = await open();
        console.log(color);
        setColor(color.sRGBHex);
      } catch (e) {
        console.log(e);
        // Ensures component is still mounted
        // before calling setState
        if (!e.canceled) setError(e);
      }
    };
    openPicker();
  };

  return (
    <div className="bg-white rounded-xl shadow-md space-y-4 w-[250px]">
      <ul className="">
        {optionList.map((item) => (
          <li
            key={item.id}
            className="p-2 flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
            onClick={() => handleItemClick(item)}
          >
            <img src={item.icon} alt="" width={25} height={25} />
            <span className="text-base font-medium text-gray-700">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
