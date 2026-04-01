# Squirrel Brain Coaching — Project Context File
> Load this file at the start of every development session.
> Last updated: 2026-03-31 (end of day)

---

## 1. Project Overview

**Business:** Squirrel Brain Coaching — ADHD coaching for teens and young adults  
**Owner:** Tejas Mistry, Sammamish, WA  
**Platform:** Squarespace Fluid Engine (Vester template), single long-scroll page  
**Primary domain:** squirrelbraincoaching.com  
**Also owns:** squirrelbraincoach.com, squirrelbrain.coach  
**Email:** tejas@squirrelbraincoaching.com  
**Phone:** placeholder `(425) 555-0123` — needs real Google Voice number  
**Form endpoint:** https://formspree.io/f/mwvrjyrb  

---

## 2. Coaching Philosophy

- Self-awareness, self-compassion, reducing self-judgment are the **foundation** — identity-shift work first, tactics second
- Aligned with Marcia Reynolds' *Coach the Person, Not the Problem*
- Visitors should feel encouraged and value themselves even if they never book
- **NEVER use "your brain is not broken" or any variation** — Tejas strongly dislikes this phrasing
- Tejas's Microsoft career (25 years, software engineering + management): empathizing, encouraging, empowering — "I was doing a lot of coaching before I ever called it that"
- Trained at ADD Coach Academy (ADDCA)

---

## 3. Claude's Role

Act as **senior software engineer + chief web designer** throughout this project. Both hats always on:
- Enforce engineering rigor AND web design best practices
- Vibrant, delightful, informative, easy to navigate
- Scalable across screen sizes / resolutions / input affordances / platforms
- Act as genuine project partner — push back on poor design decisions proactively, don't just execute requests

---

## 4. Design Philosophy — "Tactile Professional / Living Field Guide"

- Long-scroll single page with persistent header nav
- **Section order:** Treehouse → Welcome → Mainroom hub → About → ADHD Science → Resources → Coaching → Schedule → Contact → Footer
- Mainroom hotspots are shortcuts; scroll is primary navigation
- Mobile: room as hero image with floating sticker buttons
- Graphical section dividers (acorns, rope lines)
- Margin stickers deferred to v2 — ship full content first

**Core design principle:** "Art is the soul, web conventions are the invisible skeleton."  
- No hardcoded pixel values — all sizing uses `clamp()`, `dvh/vw`, percentages, or intrinsic CSS
- Mobile and desktop built simultaneously
- CSS preferred over JS for layout/sizing (except where SQS forces JS — see constraints)

**Title/Subtitle standard:** "Header floats above illustration" rule applies to **room-based sections** (Treehouse, Mainroom) only. For document-style sections (Coaching, About, Welcome), the header belongs **on** the content background — floating in white void feels disconnected.  
**BG image standard:** Source width ≥ rendered width to avoid zoomed-in feel; `background-position` controls vertical framing; `aspect-ratio` is a design decision — never change it to fix a positioning bug

---

## 5. Current Stable Versions

| Section | Version | Status |
|---|---|---|
| Treehouse | v4.2 | Stable |
| Welcome | v1.13 | Stable |
| Mainroom | v5.3 | Stable |
| About Me | v5.9 | Stable |
| Contact | v1.81 | Desktop stable — revert target |
| Coaching | v3.11 | Feature complete — pending launch items only |
| Header (Code Injection) | v2.2 | Stable |
| Footer (Code Injection) | v1.4 | Stable |

---

## 6. Section Status & Pending Work

### Treehouse v4.2
**Pending (future tasks):**
- Mobile squirrel: tap makes squirrel disappear into hole then reappear (easter egg, not navigation)
- Mobile tire swing: fix rectangular highlight that appears and sways on tap — ensure tire swing PNG bg is fully transparent, no bounding box artifacts on tap/highlight
- Add click action to tree trunk hole: triggers same page transition as clicking the door (goes to Mainroom). Secret squirrel entrance alongside the human door entrance. Trunk hole tooltip: `⚡Follow me!` (not 🌀 — looked like @ symbol)

### Welcome v1.13
**Status:** Stable.  
**Layout:** 1300px constrained paper card. Background image (`WelcomeBackground.webp`) as paper surface. Two-column grid: `#welcome-left` (header + text, 3fr) | `#welcome-image` (2fr).  
**Key architecture decision:** Header lives *inside* `#welcome-left` (same grid column as text) so the hero image vertically centers against the full [header + text] height, not just text height.  
**Typography:** Tillana 500, `word-spacing: -0.16em` for header. Pangolin body `clamp(1.15rem, 1.6vw, 1.25rem)`.  
**Chevron:** About v5.9 pattern — div appended to `document.body` at runtime for reliable `position:fixed` in SQS.  
**Mobile:** Single column, image above header (side-effect of grid restructure, visually acceptable — keep as-is).  
**Pending (future tasks):**
- Replace background image with something warmer that evokes standing at the treehouse door / threshold feeling
- Mobile pass review (deferred — layout acceptable)
- Remove version badge before launch

