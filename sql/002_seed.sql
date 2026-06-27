-- ponytail: single seed artifact so first webhook has something to conflict against
INSERT INTO artifacts (id, source, title, description, content, url, author, timestamp)
VALUES (
  'seed:loop-initial-architecture',
  'github',
  'Initial Loop Architecture',
  'Foundational architecture for the Loop conflict detection system.',
  'Adds core pipeline (closeLoop), hexagonal ports, and adapter stubs for parsing GitHub PRs, embedding via Google, conflict detection via Gemini, storage via Supabase pgvector, and alerting via Discord webhooks.',
  'https://github.com/Charlsz/loop',
  'system',
  NOW()::TEXT
)
ON CONFLICT (id) DO NOTHING;
