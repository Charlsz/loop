import type { Embedder } from '@/core/ports';
import { env } from '@/infra/env';

export class GoogleEmbedder implements Embedder {
  async embed(text: string): Promise<number[]> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${env.EMBEDDING_MODEL}:embedContent?key=${env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: `models/${env.EMBEDDING_MODEL}`,
          content: { parts: [{ text }] },
        }),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Embedding failed (${res.status}): ${body}`);
    }
    const data = await res.json();
    return data.embedding.values;
  }
}
