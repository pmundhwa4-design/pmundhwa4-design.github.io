# Strategies Studio — immersive experience

An original, Lusion-inspired HR consulting experience built with Next.js, React, TypeScript, and Three.js. A persistent WebGL scene evolves across six scroll chapters. All geometry and environment lighting are generated locally; no model downloads or external asset requests are required.

## Run

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. `pnpm build` generates the static GitHub Pages site in `out/`. `pnpm typecheck` checks TypeScript.

## Features

- Procedural chrome knot, warm central core, orbital geometry, environment reflections, and atmospheric particles.
- Smoothed scroll choreography, pointer parallax, changing lighting, and interactive partnership principles.
- Accessible service disclosures, keyboard-dismissable project dialogs, mobile navigation, and animation pause.
- Reduced-motion support, lower mobile geometry and pixel density, lazy-loaded WebGL, and adaptive rendering resolution.
- Company information, six HR services, partnership principles, and the five-stage approach adapted from https://strategiesstudio.com/, /about.html, /services.html, and /why-us.html. The supplied landscape logo is used in the header, footer, and contact page.
- Contact leads to the inquiry form, which prepares an email for the visitor to review and send; it does not claim server-side submission.

The existing `/contact/` inquiry form remains available. The retired dashboard redirects to capabilities.

## Verification

`verify-experience.cjs` exercises desktop/mobile behavior with Playwright using the bundled Windows runtime. Adjust its Playwright module path for other systems. Covers WebGL initialization, all six chapters, pause/play, disclosures, dialogs, reduced motion, navigation, anchor integrity, overflow, and browser exceptions.
