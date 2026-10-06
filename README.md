# Sterling IMRES

Website for the **Sterling Institute for Medical Research, Education and Sciences**, built from the partner blueprint (`Aurevia_Blueprint.docx` — the institute has since been renamed Sterling). It is a Next.js 16 App Router application with TypeScript, CSS modules, typed local content and Supabase for accounts and enquiries.

## Run it

```bash
npm install
cp .env.example .env.local   # add Supabase URL, publishable key and site URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Supabase

Apply both migrations in `supabase/migrations/` to your project:

- `…_medlab_auth_roles.sql` — `profiles` table mapping logins to `user` / `admin` roles.
- `…_contact_inquiries.sql` — `inquiries` table for the contact form. Anyone can insert; only admins can read (shown on `/admin`).

## Content

| Folder | Holds |
| --- | --- |
| `src/lib/` | Types, helpers and institutional content (divisions, projects, programmes, governance). |
| `src/data/` | Library records: publications, books, registered studies, illustrations, learning resources, insights. |
| `src/components/` | Reusable UI: PageHero, Breadcrumbs, cards, FilterBar, StatusBadge, MetaList, AuthorList, CTASection, EmptyState… |
| `scripts/import-library.mjs` | Regenerates `src/data/*.ts` from verified JSON. |

### The reference library

Every publication, book, study and image is a real record checked against an authoritative source: Crossref (articles), publisher pages or Open Library (books), ClinicalTrials.gov (studies) and Wikimedia Commons (images). Summaries are written in our own words. Pages state clearly that these works are **not** authored by Sterling IMRES and that listed authors are not affiliated with it.

Verified Sterling IMRES staff go in `teamMembers` (`src/lib/people.ts`); the people directory and leadership page show them once the list is filled.

To add records, append verified entries to the source JSON and run:

```bash
node scripts/import-library.mjs <folder-with-json>
```
