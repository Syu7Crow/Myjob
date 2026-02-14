import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* スマホで変なズームが起きないように viewport を固定 */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900 overflow-hidden">
        
        {/* ナビゲーション */}
        {/* スマホ：画面下部に固定 | PC：左側に固定 */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 md:relative md:w-64 md:h-full md:border-r md:border-t-0 flex md:flex-col z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:shadow-none">
          
          {/* PC用ロゴ（スマホでは隠す） */}
          <div className="hidden md:block p-8">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter">MyJob<br/>Kitchen</h1>
          </div>

          {/* メニュー項目 */}
          <div className="flex flex-row md:flex-col flex-1 justify-around md:justify-start p-2 md:px-4 md:space-y-1">
            <MenuLink href="/" icon="🏠" label="ホーム" />
            <MenuLink href="/refrigerator" icon="📦" label="冷蔵庫" />
            <MenuLink href="/scan" icon="📷" label="スキャン" />
            <MenuLink href="/recipe" icon="🍳" label="レシピ" />
          </div>
        </nav>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-screen-md mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

// メニューリンク用の共通コンポーネント
function MenuLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} className="flex flex-col md:flex-row items-center justify-center md:justify-start p-2 md:p-4 rounded-2xl hover:bg-blue-50 transition-all active:scale-95 group">
      <span className="text-2xl md:text-xl md:mr-4">{icon}</span>
      <span className="text-[10px] md:text-base font-bold md:font-medium text-gray-500 md:text-gray-700 group-hover:text-blue-600">{label}</span>
    </Link>
  );
}