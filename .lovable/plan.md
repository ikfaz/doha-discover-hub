

# Article Readability & Visual Hierarchy Fix

## Problems Identified

From inspecting the live article rendering:

1. **Lists have no bullets or indentation** -- `<ul>` and `<li>` elements render as plain text lines with zero visual distinction from paragraphs. There are no bullet markers, no padding, and no left margin.
2. **Headings lack visual hierarchy** -- `h2` and `h3` both use similar charcoal text with only a size difference. No decorative accents, borders, or spacing cues distinguish sections from one another.
3. **Lead paragraphs look identical to body text** -- The `<p class="lead">` intro paragraph has no distinct styling (larger font, different weight, or color).
4. **No blockquote or callout styling** -- Important notes and tips blend into the body text.
5. **No horizontal rules or section dividers** -- Long articles read as a monotonous wall of text with no visual breathing room.
6. **Missing styles for `h4`** -- Some articles use `h4` elements with no custom styling.
7. **Spacing between sections is too tight** -- `h2` has only `mt-8` (2rem top margin), insufficient for scanning a 3000+ word article.

## Plan

### File: `src/index.css` -- Expand prose styles

Add comprehensive typography rules inside the existing `/* Article content styling */` section:

**Headings:**
- `h2`: Add a Sand Gold left border (4px), left padding, larger top margin (3rem), and bottom border to act as a section separator. Font size bumped to `text-3xl`.
- `h3`: Add a subtle left border (2px, lighter gold), slightly larger size, and more top spacing.
- `h4`: New rule -- semibold, slightly smaller than h3, with top margin.

**Lead paragraph:**
- `.prose .lead` or `.prose p.lead`: Larger font size (`text-xl`), lighter color (`text-muted-foreground`), more generous line-height, and a bottom border to separate from the body.

**Lists:**
- `.prose ul`: `list-disc`, `pl-6` (left padding), `mb-4`, `space-y-2` for vertical rhythm.
- `.prose ol`: `list-decimal`, `pl-6`, `mb-4`, `space-y-2`.
- `.prose li`: Proper `leading-relaxed`, text color matching paragraphs.

**Blockquotes:**
- `.prose blockquote`: Left border in Sand Gold, italic, padding, background tint.

**Horizontal rules:**
- `.prose hr`: Styled separator with margin.

**Tables (if any):**
- Basic table styling with borders and padding.

**Links:**
- Already styled but update to use Sand Gold with better hover state.

**Images inside prose:**
- `.prose img`: Rounded corners, shadow, margin.

### File: `src/pages/BlogPost.tsx` -- Minor layout tweaks

- Add a `drop-cap` effect or larger first letter on the lead paragraph (via CSS class).
- Ensure the `prose` wrapper has proper `prose-lg` sizing applied consistently.

## Technical Details

All changes are CSS-only in `src/index.css` (the existing prose rules block, lines 122-141). No article data or HTML content needs to change -- the HTML already uses semantic tags (`h2`, `h3`, `ul`, `li`, `p`, `strong`). The styles just need to target them properly.

The Tailwind `@apply` directive will be used to keep consistency with the design system (Sand Gold `#C2B280`, Charcoal `#36454F`, Pearl White `#FDFDFD`).

