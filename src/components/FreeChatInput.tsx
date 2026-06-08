"use client";

import { useState } from "react";
import type { Message } from "@/lib/types";
import styles from "./FreeChatInput.module.css";

type Props = {
  history: Message[];
  turnCount: number;
  maxTurns: number;
  isLoading: boolean;
  onSend: (message: string) => void;
  onEnding: () => void;
};

export default function FreeChatInput({
  history,
  turnCount,
  maxTurns,
  isLoading,
  onSend,
  onEnding,
}: Props) {
  const [input, setInput] = useState("");
  const remaining = maxTurns - turnCount;
  const done = turnCount >= maxTurns;

  const handleSend = () => {
    if (!input.trim() || isLoading || done) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.guide}>이제 하고 싶은 말을 전해보세요.</p>
        {!done && (
          <span className={styles.turns}>{remaining}턴 남음</span>
        )}
      </div>

      <div className={styles.history}>
        {history.map((msg, i) => (
          <div
            key={i}
            className={`${styles.msg} ${msg.role === "user" ? styles.user : styles.assistant}`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.msg} ${styles.assistant}`}>
            <p className={styles.loading}>…</p>
          </div>
        )}
      </div>

      {!done ? (
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="마음을 전해보세요…"
            disabled={isLoading}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            전송
          </button>
        </div>
      ) : (
        <div className={styles.endingWrap}>
          <button className={styles.endingBtn} onClick={onEnding} disabled={isLoading}>
            {isLoading ? "엔딩 생성 중…" : "엔딩 보기"}
          </button>
        </div>
      )}
    </div>
  );
}
