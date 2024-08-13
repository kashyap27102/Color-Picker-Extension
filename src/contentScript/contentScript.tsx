import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import OpenPicker from "../components/OpenPicker";

const App: React.FC<{}> = () => {
  const [showColorPickerBox, setShowColorPickerBox] = useState(false);

  console.log("content script running");

  // chrome runtime listener to send data to the popup.tsx
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "FETCH_DATA") {
      const elements = document.querySelectorAll("*");
      const colorSet = new Set();

      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;

        if (
          backgroundColor !== "rgba(0, 0, 0, 0)" &&
          backgroundColor !== "transparent"
        ) {
          colorSet.add(backgroundColor);
        }

        if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          colorSet.add(color);
        }
      });

      const response = Array.from(colorSet);
      sendResponse(response);
    }
    if (request.type === "SHOW_COLOR_PICKER") {
      setShowColorPickerBox(true);
    }
  });

  return (
    showColorPickerBox && (
      <OpenPicker setShowColorPickerBox={setShowColorPickerBox} />
    )
  );
};

const init = () => {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
};

document.addEventListener("DOMContentLoaded", init);
