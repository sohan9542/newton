# Newton

Animated bakery landing page built with Vue 3, Vite, Tailwind CSS, and GSAP. Live demo: [https://newton-psi.vercel.app](https://newton-psi.vercel.app)

Newton is a front-end showcase: a full-viewport hero, in-page section transitions, and a draggable product carousel with expand-to-detail motion. It is not a full e-commerce app—cart and search icons are presentational, and secondary nav tabs update highlight state only.

## Features

- Full-screen hero with GSAP entrance / exit transitions
- In-page “Products” view with a horizontal, snappable carousel (GSAP Draggable)
- Product expand animation with responsive desktop / mobile layouts
- Custom Barlow Condensed typography and warm bakery palette
- Responsive layout for desktop and mobile viewports

## Tech stack

| Area      | Choice                                                |
| --------- | ----------------------------------------------------- |
| Framework | Vue 3 (`<script setup>`)                              |
| Build     | Vite 5                                                |
| Routing   | Vue Router (single `/` route; tabs are in-page state) |
| Styling   | Tailwind CSS 3                                        |
| Animation | GSAP + Draggable                                      |
| Icons     | Remix Icon (`@remixicon/vue`)                         |
| Quality   | ESLint, Prettier, Vitest                              |
| Hosting   | Vercel                                                |

## Architecture

```
src/
  constants/     # Nav and social link config
  data/          # Product catalog
  pages/         # Route-level views (Home)
  router/        # Vue Router setup
  utils/         # Pure helpers (transitions, snap, price format)
  App.vue        # Root shell
  main.js        # App bootstrap
  style.css      # Tailwind + font faces
public/          # Static images, fonts, logo
```

- **Routing:** Vue Router mounts `Home` at `/`. Tab clicks call `pushRoute`, which drives GSAP transitions and local `routePath` state rather than changing the URL.
- **Motion:** Hero and product-panel animations live in `src/pages/Home.vue`. Shared transition decisions are in `src/utils/navigation.js` so they can be unit-tested.
- **Data:** Carousel items come from `src/data/products.js`.

## Local setup

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/sohan9542/newton.git
cd newton
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Environment variables

See [`.env.example`](.env.example). The app has no required runtime secrets. Optional Vite client variables use the `VITE_` prefix.

```bash
cp .env.example .env.local
```

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the Vite development server    |
| `npm run build`        | Production build to `dist/`          |
| `npm run preview`      | Preview the production build locally |
| `npm run lint`         | Run ESLint                           |
| `npm run lint:fix`     | ESLint with auto-fix                 |
| `npm run format`       | Format with Prettier                 |
| `npm run format:check` | Check Prettier formatting            |
| `npm test`             | Run Vitest unit tests                |

## Project structure

```
.
├── .github/workflows/ci.yml   # Lint, format, test, build
├── public/                    # Static assets
├── src/
│   ├── constants/
│   ├── data/
│   ├── pages/
│   ├── router/
│   └── utils/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Author

[Sohanur Rahman](https://github.com/sohan9542) (`sohan9542`)
