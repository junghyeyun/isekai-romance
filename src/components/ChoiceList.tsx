"use client";

import { useMemo } from "react";
import type { Choice } from "@/lib/types";
import styles from "./ChoiceList.module.css";

type Props = {
  choices: [Choice, Choice, Choice];
  onSelect: (index: number) => void;
};

export default function ChoiceList({ choices, onSelect }: Props) {
  const shuffled = useMemo(() => {
    return [...choices]
      .map((choice, originalIndex) => ({ choice, originalIndex }))
      .sort(() => Math.random() - 0.5);
  }, [choices]);

  return (
    <div className={styles.list}>
      {shuffled.map(({ choice, originalIndex }, i) => (
        <button
          key={originalIndex}
          className={styles.button}
          onClick={() => onSelect(originalIndex)}
        >
          <span className={styles.num}>{i + 1}</span>
          <span className={styles.text}>{choice.text}</span>
        </button>
      ))}
    </div>
  );
}
