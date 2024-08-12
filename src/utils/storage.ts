export interface LocalStorageOption {
  autoCopy: boolean;
  tooltip: boolean;
  saveColor: true;
  historyLimit: number;
}

export interface LocalStorage {
  color?: string;
  colorHistory?: string[];
  options?: LocalStorageOption;
}

export type LocalStorageKeys = keyof LocalStorage;
export type LocalStorageOptionKeys = keyof LocalStorageOption;

// Set Options to storage
export const setStoreOptions = async (options: LocalStorageOption) => {
  console.log("options", options);
  const val: LocalStorageOption = options;
  chrome.storage.local.set({ options: val }).then(() => {
    console.log("Options stored successfully.");
  });
};

// Get Options from storage
export const getStoredOptions = async (): Promise<LocalStorageOption> => {
  const keys: LocalStorageKeys[] = ["options"];

  return new Promise((resolve, reject) => {
    chrome.storage.local.get("options", (result) => {
      console.log("result", result.options);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(
          result.options || {
            autoCopy: false,
            tooltip: false,
            saveColor: true,
            historyLimit: 10,
          }
        );
      }
    });
  });
};

// Set color to storage
export const setStoreColor = async (color: string) => {
  const colorHistory = await getStoredColorHistory();
  if (colorHistory.includes(color)) {
    const index = colorHistory.indexOf(color);
    colorHistory.splice(index, 1);
  }
  colorHistory.unshift(color);
  const val: LocalStorage = { color, colorHistory };
  chrome.storage.local.set(val).then(() => {
    console.log("Data stored successfully.");
  });
};

// Get last color from storage
export const getLastStoredColor = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("color", (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.color || "ffffff");
      }
    });
  });
};

// Get color-history from storage
export const getStoredColorHistory = (): Promise<string[]> => {
  const keys: LocalStorageKeys[] = ["colorHistory"];
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.colorHistory || []);
      }
    });
  });
};

// delete color from color history
export const deleteColorFromHistory = async (color: string) => {
  const colorHistory = await getStoredColorHistory();
  const newColorHistory = colorHistory.filter((c) => c !== color);
  const val = { colorHistory: newColorHistory };
  chrome.storage.local.set(val).then(() => {
    console.log("Data stored successfully.");
  });
};

// clear color history
export const clearHistory = () => {
  chrome.storage.local.set({ colorHistory: [] });
};

// function to get color option
export const getColorOptions = async (): Promise<LocalStorageOption> => {
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
