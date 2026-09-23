# Strategies Studio

The website is published at <https://pmundhwa4-design.github.io/>.

GitHub Pages is set to deploy from the `main` branch's repository root. Keep the website files, including `index.html`, at the root. Push changes to `main` to publish them; GitHub's `pages-build-deployment` workflow handles the deployment.

## Preview locally

Install Node.js, open a terminal in this repository, and run:

```powershell
node preview.cjs
```

Open the local URL printed in the terminal. If port 4173 is in use, the server tries the next available port. Stop it with `Ctrl+C`.

The inquiry form retains the existing Formspree endpoint. Check Formspree delivery and allowed-domain settings after publishing.
