addEventListener("keydown", () => (new EyeDropper).open()
  .then(({ sRGBHex }) => {
    chrome.action.setBadgeBackgroundColor({ color: sRGBHex });
    chrome.action.setBadgeText({ text: " " });
    chrome.action.setPopup({ popup: "popup.htm" + sRGBHex });
    let windowId = +location.search.slice(1);
    chrome.windows.update(windowId, { focused: !0 });
    chrome.action.openPopup({ windowId });
    navigator.clipboard.writeText(sRGBHex);
  }).finally(close),
  { capture: !0, once: !0 }
);
chrome.tabs.getCurrent(tab => {
  let target = { tabId: tab.id };
  chrome.debugger.attach(target, "1.3");
  chrome.debugger.sendCommand(target, "Input.dispatchKeyEvent", { type: "keyDown" },
    () => chrome.debugger.detach(target)
  );
});