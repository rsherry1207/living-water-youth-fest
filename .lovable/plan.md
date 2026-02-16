
# Add Raffle Component to Homepage

## Overview
Create a new `Raffle` component placed directly below the Hero section (after the "Register Now" button) on the homepage. The component will match the existing site design with a yellow title and green accents.

## Component Details

**New file:** `src/components/Raffle.tsx`
- Background: Uses `bg-background` to match the site's existing section styling
- Title: "Raffle" in yellow (`text-secondary`) using the same `font-barlow font-bold` styling as other section headers
- Description: Short text explaining the raffle with three prize items displayed as a styled list:
  - $500 Southwest Airlines Gift Card
  - iPad
  - Nespresso Machine
- Button: "Pay Now" styled identically to the "Register Now" button (`bg-secondary hover:bg-secondary/90 text-ocean-deep font-display font-bold rounded-full`). Links externally (needs a URL -- will use a placeholder or the Zeffy link for now since no URL was specified).
- Disclaimer: Smaller font text at the bottom with the Zeffy contribution note, matching the same style used on the Register page.

**Modified file:** `src/pages/Index.tsx`
- Import and insert `<Raffle />` between `<Hero />` and `<About />`.

## Technical Notes
- The "Pay Now" button will need a destination URL. Since none was provided, I'll add a placeholder constant (`RAFFLE_PAYMENT_URL`) that can be easily updated. If you have a specific Zeffy link for the raffle, let me know.
- The component will use the same design patterns (gradient dividers, card styling, spacing) as existing sections like About and Churches.
