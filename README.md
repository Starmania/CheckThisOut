# CheckThisOut

This repository is a web browser extension that you to easily check if the current webpage is valid to the W3C, to scheme.org, and to other web standards.

## What it does

Adds a toolbar button. Click it to open a dropdown of validators and tools. Selecting one opens the corresponding site in a new tab with the current page URL prefilled.

Providers are listed in `data/providers.jsonl` (JSON Lines). You can add or remove entries without rebuilding.

## Install (unpacked)

- Chrome/Edge: open chrome://extensions → enable Developer mode → Load unpacked → select this folder
- Firefox: open about:debugging#/runtime/this-firefox → Load Temporary Add-on → pick `manifest.json`

## Configure providers

Each line in `data/providers.jsonl` is one JSON object with:

- background: CSS color
- logo: image path (optional)
- text: label to display
- magicUrl: URL template; placeholders `{url}` and `{encodedUrl}` are replaced with the current tab URL

Example line:

{"background":"#2563eb","logo":"assets/logos/w3c.png","text":"W3C HTML Validator","magicUrl":"https://validator.w3.org/nu/?doc={encodedUrl}"}

## Repo structure

- `manifest.json` – MV3 manifest
- `popup.html`, `popup.css`, `popup.js` – The popup UI and logic
- `data/providers.jsonl` – Providers list in JSONL format
- `icons/` – Extension icons (empty files by request)
- `assets/logos/` – Provider logos (empty files by request)

## Contributing

See `CONTRIBUTING.md` for guidelines.
