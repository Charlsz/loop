// ponytail: one-shot seed script, run via `node scripts/seed.mjs`
// Requires SUPABASE_URL + SUPABASE_SERVICE_KEY in environment.
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const { error } = await supabase.from('artifacts').upsert({
  id: 'seed:loop-initial-architecture',
  source: 'github',
  title: 'Initial Loop Architecture',
  description: 'Foundational architecture for the Loop conflict detection system.',
  content: 'Adds core pipeline (closeLoop), hexagonal ports, and adapter stubs for parsing GitHub PRs, embedding via Google, conflict detection via Gemini, storage via Supabase pgvector, and alerting via Discord webhooks.',
  url: 'https://github.com/Charlsz/loop',
  author: 'system',
  timestamp: new Date().toISOString(),
}, { onConflict: 'id' });

if (error) {
  console.error('Seed failed:', error);
  process.exit(1);
}
console.log('Seed ok');
