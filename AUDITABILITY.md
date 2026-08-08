# Auditability

Open Art Tools is open source (Apache-2.0).

Anyone should be able to verify what the platform does — and what it does **not** do.

## Promises you can check

1. **No network calls for your contract data** — the wizard and engine run in the browser. There should be no `fetch` of form payloads.
2. **No localStorage / cookies for sessions** — `src/storage/local.ts` only builds and parses downloadable JSON files.
3. **No sample identities** — templates use instructional placeholders and `[empty markers]`.
4. **License & authorship** — `LICENSE`, `COPYRIGHT`, UI footer, transparency strip.

## How to audit locally

```bash
npm install
npm test
npm run build

# No localStorage in app source:
rg "localStorage" src || true

# No accidental PII fixtures:
rg -i "48133899|caution hot|ex-centris|brunch electronik" src || true

# No unexpected network usage in app modules:
rg "fetch\\(|XMLHttpRequest|navigator\\.sendBeacon" src || true
```

## Source layout (readable by design)

| Path | Role |
|------|------|
| `src/main.ts` | App flow and screens |
| `src/platform.ts` | Brand + tools catalog + transparency copy |
| `src/shell.ts` | Header, transparency strip, footer |
| `src/dom.ts` | Small DOM helpers |
| `src/engine/` | Template assembly (pure logic, tested) |
| `src/templates/` | Document templates |
| `src/storage/` | Session file download / load only |
| `src/export/` | PDF / HTML / TXT export |

Repo: https://github.com/OpenArtTools/contract-studio
