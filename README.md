# Typescript React Starter Kit

Opinionated starter for React + Redux Saga apps. One static build deploys to
either [GitHub Pages](#github-pages) or a [Cloudflare Worker](#cloudflare-worker)
(Static Assets) with no code changes.

## Stack

- [React 19](https://reactjs.org/) + [React Router 7](https://reactrouter.com/)
  (`BrowserRouter`, basename follows the deploy base path)
- [Redux Toolkit](https://redux-toolkit.js.org/) +
  [redux-saga](https://redux-saga.js.org/) via
  [typed-redux-saga](https://github.com/agiledigital/typed-redux-saga) (typed effects)
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Vite 7](https://vitejs.dev/) (dev, build, preview, Vitest)
- [TypeScript](https://www.typescriptlang.org/) strict
- [Biome](https://biomejs.dev/) for lint + format, including the shared
  `no-casts` / `component-decl` / `fc-props` GritQL plugins in `biome/` and the
  `redux-saga/effects` → `typed-redux-saga` import rule
- [Vitest](https://vitest.dev/) + Testing Library for tests
- [Yarn 4](https://yarnpkg.com/) (`node-modules` linker)

## Scripts

```bash
yarn dev              # Vite dev server
yarn build            # Static build for Workers (base /)
yarn build:pages      # Static build for GH Pages (base /<repo>/ + 404.html)
yarn preview          # Preview the Workers build locally
yarn preview:worker   # Serve the build through the Worker locally
yarn deploy:worker    # Deploy build to Cloudflare Workers
yarn lint             # Biome check
yarn fix              # Biome check + autofix
yarn typecheck        # tsc --noEmit (app)
yarn test             # Vitest run
yarn check            # lint + typecheck + test
```

## Deploy targets

Both targets serve the same `dist/` output. The only difference is the base
path: `/` on Workers, `/<repo>/` on GH Pages. The router reads it from
`import.meta.env.BASE_URL`, so no code changes are needed per target.

### GitHub Pages

`yarn build:pages` builds with `VITE_BASE=/typescript-react-starter-kit/` and
copies `dist/index.html` → `dist/404.html` (GH Pages has no SPA fallback, so
deep links are served through the 404 page). `.github/workflows/pages.yml`
builds and deploys on every push to `master`. If you fork under a different
repo name, update `VITE_BASE` in `build:pages` and the `BrowserRouter` keeps
working untouched.

### Cloudflare Worker

`workers/wrangler.jsonc` is a plain Worker + Static Assets config
(`not_found_handling: single-page-application`). `workers/src/index.ts`
answers `/api/*` (currently a `501` stub slot for a future API) and serves the
static build for everything else. `.github/workflows/workers.yml` builds and
deploys on every push to `master`; it needs `CLOUDFLARE_API_TOKEN` +
`CLOUDFLARE_ACCOUNT_ID` secrets.

## Demo app

An exercise tracker with three routes (`/`, `/tracker`, `/about`) showing
slices + sagas (persist to localStorage, fetch version over HTTP), a Zod
validated form, and schedule tables derived from the store.

## Conventions

- Imports from `src/` use the `~/` prefix (tsconfig paths + Vite alias)
- Components are `const Foo: FC<FooProps>` with named prop interfaces
- No `as` casts — narrow or validate (Zod) instead
- Saga effects import from `typed-redux-saga`, never `redux-saga/effects`
- Tabs, single quotes, no semicolons (enforced by Biome)
