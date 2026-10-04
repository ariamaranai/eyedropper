{
  addEventListener("keydown", () =>
    (new EyeDropper).open().then(({ sRGBHex }) => (
      navigator.clipboard.writeText(sRGBHex).then(close),
      action.setTitle({ title: sRGBHex }),
      action.setBadgeText({ text: " " }),
      action.setBadgeBackgroundColor({ color: sRGBHex }),
      action.setPopup({ popup: "popup.htm" + sRGBHex }),
      windows.update(tabs = +location.search.slice(1), { focused: !0 }),
      action.openPopup({ windowId: tabs })
    )).catch(close),
    1
  );
  let { action, debugger: _debugger, tabs, windows } = chrome;
  tabs.getCurrent(({ id }) => (
    _debugger.attach({ tabId: id }, "1.3"),
    _debugger.sendCommand(
      { tabId: id },
      "Input.dispatchKeyEvent",
      { type: "keyDown" },
      () => _debugger.detach({ tabId: id })
    )
  ));
}
