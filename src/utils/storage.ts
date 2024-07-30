export interface LocalStorage {
  color: string;
  colorHistory: string[];
}

export type LocalStorageKeys = keyof LocalStorage;

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

export const clearHistory = () => {
  chrome.storage.local.set({ colorHistory: [] });
};
