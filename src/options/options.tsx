import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./options.css";
import {
  LocalStorageOption,
  getStoredOptions,
  setStoreOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [buttonText, setButtonText] = useState("Save");
  const [setting, setSetting] = useState<LocalStorageOption | null>(null);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setSetting(options);
    });
  }, []);

  const onSaveButtonClick = () => {
    setButtonText("Saving");
    setTimeout(() => {
      setButtonText("Save");
    }, 1000);
    setStoreOptions(setting);
    getStoredOptions().then((options) => {
      console.log("options", options);
    });
  };

  if (!setting) return null;

  return (
    <div className="bg-white flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <div>
        <div className="flex gap-4 items-center justify-start m-4">
          <img src="icon.png" className="h-8 w-8" />
          <h1 className="text-3xl font-light">Color Capture</h1>
        </div>
        <div className="flex flex-col gap-8 shadow-lg rounded-md p-10 m-4 w-[900px] bg-gray-100">
          {/* Auto Copy */}
          <div className="flex gap-6 text-base">
            <h3 className="font-semibold">Auto Copy :</h3>
            <div className="">
              <div className="flex gap-2 items-center">
                <input
                  id="auto-copy"
                  type="checkbox"
                  className="accent-black"
                  checked={setting.autoCopy}
                  onChange={() =>
                    setSetting((prev) => ({
                      ...prev,
                      autoCopy: !prev.autoCopy,
                    }))
                  }
                />
                <label htmlFor="auto-copy">
                  Automatically copy picked colour to clipboard.
                </label>
              </div>
            </div>
          </div>
          {/* Color Picker Tool Settings */}
          <div className="flex gap-6 text-base">
            <h3 className="font-semibold">Color Picker Tool Settings :</h3>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  id="tooltip-toggle"
                  type="checkbox"
                  className="accent-black"
                  checked={setting.tooltip}
                  onChange={() =>
                    setSetting((prev) => ({
                      ...prev,
                      tooltip: !prev.tooltip,
                    }))
                  }
                />
                <label htmlFor="tooltip-toggle">
                  Display color codes in a tooltip when picking colors.
                </label>
              </div>
            </div>
          </div>
          {/* History Management */}
          <div className="flex gap-6 text-base">
            <h3 className="font-semibold">History Management :</h3>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  id="history-toggle"
                  type="checkbox"
                  className="accent-black"
                  checked={setting.saveColor}
                  onChange={() =>
                    setSetting((prev: LocalStorageOption) => ({
                      ...prev,
                      saveColor: !prev.saveColor as true,
                    }))
                  }
                />
                <label htmlFor="history-toggle">
                  Toggle to enable/disable saving history of picked colors
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  id="history-limit"
                  type="number"
                  className="w-20 border px-2 py-1 rounded-md"
                  defaultValue={setting.historyLimit}
                  onChange={(e) =>
                    setSetting((prev) => ({
                      ...prev,
                      historyLimit: Number(e.target.value),
                    }))
                  }
                />
                <label htmlFor="history-limit">
                  set a limit on the number of history entries saved.
                </label>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 rounded-md disabled:opacity-50"
              onClick={onSaveButtonClick}
              disabled={buttonText === "Saving"}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
