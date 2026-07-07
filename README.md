# Steal a Brainrot Guide

Fan-made guide site for **Steal a Brainrot**.

Production domain:

```text
https://stealabrainrotguide.wiki
```

## Framework

- Next.js App Router
- React
- Tailwind CSS
- Static export via `output: "export"`

The build output is generated in `out/`. The `public/` directory is source assets only and must not be replaced with build output.

## Local Development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build And Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run check:links
npm run check:routes
npm audit
```

## Vercel

Use these project settings:

```text
Framework Preset: Next.js
Install Command: npm ci
Build Command: npm run build
Output Directory: out
```

Production environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://stealabrainrotguide.wiki
```

Optional public variables:

```text
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_CLARITY_ID
NEXT_PUBLIC_ADSENSE_CLIENT
```

Do not commit secret values or old tracking IDs from another project.

## Data Verification Model

Brainrots, Traits, and Mutations use separate typed records. Numeric fields are stored separately from formatted display text, so sorting and calculations should use numeric values only.

Records include:

- `sources`
- `verifiedAt`
- `confidence`
- `needsReview`
- `conflictNote`

Disputed or weakly sourced values must use `needsReview: true`. Disputed numbers must not be used for ranking calculations.

## Traits And Mutations

Traits and Mutations are separate systems.

- `/traits` displays actual Trait records only.
- Gold, Diamond, and Rainbow are Mutation records, not Trait records.
- Do not create `/mutations` links unless a real route exists.
- Mutation data may appear on `/traits` only as comparison text or tables.

## Static SEO Output

Metadata, canonical URLs, sitemap URLs, robots references, and structured data use the centralized site configuration in `src/lib/site-config.ts`.

Generated SEO files:

```text
out/sitemap.xml
out/robots.txt
```
