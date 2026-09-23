# Strategies Studio website

This folder is a ready-to-publish copy of the Strategies Studio website. It has no build step or npm dependencies.

## Run it locally

Install Node.js if it is not already installed, then open a terminal in this folder and run:

```powershell
node preview.cjs
```

Open the address printed in the terminal (normally <http://127.0.0.1:4173/>). If that port is busy, the preview automatically tries the next one. Keep the terminal open while previewing; use `Ctrl+C` to stop the server. The site needs to run through a local server because its service explorer loads `data.json`.

## Publish with GitHub Pages

1. Extract this ZIP file.
2. Create a GitHub repository for the website.
3. Add the extracted files and folders to the repository root, commit, and push to the `main` branch.
4. In the repository, open **Settings → Pages** and set the publishing source to **GitHub Actions**.
5. The included workflow publishes the files in `public/` after each push to `main`. The first deployment appears in the repository's **Actions** tab. GitHub will show the public site URL under **Settings → Pages**.

The workflow deploys the website as a project site, so no repository name or URL needs to be added to its links. The source files are in `public/`.

## Website files

- `public/` contains the 11 HTML pages, styles, interaction script, data, logo and favicon.
- `.github/workflows/deploy-pages.yml` deploys `public/` to GitHub Pages.
- `preview.cjs` serves `public/` locally with Node.js built-ins.

The inquiry form uses the existing Strategies Studio Formspree endpoint. Confirm its allowed domain and message delivery after the site is published.
