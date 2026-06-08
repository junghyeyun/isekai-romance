"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const SLIDES = [
  "눈을 떴을 때, 나는 낯선 곳에 있었다.",
  "현대도 아니고, 내가 아는 어떤 세계도 아닌 곳.",
  "이세계에 소환된 자에게는 신탁이 내려진다고 했다.",
  "운명의 상대를 찾으라고.",
  "그리고 나는… 그들을 만났다.",
];

export default function IntroPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = () => {
    if (fading) return;
    if (index < SLIDES.length - 1) {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => i + 1);
        setFading(false);
      }, 300);
    } else {
      router.push("/select");
    }
  };

  return (
    <div className={styles.container} onClick={advance}>
      <div className={`${styles.text} ${fading ? styles.fading : styles.visible}`}>
        {SLIDES[index]}
      </div>
      <p className={styles.hint}>
        {index < SLIDES.length - 1 ? "탭하여 계속" : "탭하여 시작"}
      </p>
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === index ? styles.dotActive : ""}`} />
        ))}
      </div>
    </div>
  );
}
