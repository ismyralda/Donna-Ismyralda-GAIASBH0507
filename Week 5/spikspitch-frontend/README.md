# Frontend README file

## Folders
In `/src`, added:

`styles` for all the css files

`components` for reusable cards, formats

`dump` for files that we may want to remove but think of keeping for the time being

---

## CSS Files
The main stylist, all components and element styles are here: `App.css`.

Colours, fixed styles (chunky design) names: `style-guide.css`.

This is just the default page design: `global.css`.

---

---

## Components in App.css (chunky design)
Every class is `block-chunky`, with variants as `block-chunky--variant`. They only use colours and sizes from `style-guide.css`.

`btn-chunky` (+ `--yellow --mint --purple --crimson --charcoal --ghost --lg --xl --block --start`)

`card-chunky` (+ `--mint --purple --lilac --cream --charcoal --lg --lift`)

`chip-chunky` (+ `--yellow --purple --charcoal --lg`), `tile-chunky` (+ `--yellow --purple --charcoal --round`)

`input-chunky`, `label-chunky`, `error-chunky`, `callout-chunky`, `checkbox-chunky`

`segbar-chunky` (used by `components/ui.jsx`), `bubble-chunky`, `nav-item-chunky`

`display-chunky` (headings), `text-chunky` (hard text shadow)

Tip: these classes are not inside a Tailwind `@layer`, so Tailwind utilities like `bg-*` or `p-*` will not override them. Use a variant instead.

## Icons
`components/Icon.jsx` draws inline SVG icons from `data/icons.js` (Tabler icons, MIT). To add one, paste its inner SVG markup into `icons.js`. No icon library needed.

## Mock data
Sample numbers live in `src/data/` (`plan.js`, `sessions.js`, `posts.js`). The mock login name is stored in the browser by `src/lib/user.js`.
