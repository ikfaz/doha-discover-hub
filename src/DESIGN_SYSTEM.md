# Luxury Travel Blog Design System

## 1. Color Palette

| Color Name      | Hex Value | Usage Guidelines                                                                 |
|-----------------|-----------|----------------------------------------------------------------------------------|
| **Qatar Maroon**| `#8A1538` | **Primary Brand Color.** Used for primary buttons, headers, and active states.   |
| **Dune Gold**   | `#C5A059` | **Accent Color.** Used for icons, highlights, borders, and secondary actions.    |
| **Cloud White** | `#FFFFFF` | **Background Color.** Used for page backgrounds, cards, and text on dark colors. |

## 2. Typography: Google Font Pairings

These pairings are selected for their elegance (luxury feel) and high legibility on mobile devices.

### Option A: "Modern Heritage" (Recommended)
*   **Headings:** Playfair Display
    *   *Style:* Serif, high-contrast.
    *   *Vibe:* Classic, editorial, luxurious.
*   **Body:** Lato
    *   *Style:* Sans-serif, semi-rounded.
    *   *Vibe:* Friendly, stable, highly readable at small sizes.

### Option B: "Contemporary Chic"
*   **Headings:** Montserrat
    *   *Style:* Geometric Sans-serif.
    *   *Vibe:* Modern, clean, upscale.
*   **Body:** Open Sans
    *   *Style:* Humanist Sans-serif.
    *   *Vibe:* Neutral, legible, versatile.

### Option C: "Editorial Elegance"
*   **Headings:** Cinzel
    *   *Style:* Serif, inspired by Roman inscriptions.
    *   *Vibe:* Timeless, grand, distinct.
*   **Body:** Roboto
    *   *Style:* Neo-grotesque Sans-serif.
    *   *Vibe:* Mechanical yet open, optimized for mobile interfaces.

## 3. Implementation Guide (Tailwind CSS)

To implement this system in your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'qatar-maroon': '#8A1538',
        'dune-gold': '#C5A059',
        'cloud-white': '#FFFFFF',
      },
      fontFamily: {
        // Example for Option A
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
      },
    },
  },
}
```