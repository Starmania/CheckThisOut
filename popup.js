async function getCurrentTabUrl() {
  return new Promise((resolve) => {
    try {
      // Chrome
      if (chrome && chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          resolve(tabs?.[0]?.url || "");
        });
      }
      // Firefox
      else if (browser && browser.tabs && browser.tabs.query) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then((tabs) => {
            resolve((tabs && tabs[0] && tabs[0].url) || "");
          });
      } else {
        resolve("");
      }
    } catch {
      resolve("");
    }
  });
}

function substitute(urlTemplate, pageUrl) {
  const enc = encodeURIComponent(pageUrl);
  return urlTemplate
    .replaceAll("{url}", pageUrl)
    .replaceAll("{encodedUrl}", enc);
}

function parseJSONLines(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith("#"));
  return lines
    .map((l, i) => {
      try {
        return JSON.parse(l);
      } catch (e) {
        console.warn("Invalid JSONL line", i + 1, e);
        return null;
      }
    })
    .filter(Boolean);
}

async function loadProviders() {
  const res = await fetch("data/providers.jsonl");
  if (!res.ok) throw new Error("Failed to load providers");
  const text = await res.text();
  return parseJSONLines(text);
}

function getContrastingTextColor(color) {
  // Expand shorthand hex (#abc → #aabbcc)
  if (color.length === 4) {
    color = "#" + [...color.slice(1)].map((c) => c + c).join("");
  }

  // Convert hex to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate relative luminance (per WCAG)
  const [R, G, B] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  // If luminance is high → use black text, else white text
  return luminance > 0.179 ? "#000000" : "#FFFFFF";
}

function makeItem(doc) {
  const tpl = document.getElementById("item-template");
  const node = tpl.content.firstElementChild.cloneNode(true);
  const logo = node.querySelector(".logo");
  const text = node.querySelector(".text");
  text.textContent = doc.text || doc.name || "Open";
  if (doc.background) {
    node.style.background = doc.background;
    node.style.color = getContrastingTextColor(doc.background);
  }
  if (doc.logo) logo.style.backgroundImage = `url(${doc.logo})`;

  logo.style.backgroundSize = "cover";
  node.title = doc.text || "";
  node.addEventListener("click", async () => {
    const pageUrl = await getCurrentTabUrl();
    const target = substitute(doc.magicUrl || doc.url || "", pageUrl);
    if (!target) return;
    try {
      const open = (u) => {
        if (chrome?.tabs?.create) chrome.tabs.create({ url: u });
        else if (browser?.tabs?.create) browser.tabs.create({ url: u });
        else window.open(u, "_blank");
      };
      open(target);
    } catch (e) {
      console.error(e);
    }
  });
  return node;
}

async function init() {
  const list = document.getElementById("list");
  try {
    const providers = await loadProviders();
    providers.forEach((p) => list.appendChild(makeItem(p)));
    if (!providers.length)
      list.innerHTML = '<div class="muted">No providers configured</div>';
  } catch (e) {
    console.error(e);
    list.innerHTML = '<div class="muted">Failed to load providers.jsonl</div>';
  }
}

init();
