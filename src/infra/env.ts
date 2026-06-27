function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  SUPABASE_URL: requireEnv('SUPABASE_URL'),
  SUPABASE_SERVICE_KEY: requireEnv('SUPABASE_SERVICE_KEY'),
  GOOGLE_API_KEY: requireEnv('GOOGLE_API_KEY'),
  DISCORD_WEBHOOK_URL: requireEnv('DISCORD_WEBHOOK_URL'),
  GEMINI_MODEL: process.env.GEMINI_MODEL ?? 'gemini-2.0-flash',
  EMBEDDING_MODEL: process.env.EMBEDDING_MODEL ?? 'text-embedding-004',
} as const;
