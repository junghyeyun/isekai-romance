"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { CharacterKey, Message, EndingResponse } from "@/lib/types";
import { kalianSituations } from "@/data/situations/kalian";
import { applyDelta } from "@/lib/affinity";
import AffinityBar from "@/components/AffinityBar";
import SituationCard from "@/components/SituationCard";
import ChoiceList from "@/components/ChoiceList";
import CharacterReply from "@/components/CharacterReply";
import FreeChatInput from "@/components/FreeChatInput";
import EndingScreen from "@/components/EndingScreen";
import styles from "./page.module.css";

const FREE_CHAT_MAX_TURNS = 3;

type SubPhase = "showing" | "loadingReply" | "showingReply";

async function readStream(
  res: Response,
  onChunk: (text: string) => void
): Promise<string> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk(full);
  }
  return full;
}

export default function GamePage() {
  const params = useParams<{ character: string }>();
  const character = params.character as CharacterKey;

  const [heroName, setHeroName] = useState<string>("");
  const [affinity, setAffinity] = useState<number>(0);
  const [phase, setPhase] = useState<"choice" | "freeChat" | "ending">("choice");
  const [subPhase, setSubPhase] = useState<SubPhase>("showing");
  const [situationIndex, setSituationIndex] = useState<number>(0);
  const [choiceHistory, setChoiceHistory] = useState<Message[]>([]);
  const [freeChatHistory, setFreeChatHistory] = useState<Message[]>([]);
  const [currentReply, setCurrentReply] = useState<string>("");
  const [turnCount, setTurnCount] = useState<number>(0);
  const [endingResult, setEndingResult] = useState<EndingResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("heroName");
    if (stored) setHeroName(stored);
  }, []);

  const situations = kalianSituations;
  const currentSituation = situations[situationIndex];

  const handleChoice = async (choiceIndex: number) => {
    const choice = currentSituation.choices[choiceIndex];
    const newAffinity = applyDelta(affinity, choice.delta);
    setAffinity(newAffinity);
    setSubPhase("loadingReply");
    setCurrentReply("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          heroName,
          phase: "choice",
          situation: currentSituation,
          chosenTone: choice.tone,
          affinity: newAffinity,
          history: choiceHistory,
        }),
      });

      if (!res.ok) throw new Error("API error");

      setSubPhase("showingReply");
      const reply = await readStream(res, (text) => setCurrentReply(text));

      setChoiceHistory((prev) => [
        ...prev,
        { role: "user", content: choice.text },
        { role: "assistant", content: reply },
      ]);
    } catch {
      setErrorMessage("응답 생성에 실패했습니다. 다시 시도해주세요.");
      setSubPhase("showing");
    }
  };

  const handleNext = () => {
    if (situationIndex < situations.length - 1) {
      setSituationIndex((i) => i + 1);
      setSubPhase("showing");
      setCurrentReply("");
    } else {
      setPhase("freeChat");
    }
  };

  const handleFreeChatSend = async (message: string) => {
    setIsLoading(true);
    setErrorMessage("");

    const userMsg: Message = { role: "user", content: message };
    setFreeChatHistory((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          heroName,
          phase: "freeChat",
          userMessage: message,
          affinity,
          history: freeChatHistory,
        }),
      });

      if (!res.ok) throw new Error("API error");

      // 스트리밍 중 임시 메시지를 히스토리에 추가해 실시간으로 보여줌
      const assistantMsg: Message = { role: "assistant", content: "" };
      setFreeChatHistory((prev) => [...prev, assistantMsg]);

      const reply = await readStream(res, (text) => {
        setFreeChatHistory((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: text };
          return next;
        });
      });

      setFreeChatHistory((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: reply };
        return next;
      });

      setTurnCount((t) => t + 1);
    } catch {
      setFreeChatHistory((prev) => prev.slice(0, -1));
      setErrorMessage("응답 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnding = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/ending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          affinity,
          history: [...choiceHistory, ...freeChatHistory],
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      setEndingResult(data);
      setPhase("ending");
    } catch {
      setErrorMessage("엔딩 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <AffinityBar affinity={affinity} />

      <div className={styles.content}>
        {phase === "choice" && (
          <>
            <SituationCard
              situation={currentSituation}
              situationIndex={situationIndex}
              total={situations.length}
            />

            {subPhase === "showing" && (
              <ChoiceList choices={currentSituation.choices} onSelect={handleChoice} />
            )}

            {subPhase === "loadingReply" && (
              <div className={styles.loadingRow}>
                <span className={styles.loadingDots}>…</span>
              </div>
            )}

            {subPhase === "showingReply" && (
              <CharacterReply
                reply={currentReply}
                onNext={handleNext}
                isLast={situationIndex === situations.length - 1}
              />
            )}
          </>
        )}

        {phase === "freeChat" && (
          <FreeChatInput
            history={freeChatHistory}
            turnCount={turnCount}
            maxTurns={FREE_CHAT_MAX_TURNS}
            isLoading={isLoading}
            onSend={handleFreeChatSend}
            onEnding={handleEnding}
          />
        )}

        {phase === "ending" && endingResult && (
          <EndingScreen result={endingResult} character={character} />
        )}
      </div>

      {errorMessage && (
        <div className={styles.error}>{errorMessage}</div>
      )}
    </div>
  );
}
