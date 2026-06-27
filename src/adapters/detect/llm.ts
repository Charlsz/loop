import type { Artifact, Conflict } from '@/core/types';
import type { Detector } from '@/core/ports';
import { env } from '@/infra/env';

export class LLMDetector implements Detector {
  async detect(artifact: Artifact, context: Artifact[]): Promise<Conflict> {
    const contextBlock = context
      .map((a, i) => `[${i + 1}] ${a.title}\n${a.description}\n${a.content}`)
      .join('\n---\n');

    const prompt = `You are a conflict detection system. Determine if the incoming change conflicts with any existing artifacts.

INCOMING:
Title: ${artifact.title}
${artifact.description}
${artifact.content}

EXISTING:
${contextBlock || '(none)'}

Respond JSON only: {"exists":boolean,"explanation":"string","severity":"low"|"medium"|"high","conflictingArtifactIds":["id"]}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${env.GEMINI_MODEL}:generateContent?key=${env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, responseMimeType: 'application/json' },
        }),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Detection failed (${res.status}): ${body}`);
    }
    const data = await res.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  }
}
