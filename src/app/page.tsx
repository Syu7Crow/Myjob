import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-10 text-center font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">MyJob キッチンアシスタント</h1>
      <p className="text-gray-600 mb-8">管理したい項目を選択してください</p>

      <div className="flex gap-5 justify-center mt-8">
        {/* 冷蔵庫ページへのボタン */}
        <Link href="/refrigerator">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105">
            📦 冷蔵庫の中身を見る
          </button>
        </Link>

        {/* スキャンページへのボタン */}
        <Link href="/scan">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105">
            📷 食材をスキャンする
          </button>
        </Link>
      </div>
    </main>
  );
}