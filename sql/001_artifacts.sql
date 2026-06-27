-- ponytail: 768-dim for text-embedding-004, change if model changes
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS artifacts (
  id        TEXT PRIMARY KEY,
  source    TEXT NOT NULL,
  title     TEXT NOT NULL,
  description TEXT NOT NULL,
  content   TEXT NOT NULL,
  url       TEXT NOT NULL,
  author    TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artifacts_embedding ON artifacts USING hnsw (embedding vector_cosine_ops);

CREATE OR REPLACE FUNCTION search_artifacts(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE(
  id TEXT, source TEXT, title TEXT, description TEXT,
  content TEXT, url TEXT, author TEXT, timestamp TEXT,
  similarity float
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id, a.source, a.title, a.description,
    a.content, a.url, a.author, a.timestamp,
    1 - (a.embedding <=> query_embedding) AS similarity
  FROM artifacts a
  WHERE 1 - (a.embedding <=> query_embedding) > match_threshold
  ORDER BY a.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
