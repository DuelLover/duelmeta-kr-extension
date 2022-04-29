async function loadJson(url: string) {
  const targetUrl = chrome.runtime.getURL(url);
  return fetch(targetUrl).then((res) => res.json());
}

async function loadDataDictJson() {
  return loadJson("/assets/data.json");
}
async function loadTypeDictJson() {
  return loadJson("/assets/type.json");
}

function promiseGetOrNull<T>(promise: Promise<T>): Promise<T | null> {
  return promise.catch(async () => null);
}

const dataDictPromise = loadDataDictJson();
const typeDictPromise = loadTypeDictJson();

async function translateTippy(tipNode: Element) {
  const dataDict = await promiseGetOrNull(dataDictPromise);
  const typeDict = await promiseGetOrNull(typeDictPromise);

  const cardTypeContainElem = tipNode.getElementsByClassName("card-specs")[0];
  const monsterTypeContainElem =
    tipNode.getElementsByClassName("monster-types")[0];
  const descElem = tipNode.getElementsByClassName("card-desc")[0];

  const titleContainElem = tipNode.getElementsByClassName("has-text-left")[0];

  if (titleContainElem && dataDict) {
    const titleElem = titleContainElem.getElementsByTagName("b")[0];
    const title = titleElem?.textContent;

    if (title) {
      const target = dataDict[title];
      if (target && target["lore"]) {
        // case card effect
        const lineSplitted = target["lore"].split(/<br \/>|<br>/);

        descElem.textContent = "";
        for (let i = 0; i < lineSplitted.length; ++i) {
          const newTextNode = document.createTextNode(lineSplitted[i]);
          descElem.appendChild(newTextNode);
          if (i !== lineSplitted.length - 1) {
            const newBr = document.createElement("br");
            descElem.appendChild(newBr);
          }
        }
      }

      if (target && target["name"]) {
        // case card name
        titleElem.textContent = target["name"];
      }
    }
  }

  if (cardTypeContainElem && typeDict) {
    const specElem = cardTypeContainElem.getElementsByClassName("is-flex")[0];
    specElem.querySelectorAll("span").forEach((v) => {
      const content = v.textContent;
      if (content) {
        v.textContent = typeDict[content.trim()] || content;
      }
    });
  }

  if (monsterTypeContainElem && typeDict) {
    const monsterTypeElem = monsterTypeContainElem.getElementsByTagName("b")[0];
    if (monsterTypeElem && monsterTypeElem.textContent) {
      const origType = monsterTypeElem.textContent;

      const values = origType
        .replace("[", "")
        .replace("]", "")
        .trim()
        .split("/");

      monsterTypeElem.textContent =
        "[ " +
        values
          .map((v) => {
            const value = v.trim();
            return typeDict[value] || value;
          })
          .join(" / ") +
        " ]";
    }
  }
}

async function onTippyInserted(event: Event) {
  const tipNode = event.target;
  if (tipNode instanceof Element) {
    if (tipNode.hasAttribute("data-tippy-root")) {
      return translateTippy(tipNode).catch(async () => {});
    }
  }
}

function replaceOnTippy() {
  document.addEventListener("DOMNodeInserted", onTippyInserted);
}

replaceOnTippy();
