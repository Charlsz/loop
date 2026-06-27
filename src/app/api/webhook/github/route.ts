import { NextResponse } from 'next/server';
import { closeLoop } from '@/core/pipeline';
import { GitHubParser } from '@/adapters/parsers/github';
import { GoogleEmbedder } from '@/adapters/embed/google';
import { LLMDetector } from '@/adapters/detect/llm';
import { SupabaseStore } from '@/adapters/store/supabase';
import { DiscordSender } from '@/adapters/senders/discord';

const parser = new GitHubParser();
const embedder = new GoogleEmbedder();
const detector = new LLMDetector();
const store = new SupabaseStore();
const sender = new DiscordSender();

export async function POST(req: Request) {
  const raw = await req.json();
  await closeLoop(raw, { parser, embedder, detector, store, sender });
  return NextResponse.json({ ok: true });
}
