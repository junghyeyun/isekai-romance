"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "16px", color: "var(--text)" }}>
      <p style={{ color: "var(--text-dim)" }}>오류가 발생했습니다.</p>
      <button onClick={reset} style={{ padding: "8px 24px", border: "1px solid var(--text-dim)", borderRadius: "20px", background: "transparent", color: "var(--text-dim)", cursor: "pointer" }}>
        다시 시도
      </button>
    </div>
  );
}
