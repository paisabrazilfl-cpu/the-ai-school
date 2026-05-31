# The AI School

A unified static online school for modern AI. Two programs under one brand:

- **Practical AI** — long-form chapters generated from `docs/AI_LEARNING_SYSTEM/*.md`.
- **AI Engineering** — an interactive 7-part / 70-chapter course app.

Built fully static. Deployed automatically to GitHub Pages on every push to `main`
via `.github/workflows/pages.yml`.

## Build locally

```bash
cd artifacts/ai-school
npm install
npm run build      # BASE_PATH="" for root, e.g. BASE_PATH=/the-ai-school for sub-path
# serve dist/ with any static server
```
