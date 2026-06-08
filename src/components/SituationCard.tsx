"use client";

import Image from "next/image";
import type { Situation } from "@/lib/types";
import styles from "./SituationCard.module.css";

type Props = {
  situation: Situation;
  situationIndex: number;
  total: number;
};

export default function SituationCard({ situation, situationIndex, total }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={situation.image}
          alt={`상황 ${situationIndex + 1}`}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
        <div className={styles.overlay} />
        <span className={styles.counter}>
          {situationIndex + 1} / {total}
        </span>
      </div>

      <div className={styles.textArea}>
        <p className={styles.narration}>{situation.narration}</p>
        <p className={styles.characterLine}>
          <span className={styles.dash}>— </span>
          {situation.characterLine}
        </p>
      </div>
    </div>
  );
}
