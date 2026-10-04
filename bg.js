{
  let { action, alarms, windows } = chrome;
  alarms.onAlarm.addListener(() => action.setBadgeText({ text: "" }));
  action.onClicked.addListener(tab => (
    windows.create({
      url: "index.htm?" + tab.windowId,
      type: "popup",
      width: 1,
      height: 1,
      left: 9999,
      top: 9999
    }),
    alarms.create({
      delayInMinutes: 1
    })
  ));
}
