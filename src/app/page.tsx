"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleStart = () => {
    if (!name.trim()) return;
    localStorage.setItem("heroName", name.trim());
    router.push("/intro");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <p className={styles.subtitle}>ISEKAI ROMANCE</p>
        <h1 className={styles.title}>오늘부터 여주입니다</h1>
        <p className={styles.desc}>당신의 이세계 이야기가 시작됩니다.</p>

        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="여주인공의 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            maxLength={10}
          />
          <button
            className={styles.button}
            onClick={handleStart}
            disabled={!name.trim()}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
