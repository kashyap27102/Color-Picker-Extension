import React, { useEffect, useState } from "react";

const ColorPickerFromPage = () => {
  useEffect(() => {
    console.log(history.state);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting
        .executeScript({
          target: { tabId: activeTab.id },
          files: ["contentScript.js"],
        })
        .then(() => {
          chrome.tabs.sendMessage(activeTab.id, { type: "SHOW_COLOR_PICKER" });
          window.close();
        });
    });
  });

  return null;
};

export default ColorPickerFromPage;
