# Strategies Studio

The finalized six-page website is in `site/`. This is the version published by GitHub Pages. The earlier Next.js source is retained for reference and is no longer used by the deployment workflow.

## Preview locally

Run `node scripts/preview-site.cjs` and open http://localhost:3010.

## Publish

Commit and push these changes to `main`. In the repository Settings → Pages, select **GitHub Actions** as the source if it is not already selected. The existing deployment workflow validates and publishes `site/` automatically.

Expected site address: https://pmundhwa4-design.github.io/

## Check before pushing

Run `node scripts/validate-site.cjs` to check all six pages, local links, assets, anchors, and JavaScript syntax.

Edit `site/*.html`, `site/assets/site.css`, and `site/assets/site.js` for future updates. No dependency installation or build is required for the final static website.

The consultation form opens a prepared WhatsApp or email message for the visitor to send; it does not store submissions or send automatically.
