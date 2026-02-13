// 一番上に追加

import "./globals.css";

export const metadata = {
  title: "Myjob",
  description: "Myjob Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}