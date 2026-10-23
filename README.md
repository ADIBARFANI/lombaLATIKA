# Smart Waste Classifier

A privacy-first, static web app that identifies waste types from a photo and
gives instant recycling guidance. Runs entirely in the browser — no backend.

## Structure
- `index.html` — single page containing both the Scan and History views
- `css/styles.css` — all styling
- `js/app.js` — all application logic

## Run locally
ES modules require HTTP (not `file://`):

```bash
python3 -m http.server 8000
# or
npx serve .