### Mainroom v5.3
**Working:** 9 hotspots, hover glow, tooltips (Fredoka One), pulse rotation (shuffled deck, 6 keys, 4s, pause on hover), mobile stickers + sticky bg, chevron, scroll-vs-tap, keyboard accessibility  
**Pending before launch:** Remove version badge + test cells, calibrate remaining COORDS (only photo confirmed), update NAV scroll IDs as sections are built  
**Future tasks:**
- Replace back-sign with "MORE ↓" sign pointing downward
- Fix skylight easter egg — swap skylight image (rain/storm/clouds/clear/sunset PNGs) instead of 80-raindrop JS; desktop stretch: simultaneously swap square window on opposite wall via same hotspot
- Wire walkie-talkie hotspot → Contact section (done in v5.3 — verify)
- **Wire Coaching hotspot → Coaching section** (pending)
- **Wire Welcome section into Mainroom hotspot** (pending)
- Wire remaining hotspots as sections are built

### About Me v5.9
**Stable.**  
**Pending tweaks (deferred):**
1. Set `.about-body p` margin-top = margin-bottom (remove `0 !important`) for symmetric sticker spacing
2. Add padding-top above heading
3. Tune spacing around inline stickers
4. Title/subtitle should move to white space above paper (new site-wide standard)
5. Paper centering: use `min(1300, vw-120)` standard — NOT Mainroom image BCR

**Sticker float pattern:** IMG siblings of P tags (not inside). Desktop: `float:right/left`, text wraps. Mobile: `float:none`, display:block, margin:0, centered.

**Standing rule — `!important` in About section:** Global reset `#about-section, #about-section * { margin:0; padding:0 }` overrides all child margins/padding. Always use `!important` on margin and padding declarations inside `#about-section`. Has caused repeated regressions (padding-left on ul, margin-bottom on li).

### Contact v1.81
**Mobile:** Complete  
**Desktop:** Stage centered, 17/10 aspect ratio, console sized by stage height via `setConsoleWidth()`  
**Pending before launch:**
- Replace `(425) 555-0123` with real Google Voice number
- Remove version badge, set `DEBUG_COORDS = false`
- Remove debug panel
- Fix sticky note re-pin bug on desktop
- Fix sticky note text overflow at narrow viewports
- Complete desktop: retire `ContactMeDeskUp.webp`, mobile image right-of-center on desktop, left column gets business card + stickers, tune `console-wrapper` max-width

**Sticky note details:**  
Yellow cutout, 83% peek from right viewport edge, 📍 at rest. On touch: rAF fall (5s easeOut damped-sine zigzag), snap-back on tap, 📌 re-pin hint + hyperlinks revealed via `.settled` class. Email/phone injected via JS. Zigzag: `Math.sin(t*PI*2.5)*35*(1-t)`. Re-stick = instant snap (conceptually "user grabbed and pinned it back"). rAF chosen over CSS keyframes because `transform-origin: top-right` caused CSS `translate()` to orbit off-screen.

### ADHD Science
**Status:** Not yet built  
**Visual concept:** Bookshelf → science section (bookcase maps to science/knowledge); cubby unit maps to resources — this detail matters for thematic coherence  
**Under consideration:** Possible removal of this section entirely

### Coaching v3.11
**Status:** Feature complete. Pending launch items only (see §6 coaching pending below).

**Architecture:**
- `USE_REMOTE_COPY = true` — fetches from GitHub on every page load
- GitHub repo: `OutrageousTejas/SBCWebsiteContent`
- JSON file: `coaching-section-text-v2.json` (raw URL: `https://raw.githubusercontent.com/OutrageousTejas/SBCWebsiteContent/refs/heads/main/coaching-section-text-v2.json`)
- Fallback: if GitHub fetch fails, uses inline `COACHING_COPY` object baked into HTML between `@@COPY_START` / `@@COPY_END` sentinels
- Build script: `coaching-sectiontext-to-html.js` — run to bake JSON inline for production (`USE_REMOTE_COPY=false`)

**Subsection order (7 sections, §0–§6) — §7 deleted in v3.0:**

