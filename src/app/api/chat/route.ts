import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import type { ChatRequest } from "@/lib/types";
import { buildKalianPrompt } from "@/lib/prompts/kalian";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: ChatRequest = await req.json();

    let systemPrompt: string;
    let userMessage: string;

    if (body.phase === "choice") {
      systemPrompt = buildKalianPrompt({
        heroName: body.heroName,
        affinity: body.affinity,
        phase: "choice",
        situation: body.situation,
        chosenTone: body.chosenTone,
      });
      userMessage = `"${body.situation.characterLine}" — 내 반응 방향: ${body.chosenTone}`;
    } else {
      systemPrompt = buildKalianPrompt({
        heroName: body.heroName,
        affinity: body.affinity,
        phase: "freeChat",
      });
      userMessage = body.userMessage;
    }

    const messages: Anthropic.MessageParam[] = [
      ...body.history.slice(-8).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: userMessage },
    ];

    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        stream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });
        await stream.finalMessage();
        controller.close();
      },
      cancel() {
        stream.abort();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "캐릭터 응답 생성에 실패했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
