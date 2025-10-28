# Contributing to CheckThisOut

Thanks for your interest in contributing! This project is a simple browser extension that opens popular validators for the current page.

## Development quick start

- This is a plain WebExtension (Manifest V3) with a popup.
- There is no build step; you can load the folder directly as an unpacked extension.

### Load in Chromium-based browsers (Chrome, Edge)

1. Open chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked" and select this repository folder
4. Pin the extension and click the icon to open the popup

### Load in Firefox

1. Open about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on" and select any file in this folder (e.g., `manifest.json`)
3. Click the extension icon to open the popup

## Project structure

- `manifest.json` – Extension manifest (MV3)
- `popup.html`, `popup.css`, `popup.js` – The popup UI that reads providers from JSON Lines
- `data/providers.jsonl` – JSONL file defining the dropdown entries
- `icons/` – Extension icons (empty placeholders by request)
- `assets/logos/` – Provider logos (empty placeholders by request)

## Providers JSONL format

Each line is a JSON object with the following fields:

- `background` (string): CSS color (e.g., `#2563eb`) used for the small logo circle
- `logo` (string, optional): Path to an image or data URL used as the circle background-image
- `text` (string): Label shown in the popup
- `magicUrl` (string): Target URL template. The current page URL is injected with placeholders:
  - `{url}` – raw current page URL
  - `{encodedUrl}` – URL-encoded current page URL

Example:

{"background":"#2563eb","logo":"assets/logos/w3c.png","text":"W3C HTML Validator","magicUrl":"https://validator.w3.org/nu/?doc={encodedUrl}"}

Comments and blank lines are allowed (lines beginning with `#` are ignored).

## Coding style

- Keep the popup lightweight and dependency-free.
- Prefer small functions and clear naming.
- Ensure the popup remains usable at 360px width.

## Adding new providers

- Edit `data/providers.jsonl` and append a new JSON object on a new line.
- Optionally add an image under `assets/logos/` and reference it in the `logo` field.
- No rebuild is required; just reload the extension.

## Reporting issues

Please open an issue with:

- Clear steps to reproduce
- Browser and version
- Screenshots or recordings if needed

Thanks again for helping improve CheckThisOut!
