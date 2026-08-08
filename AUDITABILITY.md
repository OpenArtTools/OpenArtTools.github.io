# Auditability

Open Art Tools is open source (Apache-2.0).

## What to verify

1. **No network calls for contract data** — the contract engine and wizard run entirely in the client. Inspect `src/` for fetches; there should be none for form payloads.
2. **No localStorage / cookies for session data** — `src/storage/local.ts` only builds/parses downloadable JSON files; it must not write to `localStorage`.
3. **No sample identities** — templates use instructional placeholders and `[empty markers]`, never real personal data from example cases.
4. **License & authorship** — `LICENSE`, `COPYRIGHT`, UI footer.

## How to audit locally

```bash
npm install
npm test
npm run build
# Must find no localStorage writes in app source:
rg "localStorage" src || true
# Search for accidental PII fixtures:
rg -i "48133899|caution hot|ex-centris|brunch electronik" src || true
```
