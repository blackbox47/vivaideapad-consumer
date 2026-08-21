This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

This project uses Next.js's built-in env file loading. There are three shared environments, plus per-developer overrides.

### Environments

| Mode          | Loaded file         | Committed? | Purpose                          |
|---------------|---------------------|------------|----------------------------------|
| `local`       | `.env.local`        | No         | Per-developer overrides          |
| `development` | `.env.development`  | Yes        | Shared dev baseline              |
| `production`  | `.env.production`   | Yes        | Shared production baseline       |

The currently required variable is `API_BASE_URL` (server-only — no `NEXT_PUBLIC_` prefix). See `.env.example` for the full template.

### How loading works

Next.js loads env files automatically based on the command:

- `pnpm dev` → loads `.env.development` (plus `.env.local` overrides)
- `pnpm build` / `pnpm start` → loads `.env.production` (plus `.env.local` overrides)
- `pnpm test` → loads `.env.test` (plus `.env.local` overrides)

### Adding a new env variable

1. Add the variable to `.env.example` (with an empty value as the template).
2. Add it to `.env.development` and `.env.production` with appropriate values.
3. If the variable should be exposed to the browser, prefix it with `NEXT_PUBLIC_`.
4. Add it to `src/lib/env.ts` and validate it via `requireEnv(...)` (or make it optional if it has a default).
5. Document it in the table above.

### Per-developer overrides

To override shared values locally without affecting teammates, edit `.env.local` (gitignored). For example, to point at a local backend:

```bash
# .env.local
API_BASE_URL=http://localhost:4000/api
```

### Typed access (server-only)

Server code (route handlers, server components, server actions) should import the typed helper instead of reading `process.env` directly:

```typescript
import { env, isProd } from '@/lib/env';

// Server-side fetch
const res = await fetch(`${env.apiBaseUrl}/users`);

if (isProd) {
  console.log('Running in production mode');
}
```

> Variables without the `NEXT_PUBLIC_` prefix are **server-only** in Next.js and will be `undefined` in client components. If a client component needs the value, prefix it with `NEXT_PUBLIC_` and add it to `next.config.ts` if additional typing is needed.
