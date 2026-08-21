/**
 * Typed environment configuration (server-only).
 *
 * - Validates required env vars at startup (fails fast with a clear error).
 * - Exposes a single `env` object — never read `process.env` directly elsewhere.
 * - Exposes the current `mode` for runtime environment checks.
 *
 * NOTE: Variables without the `NEXT_PUBLIC_` prefix are server-only in Next.js.
 * Do NOT use these in client components — read from this module only on the server.
 */

export type AppMode = 'development' | 'production' | 'test';

interface Env {
  apiBaseUrl: string;
  mode: AppMode;
}

function readMode(): AppMode {
  const raw = process.env.NODE_ENV;
  if (raw === 'development' || raw === 'production' || raw === 'test') {
    return raw;
  }
  // Fallback to development for safety; in real usage NODE_ENV is always set by Next.js.
  return 'development';
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === null || value === '') {
    throw new Error(
      `[env] Missing required environment variable: ${name}\n` +
        `Make sure the appropriate .env.* file is loaded for the current mode.\n` +
        `Current mode: ${process.env.NODE_ENV ?? 'unknown'}`,
    );
  }
  return value;
}

export const env: Env = {
  apiBaseUrl: requireEnv('API_BASE_URL'),
  mode: readMode(),
};

export const isProd = env.mode === 'production';
export const isDev = env.mode === 'development';
export const isTest = env.mode === 'test';
