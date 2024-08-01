import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

const App: React.FC<{}> = () => {
  const extractColorFromWebpage = () => {
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
    return Array.from(colorSet);
  };
  console.log("content script running");
  const colorSet = extractColorFromWebpage();
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "FETCH_DATA") {
      console.log("content script", colorSet);
      // Example: get the current tab's title
      sendResponse({ colorSet });
    }
  });

  return null;
};
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
