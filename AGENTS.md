<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Dual-theme requirement
Every UI section or feature added to the portfolio MUST exist in BOTH themes:
- `components/themes/midnight.tsx` — the primary dark/visual theme
- `components/themes/terminal.tsx` — the CLI/monospace theme

Check both files before closing any task. If a section only exists in one theme, it is incomplete. Terminal theme uses inline styles (not Tailwind). In the terminal theme, images are shown as modal-triggering links (terminals don't display inline images).
