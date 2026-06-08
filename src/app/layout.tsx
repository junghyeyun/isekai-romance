import type { Metadata } from "next";
import { Noto_Serif_KR, Cinzel } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
  variable: "--font-serif-kr",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "오늘부터 여주입니다",
  description: "이세계 판타지 미연시 게임",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} ${cinzel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
