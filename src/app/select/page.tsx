"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const CHARACTERS = [
  {
    key: "kalian",
    name: "칼리안",
    title: "북부대공",
    desc: "차갑지만, 결정적인 순간 몸이 먼저 움직이는 남자.",
    image: "/images/kalian-1.png",
    available: true,
    accentColor: "#c9a84c",
  },
  {
    key: "elion",
    name: "엘리온",
    title: "황태자",
    desc: "항상 웃지만, 나를 볼 때만 눈빛이 달라지는 남자.",
    image: null,
    available: false,
    accentColor: "#d4af6a",
  },
  {
    key: "sion",
    name: "시온",
    title: "공작",
    desc: "오래된 친구지만, 사실 제일 오래 좋아해온 남자.",
    image: null,
    available: false,
    accentColor: "#c17f3a",
  },
] as const;

export default function SelectPage() {
  const router = useRouter();
  const [toast, setToast] = useState(false);

  const handleSelect = (key: string, available: boolean) => {
    if (available) {
      router.push(`/game/${key}`);
    } else {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>운명의 상대를 선택하세요</p>
        <h2 className={styles.title}>당신의 이야기를 함께할 사람은?</h2>
      </div>

      <div className={styles.cards}>
        {CHARACTERS.map((ch) => (
          <button
            key={ch.key}
            className={`${styles.card} ${!ch.available ? styles.locked : ""}`}
            onClick={() => handleSelect(ch.key, ch.available)}
            style={{ "--ch-accent": ch.accentColor } as React.CSSProperties}
          >
            <div className={styles.imageWrap}>
              {ch.image ? (
                <Image
                  src={ch.image}
                  alt={ch.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
              {!ch.available && (
                <div className={styles.comingSoon}>준비 중</div>
              )}
            </div>
            <div className={styles.info}>
              <p className={styles.chTitle}>{ch.title}</p>
              <p className={styles.chName}>{ch.name}</p>
              <p className={styles.chDesc}>{ch.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {toast && (
        <div className={styles.toast}>곧 만날 수 있어요 💫</div>
      )}
    </div>
  );
}
