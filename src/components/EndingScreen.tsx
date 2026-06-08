"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { EndingResponse, CharacterKey } from "@/lib/types";
import styles from "./EndingScreen.module.css";

type Props = {
  result: EndingResponse;
  character: CharacterKey;
};

const ENDING_IMAGES: Record<CharacterKey, Record<"happy" | "normal", string>> = {
  kalian: {
    happy: "/images/kalian-ending-happy.png",
    normal: "/images/kalian-ending-normal.png",
  },
  elion: {
    happy: "/images/elion-ending-happy.png",
    normal: "/images/elion-ending-normal.png",
  },
  sion: {
    happy: "/images/sion-ending-happy.png",
    normal: "/images/sion-ending-normal.png",
  },
};

export default function EndingScreen({ result, character }: Props) {
  const router = useRouter();
  const imageSrc = ENDING_IMAGES[character][result.type];

  return (
    <div className={styles.container}>
      <div className={styles.imageWrap}>
        <Image
          src={imageSrc}
          alt={result.type === "happy" ? "해피엔딩" : "노멀엔딩"}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
        <div className={styles.imageOverlay} />
        <div className={styles.badge}>
          {result.type === "happy" ? "✦ HAPPY ENDING ✦" : "— NORMAL ENDING —"}
        </div>
      </div>

      <div className={styles.narrative}>
        <p>{result.narrative}</p>
      </div>

      <button
        className={styles.restartBtn}
        onClick={() => {
          localStorage.removeItem("heroName");
          router.push("/");
        }}
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}
