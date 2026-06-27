function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

// ponytail: getters = lazy eval, so build doesn't crash on missing runtime vars
export const env = {
  get SUPABASE_URL() { return requireEnv('SUPABASE_URL'); },
  get SUPABASE_SERVICE_KEY() { return requireEnv('SUPABASE_SERVICE_KEY'); },
  get GOOGLE_API_KEY() { return requireEnv('GOOGLE_API_KEY'); },
  get DISCORD_WEBHOOK_URL() { return requireEnv('DISCORD_WEBHOOK_URL'); },
  get GEMINI_MODEL() { return process.env.GEMINI_MODEL ?? 'gemini-2.0-flash'; },
  get EMBEDDING_MODEL() { return process.env.EMBEDDING_MODEL ?? 'text-embedding-004'; },
};
