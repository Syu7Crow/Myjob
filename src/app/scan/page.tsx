'use client';

import Link from 'next/link';

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold tracking-widest">FOOD SCANNER</h1>
        <Link href="/" className="text-gray-400 hover:text-white transition">
          ✕ 閉じる
        </Link>
      </div>

      {/* カメラプレビュー風エリア */}
      <div className="relative flex-1 bg-gray-900 rounded-3xl overflow-hidden border-2 border-gray-800 flex items-center justify-center">
        {/* 四隅のスキャン枠 */}
        <div className="absolute top-10 left-10 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
        <div className="absolute top-10 right-10 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
        <div className="absolute bottom-10 left-10 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>

        {/* 中央のメッセージ */}
        <div className="text-center">
          <div className="mb-4 text-5xl opacity-50">📷</div>
          <p className="text-gray-400 text-sm">食材を枠内に収めてください</p>
        </div>

        {/* スキャン実行ボタン */}
        <button className="absolute bottom-8 w-16 h-16 bg-white rounded-full border-4 border-gray-400 active:scale-90 transition-transform">
        </button>
      </div>

      {/* 操作ガイド */}
      <div className="mt-8 bg-gray-800 p-4 rounded-2xl">
        <h3 className="text-sm font-bold text-green-400 mb-1">使い方</h3>
        <p className="text-xs text-gray-300 leading-relaxed">
          レシートや食材のバーコードをスキャンすると、自動的に名前と消費期限を読み取ります。
        </p>
      </div>

      {/* 手動入力への誘導 */}
      <button className="mt-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition">
        うまく読み取れない場合はこちら
      </button>
    </div>
  );
}