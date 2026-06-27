import type { Conflict } from '@/core/types';
import type { Sender } from '@/core/ports';
import { env } from '@/infra/env';

export class DiscordSender implements Sender {
  async send(conflict: Conflict): Promise<void> {
    const severityColor = { low: 0xffff00, medium: 0xffa500, high: 0xff0000 };
    const res = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '⚠️ Potential Conflict Detected',
          description: conflict.explanation,
          color: severityColor[conflict.severity ?? 'low'] ?? 0xffff00,
          fields: conflict.conflictingArtifactIds?.length
            ? [{ name: 'Conflicting Artifacts', value: conflict.conflictingArtifactIds.join('\n') }]
            : [],
          timestamp: new Date().toISOString(),
        }],
      }),
    });
    if (!res.ok) throw new Error(`Discord webhook failed: ${res.status}`);
  }
}
