# Portfolio

My personal site. One file of career data, rendered by three completely different React themes.

**Live site:** [karthikrajan.info](https://karthikrajan.info)
**Project page:** [kbrovibes.github.io/portfolio](https://kbrovibes.github.io/portfolio/)
**All projects:** [kbrovibes.github.io](https://kbrovibes.github.io/)

---

## What it is

Jobs, side projects, shipped systems and tech groups all live in `lib/portfolio-data.ts`; blog
posts live in `lib/blog-data.ts`. Each theme is a separate component that imports those files and
draws them its own way. Switching themes swaps the component, not the content.

## Themes

Three are wired into `app/page.tsx` and reachable from the switcher:

| Theme | File | Look |
|---|---|---|
| `midnight` | `components/themes/midnight.tsx` | Default. Dark `#0a0a12`, violet/pink/blue gradient name, framer-motion, Tailwind. |
| `terminal` | `components/themes/terminal.tsx` | CLI. Black, JetBrains Mono, every section a shell command. Inline styles only, no Tailwind. |
| `goblin` | `components/themes/goblin.tsx` | Goofy. Cream paper, Comic Sans, sticker borders, the résumé rewritten as jokes. |

`components/themes/` also holds `aurora`, `brutal`, `neon`, `claude-cli` and `claude-code`, which
were built and then left out of the router. They are not reachable from the live site.

## Theme switching

`components/ThemeProvider.tsx` holds the active theme. On mount it reads, in order:

1. a `?theme=` query parameter — this wins, and is how shared links work;
2. `localStorage["portfolio-theme"]`.

The choice is written back to `localStorage` and to `data-theme` on `<html>` (which
`app/globals.css` uses to set the page background). `components/ShareTheme.tsx` copies
`https://karthikrajan.info/?theme=<theme>` to the clipboard, or opens the native share sheet.

## Also in here

- `/blog` — a blog route with its own layout and metadata.
- `app/manifest.ts` + `public/sw.js` — web manifest and a service worker that precaches the shell,
  so the site installs to a home screen and opens standalone.
- `public/karthik-rajan-resume.pdf` — downloads straight from the hero.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
```

`npm run build` for a production build.

## Adding a section

Every UI section must exist in **both** `components/themes/midnight.tsx` and
`components/themes/terminal.tsx`. Terminal uses inline styles, not Tailwind, and shows images as
modal-triggering links rather than inline. See `AGENTS.md`.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · framer-motion · lucide-react · deployed on
Vercel. No database, no API routes, no accounts. The only stored state is the theme choice, in your
own browser.
