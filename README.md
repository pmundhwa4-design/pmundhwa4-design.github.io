# Strategies Studio

Next.js App Router website adapted to Strategies Studio’s HR consulting content while retaining the original minimalist design, Tailwind tokens, shared components, and Framer Motion transitions.

## Run

```sh
npm install
npm run dev
```

Visit http://localhost:3000. Build with `npm run build`. The deployable static site is generated in `out/`; use `npm run dev` for local development. `next start` is not used for static exports.

## Content and structure

- `components/marketing/LandingPage.tsx`: hero, HR overview, six services, about, approach accordion, why-us, contact links, and footer.
- `components/Brand.tsx`: typographic Strategies Studio brand treatment.
- `components/ui/`: reusable Button, BentoCard, and StatusPill.
- `app/layout.tsx`: updated page metadata.
- `/dashboard` redirects to the services section; original banking components remain as unused source files.

Sources reviewed September 23, 2026:
- https://strategiesstudio.com/
- https://strategiesstudio.com/services.html
- https://strategiesstudio.com/about.html
- https://strategiesstudio.com/why-us.html

Descriptions are adapted from published content. Experience figures come from the source site. Consultation links lead to /contact. The form validates input and prepares an email draft for review, with a copy fallback. It does not transmit or store inquiries; visitors send through their own email application. Contact details use the existing local Strategies Studio contact page.



## GitHub Pages deployment

1. In the GitHub repository, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
2. Commit and push these changes to `main`.
3. Watch **Actions → Deploy Next.js to GitHub Pages**. It installs the locked dependencies, builds Next.js, and publishes `out/`.
4. Visit https://pmundhwa4-design.github.io/ after the workflow succeeds.

The workflow can also be started manually from Actions. Do not publish the source branch through Jekyll. The custom domain is not changed by this configuration. The contact form remains an email-draft handoff, which works without a backend on GitHub Pages.
