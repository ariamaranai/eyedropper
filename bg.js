chrome.alarms.onAlarm.addListener(() =>
  chrome.action.setBadgeText({ text: "" })
);
chrome.action.onClicked.addListener(tab => (
  chrome.windows.create({
    url: "index.htm?" + tab.windowId,
    type: "popup",
    width: 1,
    height: 1,
    left: 9999,
    top: 9999
  }),
  chrome.alarms.create({
    delayInMinutes: 5
  })
));