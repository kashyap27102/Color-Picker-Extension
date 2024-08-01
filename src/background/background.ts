// TODO: background script

let extractedColors = [];

chrome.runtime.onInstalled.addListener(() => {
  console.log("background script installed");
});

chrome.action.setBadgeText({
  text: ".",
});

chrome.action.setBadgeTextColor({
  color: "#ffffff",
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FETCH_TAB_DATA") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: activeTab.id },
//           func: () => {
//             // Fetch the data you need from the DOM or other sources in the content script
//             const data = document.title; // Example: get the current tab's title
//             return data;
//           },
//         },
//         (results) => {
//           console.log(results);

//           sendResponse({ data: results[0].result });
//         }
//       );
//     });
//     return true; // Indicates you want to send a response asynchronously
//   }
// });
