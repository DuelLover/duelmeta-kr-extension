"use strict";

const TARGET_HOST_NAME = ["www.masterduelmeta.com", "www.duellinksmeta.com"];

function injectScript(tabId: number) {
  return chrome.scripting.executeScript({
    files: ["injectedScript.js"],
    target: { tabId },
  });
}

let isInjected = false;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    let domain = new URL(changeInfo.url);
    console.log(domain.hostname);
    if (TARGET_HOST_NAME.includes(domain.hostname)) {
      if (!isInjected) {
        injectScript(tabId);
        isInjected = true;
      }
    }
  }
});

chrome.webNavigation.onCommitted.addListener((details) => {
  if (
    ["reload", "link", "typed", "generated"].includes(details.transitionType) &&
    TARGET_HOST_NAME.includes(new URL(details.url).hostname)
  ) {
    injectScript(details.tabId);
  }
});
