addEventListener("keydown", () =>
  (new EyeDropper).open().then(async c => {
    let color = c.sRGBHex;
    await navigator.clipboard.writeText(color);
    chrome.action.setBadgeBackgroundColor({ color });
    chrome.action.setBadgeText({ text: " " });
    chrome.action.setTitle({ title: color });
    chrome.action.setPopup({ popup: "popup.htm" + color });
    let windowId = +location.search.slice(1);
    chrome.windows.update(windowId, { focused: !0 });
    chrome.action.openPopup({ windowId });
  }).finally(close),
  1
);
chrome.tabs.getCurrent(tab => {
  let target = { tabId: tab.id };
  chrome.debugger.attach(target, "1.3");
  chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", { type: "keyDown" },
    () => chrome.debugger.detach(target)
  );
});
