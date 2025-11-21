# farm2home1.0

Farm2Home web application — Next.js + Supabase starter for a local farm marketplace.

## Features

- Next.js (app router)
- Supabase for auth and database
- Recharts for dashboard visualizations
- Environment-based configuration

## Quickstart

1. Install dependencies

```powershell
npm install --legacy-peer-deps
```

2. Create local env file

- Create `.env.local` in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

Do NOT commit `.env.local`.

3. Run dev server

```powershell
npm run dev
```

## Common fixes

- If you see peer dependency errors, re-run install with `--legacy-peer-deps`.
- Missing package errors (e.g. react-is): `npm install react-is --legacy-peer-deps`
- If a library requires React 18, install:

```powershell
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps
```

## Contributing

- Add issues or PRs to the GitHub repo: <https://github.com/Cosmic-hackers/farm2home1.0>

## License

MIT
