# Not On MRP — Smart Shopping, Lower Prices

Pixel-matched rebuild of the homepage mock, with animation added throughout.

## Run it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. `npm run build` produces a production build in `dist/`.

## What's inside

```
src/
  components/
    Header.jsx        logo, search bar, store locator / track order / wishlist / cart
    TopNav.jsx         yellow category bar, nav links, WOW DEALS pill
    HeroSection.jsx    auto-sliding carousel (3 slides), arrows, dots, badge, doodles
    HeroArt.jsx        the shopper + basket illustration (SVG)
    CategoryGrid.jsx   11 category circles, scroll-reveal + hover
    FeaturesBar.jsx    lowest prices / quality / returns / store locator strip
    TopPicks.jsx       product grid with wishlist toggle + add-to-cart reveal
  data/
    categories.js
    products.js
```

## One thing to know: the hero photo

The mock uses a real photo of two people holding a product bin. I can't reproduce a
stock/real photograph, so `HeroArt.jsx` is an original flat-illustration SVG stand-in
(two shoppers + basket, same pose/idea, floating product icons). It already matches the
layout, colors and animation.

If you have the real photo (or a new shoot) as a PNG/WEBP, swap it in `HeroSection.jsx`:

```jsx
// replace:
<HeroArt theme={slide.theme} />
// with:
<img src="/hero-people.png" alt="" className="h-full w-full object-contain" />
```

Drop the file in `public/hero-people.png` and it'll just work.

## Animation summary

- Hero: auto-advances every 4.5s, pauses on hover, crossfades text, draggable-feel dots,
  floating doodle icons, badge "pops" in with a spring wiggle then idles with a slow bob.
- Category icons & Top Picks cards: staggered scroll-reveal the first time they enter
  view, lift + rotate slightly on hover.
- Product cards: wishlist heart does a spring pulse on tap, "Add to Cart" slides up on
  hover, discount ribbon and price are always visible.
- WOW DEALS pill has a soft looping glow.
- `prefers-reduced-motion` is respected — all animation collapses to near-instant for
  people who've asked their OS for reduced motion.

## Real product photos / prices

`src/data/products.js` currently uses colored icon tiles instead of photography, same
reasoning as the hero. Swap the `icon` field for an `image` field (or add one) and update
`ProductCard` in `TopPicks.jsx` to render an `<img>` once you have real product shots.
