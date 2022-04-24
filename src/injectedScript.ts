async function loadDataDictJson() {
  const targetUrl = chrome.runtime.getURL("/assets/data.json");
  return fetch(targetUrl).then((res) => res.json());
}

let dataDictPromise = loadDataDictJson();

async function translateTippy(tipNode: Element) {
  const dataDict = await dataDictPromise;
  const descElem = tipNode.getElementsByClassName("card-desc")[0];
  const titleContainElem = tipNode.getElementsByClassName("has-text-left")[0];

  if (titleContainElem) {
    const titleElem = titleContainElem.getElementsByTagName("b")[0];
    const title = titleElem?.textContent;

    if (title) {
      const target = dataDict[title];
      if (target) {
        descElem.innerHTML = target["lore"];
        titleElem.innerHTML = target["name"];
      }
    }
  }
}

async function onTippyInserted(event: Event) {
  const tipNode = event.target;
  if (tipNode instanceof Element) {
    if (tipNode.hasAttribute("data-tippy-root")) {
      translateTippy(tipNode);
    }
  }
}

function replaceOnTippy() {
  document.addEventListener("DOMNodeInserted", onTippyInserted);
}

replaceOnTippy();
