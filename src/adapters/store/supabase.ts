import type { Artifact } from '@/core/types';
import type { Store } from '@/core/ports';
import { supabase } from '@/infra/supabase';

export class SupabaseStore implements Store {
  async search(vector: number[], limit = 5): Promise<Artifact[]> {
    const { data, error } = await supabase.rpc('search_artifacts', {
      query_embedding: vector,
      match_threshold: 0.7,
      match_count: limit,
    });
    if (error) throw error;
    return data ?? [];
  }

  async save(artifact: Artifact, vector: number[]): Promise<void> {
    const { error } = await supabase.from('artifacts').insert({
      id: artifact.id,
      source: artifact.source,
      title: artifact.title,
      description: artifact.description,
      content: artifact.content,
      url: artifact.url,
      author: artifact.author,
      timestamp: artifact.timestamp,
      embedding: vector,
    });
    if (error) throw error;
  }
}
