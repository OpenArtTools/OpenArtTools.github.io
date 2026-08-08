# Auditability

Open Art Tools is open source (Apache-2.0).

Anyone should be able to verify what the platform does — and what it does **not** do.

## Promises you can check

1. **No network calls for your contract data** — the wizard and engine run in the browser. There should be no `fetch` of form payloads.
2. **No localStorage / cookies for user data** — nothing writes personal or contract data to browser storage.
3. **Optional user-owned files only** — `src/storage/profile.ts` (personal identity across tools) and `src/storage/draft.ts` (one document). Not a client agenda. Not browser storage.
4. **Web-only** — no desktop installer, no Tauri, no native app packaging.
5. **No sample identities** — templates use instructional placeholders and `[empty markers]`.
6. **License & authorship** — `LICENSE`, `COPYRIGHT`, UI footer, transparency strip.

## How to audit locally

```bash
npm install
npm test
npm run build

# No localStorage in app source:
rg "localStorage" src || true

# No desktop / Tauri:
rg -i "tauri|src-tauri" . --glob '!node_modules/**' --glob '!dist/**' || true

# No contact / client agenda modules:
rg -i "contactsBook|contactsPanel|openarttools\\.contacts" src || true
rg "openarttools\\.(draft|profile)" src

# No accidental PII fixtures:
rg -i "48133899|caution hot|ex-centris|brunch electronik" src || true

# No unexpected network usage in app modules:
rg "fetch\\(|XMLHttpRequest|navigator\\.sendBeacon" src || true
```

## Source layout (readable by design)

| Path | Role |
|------|------|
| `src/main.ts` | App flow and screens |
| `src/session.ts` | In-memory session helpers |
| `src/platform.ts` | Brand + tools catalog + transparency copy |
| `src/shell.ts` | Header, strips, footer |
| `src/dom.ts` | Small DOM helpers |
| `src/engine/` | Template assembly (pure logic, tested) |
| `src/templates/` | Document templates |
| `src/storage/profile.ts` | Personal profile download / load (cross-tool) |
| `src/storage/draft.ts` | Document draft download / load |
| `src/export/` | PDF / HTML / TXT export |
| `SUPPORT.md` | Voluntary support policy (honest, optional) |

Repo: https://github.com/OpenArtTools/contract-studio
