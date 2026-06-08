import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import type { EndingRequest, EndingResponse } from "@/lib/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: EndingRequest = await req.json();
    const endingType: "happy" | "normal" = body.affinity >= 44 ? "happy" : "normal";

    const systemPrompt =
      endingType === "happy"
        ? `당신은 이세계 판타지 미연시 '오늘부터 여주입니다'의 내레이터입니다.
북부대공 칼리안과 여주인공의 해피엔딩 서사를 작성하세요.
제공된 대화 기록을 참고해 두 사람의 관계가 어떻게 발전했는지 반영하세요.
로맨틱하고 감동적인 톤. 3~5문장. 한국어로 작성.`
        : `당신은 이세계 판타지 미연시 '오늘부터 여주입니다'의 내레이터입니다.
북부대공 칼리안과 여주인공의 노멀엔딩 서사를 작성하세요.
제공된 대화 기록을 참고해 두 사람의 관계를 반영하세요.
아쉽지만 여운이 남는 톤. 3~5문장. 한국어로 작성.`;

    const historyText = body.history
      .map((m) => `${m.role === "user" ? "여주" : "칼리안"}: ${m.content}`)
      .join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `[대화 기록]\n${historyText || "(기록 없음)"}\n\n최종 호감도: ${body.affinity}/100\n\n엔딩 서사를 작성해주세요.`,
        },
      ],
    });

    const narrative =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json<EndingResponse>({ type: endingType, narrative });
  } catch (error) {
    console.error("Ending API error:", error);
    return NextResponse.json(
      { error: "엔딩 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
