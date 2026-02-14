import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex h-screen bg-gray-50">
        {/* サイドバー */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold text-blue-600 tracking-tighter">
              MyJob Kitchen
            </h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <Link
              href="/"
              className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
            >
              <span className="mr-3">🏠</span>
              <span className="font-medium">ホーム</span>
            </Link>

            <Link
              href="/refrigerator"
              className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span className="mr-3">📦</span>
              <span className="font-medium">冷蔵庫</span>
            </Link>
            <Link
              href="/recipe"
              className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span className="mr-3">📷</span>
              <span className="font-medium">レシピ</span>
            </Link>
            <Link
              href="/scan"
              className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span className="mr-3">📷</span>
              <span className="font-medium">スキャン</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">Version 1.0.0</p>
          </div>
        </aside>

        {/* メインコンテンツ表示エリア */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}