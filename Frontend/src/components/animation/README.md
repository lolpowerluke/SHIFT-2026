# Animation (GSAP)

All of the site's animations live here, kept in one place so they're easy to
remove or tweak.

## What it does

Everything is **scroll-triggered** and detected automatically — nothing is
hard-coded to specific components, so nothing sits static next to something that
moves:

- **Boxes / framed panels** — any element with a visible border or box-shadow
  (cards, carousel frame, info panels, buttons…): rise + fade + soft scale.
- **Everything else** — any element that holds text directly or is media
  (image/svg/iframe/video): gentle fade up by 18px.

It also re-runs for content added **after load** (fetched project lists,
carousels, …) via a `MutationObserver`, so async content animates too. Nesting
is de-duplicated (parent and child never both animate), header/footer are
excluded, full-bleed page backgrounds are ignored (background only, no frame).
No rotation, no bounce, no layout-breaking parallax.

## Files

- `gsapInit.js` — loads GSAP + ScrollTrigger once.
- `animations.js` — the animation itself (`runSiteAnimations`).
- `SiteAnimations.jsx` — React component that runs everything and replays on
  each route change.
- `index.js` — exports.
- `splitText.js` — _unused_ (leftover from an earlier version, safe to delete).

## How it's wired

`<SiteAnimations />` is mounted **once** in `src/layouts/PageLayout.jsx`.
It renders nothing (`return null`).

## Tuning

Everything is in `animations.js`, function `runSiteAnimations()`:

- `isBox()` — what counts as a framed panel (border or shadow).
- `isAnimatable()` — what counts as "everything else" (text holders + media).
  Tweak `SKIP_TAGS` / `MEDIA_TAGS` to include or exclude things.
- `reveal()` — the actual values: boxes use `y: 34` + `scale: 0.97`,
  `duration: 0.7`; text uses `y: 18`, `duration: 0.6`. The `start: "top XX%"`
  controls when an element reveals while scrolling.

It automatically respects `prefers-reduced-motion` and has a safety net that
re-shows everything if an animation ever throws.

## Removing all animations

1. Remove `<SiteAnimations />` (and its import) from `src/layouts/PageLayout.jsx`.
2. Delete this `components/animation/` folder.
3. (Optional) remove `gsap` from `package.json`.
