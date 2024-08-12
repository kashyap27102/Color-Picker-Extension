console.log("background script loaded");
import { copyToClipboard } from "../utils";
import {
  LocalStorage,
  LocalStorageKeys,
  LocalStorageOption,
} from "../utils/storage";

const getStoredOptions = async (): Promise<LocalStorageOption> => {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(
          result.options || {
            autoCopy: false,
            copyFormate: "hex",
            tooltip: false,
            saveColor: true,
            historyLimit: 30,
          }
        );
      }
    });
  });
};

const setStoreOptions = async (options: LocalStorageOption) => {
  const val: LocalStorageOption = options;
  chrome.storage.local.set(val).then(() => {
    console.log("Options stored successfully.");
  });
};

chrome.runtime.onInstalled.addListener(() => {
  console.log("background script installed");
  setStoreOptions({
    autoCopy: false,
    tooltip: false,
    saveColor: true,
    historyLimit: 30,
  });
});

chrome.action.setBadgeText({
  text: ".",
});
chrome.action.setBadgeTextColor({
  color: "#ffffff",
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "COLOR_PICKER_CLICKED") {
    console.log("color picker clicked with color", request.color);

    // set badge color
    chrome.action.setBadgeBackgroundColor({ color: request.color });

    // store color in local storage
    const keys: LocalStorageKeys[] = ["colorHistory"];
    chrome.storage.local.get(keys, (result) => {
      const colorHistory = result.colorHistory;
      const color = request.color;
      if (colorHistory.includes(color)) {
        const index = colorHistory.indexOf(color);
        colorHistory.splice(index, 1);
      }
      colorHistory.unshift(color);
      const val: LocalStorage = { color, colorHistory };
      chrome.storage.local.set(val).then(() => {
        console.log("Data stored successfully.");
      });
      // copy color to clipboard
      getStoredOptions().then((result) => {
        if (result.autoCopy) {
          console.log("auto copy enabled");

          copyToClipboard(request.color);
        }
      });
    });
  }
});