| § | Title | Layout | Toggle |
|---|---|---|---|
| §0 | Prologue: A View from the Rug | flip | ✓ |
| §1 | What Is ADHD Coaching? | normal | ✓ |
| §2 | A Different Type of Support | flip | ✓ (hardcoded table + voodoo sticker) |
| §3 | How Coaching Works | normal | ✓ |
| §4 | Adapt to the Way Your Brain Works | flip | ✓ (image pair hardcoded) |
| §5 | Why Self-Awareness + Self-Compassion (BROKEN) | normal | broken/glitch |
| §6 | What Coaching Can and Can't Do | flip | ✓ |

**Hero images (all confirmed):**
- §0: TreeUnsortedPile.webp (872×514)
- §1: WorkingTogether2.webp (641×457)
- §2: SupportModalitiesMissing.webp (739×680) — UUID: 53a6a184-f301-4ac2-b34f-c82ab7773a85
- §2 sticker: VoodooDoll.webp (237×210) — UUID: 66e23bb2-a7d0-45df-aaf9-7fbc30e8a2d2
- §3: TreeSortedPile2.webp (683×505)
- §4: BuildGuide.webp (1×1 square)
- §5: Compassion.webp (723×580) — UUID: 45aad03f-1fdd-4402-814a-99190894229d
- §6: ReadyLadder.webp (581×730)

**Image scaling (desktop):**
- §4: `max-width: 85%` on `.coaching-image-desktop img`
- §6: `max-width: 80%` on `.coaching-image-desktop img`

**Coaching pending launch items:**
- Resolve §2 comparison table width bug (requires DevTools — min-width floor + JS reflow attempted, unresolved)
- Decide amber overlay opacity and width (§5)
- Wire Mainroom hotspot to Coaching section
- Global font sizing audit
- **Chevron missing from Coaching section** — needs investigation (About v5.9 pattern is the reference)
- Neurobiology language in §2 (copy) still unresolved — needs phrasing that satisfies skeptical parents without implying willpower deficit or sounding vague

---

## 7. Global Navigation (Footer Code Injection v1.4)

`window.SBC.scrollToNext(currentId)` — finds all `.sbc-section` elements in DOM order, scrolls to the next one after `currentId`.

**NAV_LINKS** (header nav smooth scroll targets):
- `'explore'` → `'mainroom-wrap'`
- `'about'` → `'about-section'`
- `'contact'` → `'contact-section'`

**Chevron standard (About v5.9 pattern — use for all sections):**
1. Chevron div lives in section HTML but JS appends it to `document.body` — required for reliable `position:fixed` in SQS Fluid Engine
2. Scroll listener: show while section substantially in view (`r.top < innerHeight && r.bottom > innerHeight * 0.3`), hide as next section approaches
3. Click: `window.SBC?.scrollToNext('section-id')` with fallback `window.scrollBy`
4. Animation: `@keyframes` namespaced per section (e.g. `welcomeBounceChevron`, `aboutBounceChevron`)

**Section IDs registered with global nav:**
- `treehouse-section` (Treehouse)
- `welcome-section` (Welcome) ✓ added v1.11
- `mainroom-wrap` (Mainroom)
- `about-section` (About)
- `coaching-section` (Coaching — chevron missing, bug filed)
- `contact-section` (Contact)

---

## 8. SQS Fluid Engine Constraints

- Sections live in completely separate DOM trees — `nextElementSibling` between sections always returns `null`. Solution: global SBC nav in Code Injection Footer uses `.sbc-section` class discovery via `querySelectorAll('.sbc-section')`, exposes `window.SBC.scrollToNext(currentId)`.
- `width:100%`, `aspect-ratio`, `min(100vw,...)` all resolve against the narrow SQS code block column (~146px), not the viewport. **`fixFullBleed()` JS is the only reliable escape** — reset styles → measure `rect.left` → set `marginLeft=(-rect.left-scrollX)`, `width=innerWidth`. Required for every full/constrained-width section.
- SQS caches HTML body and script block independently. Stale pre-rendered content in `data-copy-content` containers causes doubled content. `container.innerHTML=''` in `renderContent()` clears stale content. Version bumps force full cache refresh.
- SQS may re-execute code blocks when parent element heights change — hence the re-execution guard and removal of `fixContainerHeight()` from `init()`. Row sizing handled by `lockRowHeights()` on `window load` only.
- `position:fixed` elements inside SQS Fluid Engine containers don't behave reliably — always append to `document.body` at runtime.

**Section width standard:** `stageW=Math.min(1300,vw-120); marginLeft=Math.floor((vw-stageW)/2)`. Section flex must be `align-items:flex-start` — NOT center — or flexbox overrides JS `marginLeft`. Each section centers independently; never derive from another section's BCR.

