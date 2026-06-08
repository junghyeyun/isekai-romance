import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "16px", color: "var(--text)" }}>
      <p style={{ color: "var(--text-dim)" }}>페이지를 찾을 수 없습니다.</p>
      <Link href="/" style={{ padding: "8px 24px", border: "1px solid var(--text-dim)", borderRadius: "20px", color: "var(--text-dim)", textDecoration: "none" }}>
        처음으로
      </Link>
    </div>
  );
}
