import type { Artifact } from '@/core/types';
import type { Parser } from '@/core/ports';

interface GitHubPRPayload {
  action: string;
  pull_request: {
    number: number;
    title: string;
    body: string | null;
    html_url: string;
    user: { login: string };
    created_at: string;
    head: { sha: string; ref: string };
    base: { sha: string; ref: string };
  };
  repository: { full_name: string };
}

export class GitHubParser implements Parser<GitHubPRPayload> {
  async parse(raw: GitHubPRPayload): Promise<Artifact> {
    const pr = raw.pull_request;
    return {
      id: `github:${raw.repository.full_name}#${pr.number}`,
      source: 'github',
      title: pr.title,
      description: pr.body ?? '',
      content: `PR #${pr.number}: ${pr.title}\n\n${pr.body ?? ''}\n\nHead: ${pr.head.ref} (${pr.head.sha.slice(0, 7)})\nBase: ${pr.base.ref} (${pr.base.sha.slice(0, 7)})`,
      url: pr.html_url,
      author: pr.user.login,
      timestamp: pr.created_at,
    };
  }
}
