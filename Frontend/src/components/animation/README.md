# Animation (GSAP) — minimal

Deliberately kept to the strict minimum for performance (slow school network,
many concurrent users): **a single light fade-in of the page content on each
navigation.** No scroll triggers, no DOM scanning, no `MutationObserver`, so it
costs nothing while scrolling. It's opacity-only (no transform), so it can't
shift any `position: fixed` element and won't break existing pages.

## Files

- `gsapInit.js` — loads GSAP core only (no ScrollTrigger).
- `animations.js` — `runPageIntro()`: fades in `#page-root` once.
- `SiteAnimations.jsx` — runs the intro on each route change.
- `index.js` — exports.
- `splitText.js` — _unused_ (leftover, safe to delete).

## How it's wired

`<SiteAnimations />` is mounted once in `src/layouts/PageLayout.jsx`, and the
page content is wrapped in `<div id="page-root">` (the element that fades).

Disabled on the projects list and a project's detail page (see
`animationsDisabled()` in `SiteAnimations.jsx`). Respects
`prefers-reduced-motion`.

## Tuning

In `animations.js`: change `duration` / `ease`. Keep it cheap — avoid
re-introducing scroll triggers if performance matters.

## Removing it

1. Remove `<SiteAnimations />` (and its import) from `PageLayout.jsx`, and
   unwrap `<Outlet />` from the `#page-root` div.
2. Delete this `components/animation/` folder.
3. (Optional) remove `gsap` from `package.json`.
