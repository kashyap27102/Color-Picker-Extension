// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  console.log("background script installed");
  // getLastStoredColor().then((color) => {
  //   console.log(color);
  // });
  // chrome.alarms.create({
  //   periodInMinutes: 1 / 6,
  // });
});

chrome.action.setBadgeText({
  text: ".",
});

chrome.action.setBadgeTextColor({
  color: "#ffffff",
});
