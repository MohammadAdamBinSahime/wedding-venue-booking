<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Notes

## Commit Message Convention

Every commit pushed to this repository must have a **detailed commit message**.

Use the following format:

```
<type>: <short summary>

- <bullet describing a specific change>
- <bullet describing another change>
- <reason or context for the change>
```

Guidelines:
- Start with a concise summary line (imperative mood, lowercase type).
- Leave a blank line after the summary.
- Use bullet points to list every non-trivial change.
- Explain **why** a change was made when it is not obvious.
- Mention updated tests, regenerated screenshots, or schema migrations explicitly.
- Do not use vague messages like "update" or "fix" without context.

Example:

```
feat: add Additional Details textarea for venue listers

- Add optional additionalDetails field to Listing Prisma model
- Run prisma db push and regenerate the Prisma client
- Add Additional Details textarea below Package/Pricing on host form
- Persist additionalDetails in POST /api/listings
- Conditionally render Additional Details card on venue detail page
- Update Playwright create-listing test to verify persistence
```

## Current Project State

- Stack: Next.js 16, React 19, Tailwind CSS v4, Prisma 7, SQLite, Playwright.
- The venue detail page no longer has an inline booking sidebar; bookings are initiated from the global header search bar.
- The header search bar has five fields: Venue, Date, Start Time, End Time, and Pax.
- Pax defaults to and steps by multiples of 50.
- The Package / Pricing section includes an optional Additional Details card when the lister provides extra information.