**fixFullBleed() two-step pattern (Coaching v3.11 — canonical reference):**
```js
// Step 1: expand section to full viewport width
section.style.marginLeft = '';
section.style.width = '';
var rect = section.getBoundingClientRect();
var scrollX = window.scrollX || window.pageXOffset || 0;
section.style.marginLeft = (-rect.left - scrollX) + 'px';
section.style.width = window.innerWidth + 'px';
// Step 2: center paper card within full-width section
var vw = window.innerWidth;
if (vw > 640) {
  var paperW = Math.min(1300, vw - 120);
  paper.style.width = paperW + 'px';
  paper.style.marginLeft = Math.floor((vw - paperW) / 2) + 'px';
  paper.style.marginRight = '0';
} else {
  paper.style.width = paper.style.marginLeft = paper.style.marginRight = '';
}
```
**Init timing:** Always use double-rAF when DOM is already ready: `requestAnimationFrame(() => requestAnimationFrame(init))` — ensures SQS finishes its own layout pass before `rect.left` is measured.

---

## 9. CSS Patterns & Gotchas

### LED Glow Recipe (Contact v1.81, confirmed)
```css
background: rgba(R,G,B,0.60);
box-shadow: 0 0 6px 4px rgba(R,G,B,0.90), 0 0 16px 8px rgba(R,G,B,0.35);
filter: brightness(1.25);
```
Set ALL THREE inline via JS for instant snap — never CSS transition on LED (causes glow-before-fill).

### Coaching Row Grid
```css
.coaching-row {
  display: grid;
  grid-template-columns: 2fr 1fr;    /* or 1fr 2fr for .flip */
  align-items: start;                /* text pins to top */
}
.coaching-image {
  align-self: stretch;               /* fills full row track height */
  align-items: center;               /* centers img vertically */
  display: flex;
  justify-content: center;
}
```

### Hero Image Vertical Centering
To center a hero image against the **full** section height (including header):
- Put header and text in the **same grid column** — image centers against [header + text] height
- If header is a sibling *above* the grid, image centers against text height only and reads as low
- Use `width: auto` on the `<img>` — `width: 100%` fills the flex container completely leaving no room for `align-items: center` to act

### Italic Collision Fix (Pangolin font)
```css
#coaching-section .coaching-text-body em {
  letter-spacing: normal !important;  /* override SQS global stylesheet */
  padding-right: 0.1em;               /* prevent overhang collision */
}
```

### Bullet Hanging Indent
```css
.adhd-bullets li         { padding-left: 1.8em; }          /* stud bullets */
.adhd-bullets.emoji-only li { padding-left: 1.8em; text-indent: -1.8em; }
```

### About Section !important Rule (standing)
Global reset `#about-section, #about-section * { margin:0; padding:0 }` overrides everything. Always use `!important` on margin/padding inside `#about-section`.

### Hidden Element Margin Rule (standing)
Any element that starts `display:none` but has margin/padding will still inflate parent `offsetHeight` measurements. Always set `margin:0; padding:0` on hidden elements. Move spacing to the revealed state class.

### New Text Block Font Rule (standing)
All new text blocks inside `.coaching-text-body` must use `font-size: var(--para-size)` and `line-height: 1.6`. Never add a new `clamp()` value.

### CSS Brace Discipline (standing)
After any `str_replace` that adds a new rule block inside an existing `@media` block, always view the file and verify brace structure. A stray closing brace silently closes the `@media` block early, making mobile-only rules apply globally (caused Welcome v1.12 desktop regression).

---

## 10. Contact Dev Learnings

1. Never put email in HTML on Cloudflare-proxied sites — obfuscation injects a decoder script that splits the IIFE, silently breaking all JS execution. Inject via JS: `['user','domain'].join('@')`
2. Never write literal `</script>` text in any comment — parser treats it as markup
3. Always verify tail of output file — truncated IIFE breaks everything silently
4. CSS keyframe `translate()` rotates around `transform-origin`; if origin is off-screen, element flies off. Use rAF to animate `left`/`top` directly instead

---

## 11. Debug Panel (Contact v1.81+)

Floating panel bottom-left, 55% opacity. Toggles: `DEBUG_COORDS`, `DEBUG_WIDTH`, `DEBUG_STAGE` — backed by sessionStorage, reload on toggle. Mouse coord display (x/y) updates live on mousemove. Re-run init button.  
**Remove panel + version badge before launch.**  
`DEBUG_STAGE` logs stage BCR, section BCR, consoleW after rAF. Essential for diagnosing centering issues.

---

