chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ list: [] }, () => console.log("List Ready"));
});