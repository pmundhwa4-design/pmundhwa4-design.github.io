# Strategies Studio — immersive experience

An original, Lusion-inspired HR consulting experience built with Next.js, React, TypeScript, and Three.js. A persistent WebGL scene evolves across six scroll chapters. All geometry and environment lighting are generated locally; no model downloads or external asset requests are required.

## Run

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. `pnpm build` generates the static GitHub Pages site in `out/`. `pnpm typecheck` checks TypeScript.

## Features

- Procedural metallic landscape, layered ribbon gateway, environment reflections, and atmospheric particles.
- Cinematic camera entrance, scroll-driven travel through the landscape, pointer parallax, and interactive partnership principles.
- Accessible service disclosures, keyboard-dismissable project dialogs, mobile navigation, and animation pause.
- Reduced-motion support, lower mobile geometry and pixel density, lazy-loaded WebGL, and adaptive rendering resolution.
- Company information, six HR services, partnership principles, and the five-stage approach adapted from https://strategiesstudio.com/, /about.html, /services.html, and /why-us.html. The supplied landscape logo is used in the header, footer, and contact page.
- Contact leads to the inquiry form, which prepares an email for the visitor to review and send; it does not claim server-side submission.

The existing `/contact/` inquiry form remains available. The retired dashboard redirects to capabilities.

## Verification

`verify-experience.cjs` exercises desktop/mobile behavior with Playwright using the bundled Windows runtime. Adjust its Playwright module path for other systems. Covers WebGL initialization, all six chapters, pause/play, disclosures, dialogs, reduced motion, navigation, anchor integrity, overflow, and browser exceptions.

## GitHub Pages deployment

This project is configured for **https://pmundhwa4-design.github.io/**, the root-level site for the `pmundhwa4-design/pmundhwa4-design.github.io` repository. Use Node.js 24 and pnpm 11.19.0 (pinned in `.nvmrc` and `package.json`).

1. In the GitHub repository, open **Settings → Pages → Build and deployment**, and select **GitHub Actions** as the source.
2. From this project folder, review and push your changes:

   ```sh
   git status
   git add .
   git commit -m "Prepare Strategies Studio for GitHub Pages"
   git push origin main
   ```

3. Open **Actions → Deploy Next.js to GitHub Pages** and wait for the deployment to succeed.
4. Visit **https://pmundhwa4-design.github.io/** on any device. This public URL does not require your computer to remain on.

Push source code and `pnpm-lock.yaml`; the workflow installs locked dependencies, builds the site, and uploads `out/` automatically. Do not upload `node_modules/`, `.next/`, `.next-dev/`, or `out/`. Pull requests build without deploying. A push to `main` publishes the site.

The current root-relative asset paths target this user-site repository. A different repository hosted below a URL subdirectory would require base-path changes.

## Preview the deployment build locally

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

`pnpm start` serves `out/` using the included dependency-free static server. Stop `pnpm dev` first if it is using port 3000, or set the `PORT` environment variable to another port. This is a local preview server; GitHub Pages serves production.