## 12. Tools & Asset Pipeline

| Tool | Purpose |
|---|---|
| imgupscaler.com | Upscale images |
| Squoosh | WebP compress |
| Squarespace CDN | `https://images.squarespace-cdn.com/content/69ba3296dd8f7f351597cdb9/[UUID]/[filename]` |
| imagecoordinates.com | Coordinate mapping at 100% zoom; red debug dot before removing |
| ChatGPT/DALL-E | AI image generation (primary, style consistency) |
| Nano Banana | AI image generation (detailed prompts) |
| Adobe Firefly | AI image generation (alternate) |
| Midjourney | AI image generation (alternate) |
| Photopea | Cutouts (Magnetic Lasso + Spot Healing Brush) |
| transparenttextures.com | Textures |
| Formspree | Form backend (`https://formspree.io/f/mwvrjyrb`) |
| Calendly or Acuity | Scheduling (planned) |
| compart.com/en/unicode | Check emoji East Asian Width (wide vs narrow) |

---

## 13. Fonts

| Font | Use |
|---|---|
| Exo 2 | Subsection headers (weight 600) — Coaching section |
| Tillana | Welcome section header (weight 500, word-spacing: -0.16em) |
| Pangolin | Body text, nav, ADHD mode labels |
| Fredoka One | Tooltips / headings — flagged for replacement (too round) |
| Gaegu | Sticky note |
| Architects Daughter | Reserved |

---

## 14. Welcome Section Images

| Image | Dimensions | URL |
|---|---|---|
| WelcomeBackground.webp | 1300×1024 | `https://images.squarespace-cdn.com/content/69ba3296dd8f7f351597cdb9/014ad751-8970-4254-9c3c-d8ff2eed23bb/WelcomeBackground.webp` |
| DoorOutward.webp (hero) | 794×996 | `https://images.squarespace-cdn.com/content/69ba3296dd8f7f351597cdb9/4a9f5792-aa7c-4d69-a9ce-8e23984967bd/DoorOutward.webp` |

---

## 15. Session Effectiveness Principles

1. Start fresh chat when session gets long — use tight transfer summary
2. Always upload current live code at session start, never work from memory
3. One change at a time, tested before moving on
4. Use DevTools diagnostics before writing fix attempts
5. Root cause thinking — keep asking why, solve at the right level
6. Keep version badge — knowing what's running eliminates confusion
7. Each version has one clear hypothesis
8. When debugging: add console.log / visual counters before guessing at fixes
9. If same bug survives 2 versions: it's either a cache issue or the root cause assumption is wrong — stop and diff
10. Pause before each code drop — ask clarifying questions, confirm decisions, get agreement

---

## 16. Communication Style

Tejas communicates naturally and conversationally. Appreciates honest, direct answers over diplomatic hedging. Uses "fixed / tweak / bug" structure in test reports. Strong diagnostic instincts — catches missed version bumps, questions architectural decisions before implementation, pushes back on quick fixes in favor of scalable solutions. Wants Claude to challenge poor design choices, not just execute. Uses voice input — reads responses rather than hearing them.

---

## 17. Versioning

Strict semantic versioning on all section files. Version badge stays visible until full sign-off.

---

## 18. Coaching Section — Design Spec

**Section name:** "ADHD Coaching"  
**Type:** Long-scroll vertical (like About Me — not viewport-constrained)  
**LEGO metaphor:** Building a LEGO model is the narrative thread. Visual arc: scattered pieces → sorting → building → partial treehouse → complete treehouse at bottom of section.

### Desktop layout
- Each subsection is a **row**: `[paragraph 2/3 width] [LEGO image 1/3 width]` — alternates each row (`.flip` class swaps order)
- Header (h2 + subtitle) sits as first child inside `#coaching-paper` — on graph-paper background
- Switch+LED inline with the subsection header
- Hero image vertically centered against default-content column height, stays fixed on toggle

### Mobile layout
- Header left-flush OR right-flush alternating each subsection
- LEGO image sits beside the header on the opposite side (scaled to 80%, visual accent)
- Switch+LED sits below the header
- Paragraph is full-width below the header unit

### ADHD Translator toggle
- Each subsection has its own independent switch+LED — NOT a global toggle
- Default state: paragraph copy
- Flipped state: condensed bullets (or table for §2, image pair for §4)
- §2: voodoo sticker appears over hero image on toggle ON (no text, no highlight — easter egg)
- §5 is the broken subsection — LED flickers, content never changes, amber overlay appears on 2nd toggle attempt

---

*End of context file. Update this file whenever a new stable version ships, a new confirmed pattern is established, or a significant architectural decision is made.*
