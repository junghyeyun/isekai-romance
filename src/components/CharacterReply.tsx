"use client";

import styles from "./CharacterReply.module.css";

type Props = {
  reply: string;
  onNext: () => void;
  isLast: boolean;
};

export default function CharacterReply({ reply, onNext, isLast }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bubble}>
        <p className={styles.text}>{reply}</p>
      </div>
      <button className={styles.nextBtn} onClick={onNext}>
        {isLast ? "자유 채팅으로 →" : "다음 →"}
      </button>
    </div>
  );
}
