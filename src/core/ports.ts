import type { Artifact, Conflict } from './types';

export interface Parser<T = unknown> {
  parse(raw: T): Promise<Artifact>;
}

export interface Embedder {
  embed(text: string): Promise<number[]>;
}

export interface Detector {
  detect(artifact: Artifact, context: Artifact[]): Promise<Conflict>;
}

export interface Sender {
  send(conflict: Conflict, channel?: string): Promise<void>;
}

export interface Store {
  search(vector: number[], limit?: number): Promise<Artifact[]>;
  save(artifact: Artifact, vector: number[]): Promise<void>;
}
