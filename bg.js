chrome.action.onClicked.addListener(tab =>
  chrome.windows.create({
    url: "index.htm?" + tab.windowId,
    type: "popup",
    width: 1,
    height: 1,
    top: 9999
  }
));