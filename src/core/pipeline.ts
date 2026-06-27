import type { Parser, Embedder, Detector, Store, Sender } from './ports';

export interface PipelineDeps {
  parser: Parser;
  embedder: Embedder;
  detector: Detector;
  store: Store;
  sender: Sender;
}

export async function closeLoop(
  raw: unknown,
  deps: PipelineDeps,
): Promise<void> {
  const artifact = await deps.parser.parse(raw);
  const vector = await deps.embedder.embed(artifact.content);
  const context = await deps.store.search(vector);
  const conflict = await deps.detector.detect(artifact, context);
  if (conflict.exists) {
    await deps.sender.send(conflict);
  }
  await deps.store.save(artifact, vector);
}
