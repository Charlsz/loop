export type Source = 'github';
export type Channel = 'discord';
export type Severity = 'low' | 'medium' | 'high';

export interface Artifact {
  id: string;
  source: Source;
  title: string;
  description: string;
  content: string;
  url: string;
  author: string;
  timestamp: string;
}

export interface Conflict {
  exists: boolean;
  explanation?: string;
  severity?: Severity;
  conflictingArtifactIds?: string[];
}
