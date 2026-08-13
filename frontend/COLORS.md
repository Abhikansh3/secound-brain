# Color System

Brainly's palette. Defined once in [`src/index.css`](src/index.css) and consumed as Tailwind utilities everywhere else.

## How it works

This project uses **Tailwind v4** (`tailwindcss@4.3.3` + `@tailwindcss/vite`), which is CSS-first — there is **no `tailwind.config.js`**. Theme tokens live in an `@theme` block:

```css
@import "tailwindcss";

@theme {
  --color-purple-600: #7164c0;
}
```

Every `--color-<name>-<shade>` token automatically generates the full set of color utilities for that name: `bg-purple-600`, `text-purple-600`, `border-purple-600`, `ring-purple-600`, `divide-purple-600`, and so on. No extra wiring.

The file is loaded by [`src/main.tsx`](src/main.tsx#L3), which is what makes it the entry point for the whole app.

## The palette

| Token | Hex | Preview | Used for |
|---|---|---|---|
| `gray-100` | `#eeeeef` | ⬜ near-white | App background, sidebar item hover |
| `gray-200` | `#e6e9ed` | ⬜ light border | Card borders |
| `gray-600` | `#95989c` | ◽ mid gray | Muted text, icons |
| `purple-200` | `#d9ddee` | 🟦 pale blue-violet | Secondary button background |
| `purple-500` | `#9492db` | 🟣 soft violet | — (unused so far) |
| `purple-600` | `#7164c0` | 🟪 brand violet | Primary button, secondary button text |

### Where each one is used

- **`bg-gray-100`** — [`App.tsx:14`](src/App.tsx#L14) page background, [`SidebarItem.tsx:4`](src/components/SidebarItem.tsx#L4) hover state
- **`border-gray-200`** — [`Card.tsx:10`](src/components/Card.tsx#L10) card outline
- **`bg-purple-600` + `text-white`** — [`Button.tsx:11`](src/components/Button.tsx#L11) primary variant
- **`bg-purple-200` + `text-purple-600`** — [`Button.tsx:12`](src/components/Button.tsx#L12) secondary variant

## Important: these names override Tailwind's built-ins

`gray` and `purple` are **existing Tailwind scales**. Defining `--color-gray-600` replaces Tailwind's value for that one shade — it does not replace the whole scale.

So the scale is currently a mix:

| Shade | Source | Value |
|---|---|---|
| `gray-100` | yours | `#eeeeef` |
| `gray-200` | yours | `#e6e9ed` |
| `gray-300` | **Tailwind default** | `oklch(87.2% 0.01 258)` |
| `gray-400` | **Tailwind default** | `oklch(70.7% 0.022 261)` |
| `gray-500` | **Tailwind default** | `oklch(55.1% 0.027 264)` |
| `gray-600` | yours | `#95989c` = `oklch(67.8% …)` |
| `gray-700`+ | **Tailwind default** | … |

**This creates one live inconsistency.** Your `gray-600` sits at 67.8% lightness, but Tailwind's default `gray-400` sits at 70.7% — they are nearly the same color, and `gray-500` (55.1%) is *darker* than your `gray-600`. The scale is non-monotonic between 400 and 600.

[`Card.tsx:15`](src/components/Card.tsx#L15) and [`Card.tsx:21`](src/components/Card.tsx#L21) use `text-gray-400`, which is **not** in `@theme` — so those icons render in Tailwind's default gray, visually indistinguishable from your `gray-600`.

Two ways to resolve it, whenever you get to it:

1. **Define the shades you use.** Add `--color-gray-400` so every gray in the app comes from your palette.
2. **Wipe the defaults** so undefined shades fail loudly instead of silently falling back:
   ```css
   @theme {
     --color-gray-*: initial;
     --color-purple-*: initial;
     /* then define only yours */
   }
   ```

The same applies to purple: `purple-300`, `purple-400`, `purple-700`+ are still Tailwind's vivid defaults (chroma ~0.29), which are far more saturated than your muted ones (chroma ~0.14). Mixing them will look off.

## Contrast

Measured WCAG ratios for the pairings currently in the code:

| Pairing | Ratio | AA normal text (4.5:1) |
|---|---|---|
| `text-white` on `bg-purple-600` | **4.90** | ✅ passes |
| `text-purple-600` on `bg-purple-200` | **3.62** | ⚠️ fails |
| `text-gray-600` on white | **2.90** | ⚠️ fails |
| `text-gray-600` on `bg-gray-100` | **2.50** | ⚠️ fails |

The secondary button ([`Button.tsx:12`](src/components/Button.tsx#L12)) is the one to watch — 3.62:1 is below AA for button labels. Darkening `purple-600` to roughly `#5f52ad` would clear 4.5:1 while keeping the hue.

The `gray-600` pairings are fine if it stays limited to decorative icons and de-emphasized metadata, but it should not carry body copy.

## Adding a shade

Add the token, use the utility. That's the whole loop:

```css
@theme {
  --color-purple-700: #5a4fa3;
}
```

```tsx
<div className="bg-purple-700" />
```

Only shades you define exist — `bg-purple-950` will not compile unless there's a `--color-purple-950` token (or a Tailwind default behind it). Hex, `rgb()`, and `oklch()` all work; Tailwind's own defaults use `oklch()`.
