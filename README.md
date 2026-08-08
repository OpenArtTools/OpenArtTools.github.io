# OpenArtTools

**Contract Studio** for artists and creators — generate exhibition, custody, insurance and liability annexes step by step.

Idea, design & creation by **Gerard Valls Montaño**. Licensed under **Apache-2.0**.

## Principles

- **Local-first** — by default nothing is stored
- **Transparent** — no cloud accounts, no analytics, no telemetry
- **Fine control** — toggles reshape clauses; the final step lets you edit every line
- **Instructive placeholders** — fields say what to write; they never ship sample identities

## Run (web)

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

```bash
npm test
npm run build
```

## Public site

Live (GitHub Pages): https://openarttools.github.io/contract-studio/

## Desktop (macOS, Windows, Linux)

The UI is packaged with **Tauri 2**. Requires [Rust](https://rustup.rs/) and platform build tools.

```bash
# once: install Rust via rustup, then:
npm install
npm run tauri:dev      # development
npm run tauri:build    # release installers for your OS
```

Targets: **macOS**, **Windows**, **Linux**. The same frontend can also run as a static web build. Additional Tauri targets (e.g. mobile) can be added later without changing the contract engine.

## Privacy

See [PRIVACY.md](PRIVACY.md). Opt-in checkboxes are the only way data stays on disk.

## Disclaimer

Templates are **orientation aids**. They do not replace legal advice.
