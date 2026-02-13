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
      <body>
        {/* ここに page.tsx の内容が流し込まれます */}
        {children}
      </body>
    </html>
  )
}