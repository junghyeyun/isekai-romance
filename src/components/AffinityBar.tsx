"use client";

import styles from "./AffinityBar.module.css";

type Props = {
  affinity: number;
};

function getLabel(affinity: number): string {
  if (affinity <= 20) return "경계";
  if (affinity <= 50) return "관심";
  if (affinity <= 80) return "호감";
  return "연모";
}

function getColorClass(affinity: number): string {
  if (affinity <= 20) return styles.gray;
  if (affinity <= 50) return styles.blue;
  if (affinity <= 80) return styles.purple;
  return styles.rose;
}

export default function AffinityBar({ affinity }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{getLabel(affinity)}</span>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${getColorClass(affinity)}`}
          style={{ width: `${affinity}%` }}
        />
      </div>
      <span className={styles.value}>{affinity}</span>
    </div>
  );
}
