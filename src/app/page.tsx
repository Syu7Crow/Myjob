import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { refrigerator } from '@prisma/client';

export default async function RefrigeratorPage() {
  let foods: refrigerator[] = [];
  try {
    // NeonDBからデータを取得
    foods = await prisma.refrigerator.findMany({
      orderBy: { buyDate: 'asc' },
    });
  } catch (e) {
    console.error("DB取得エラー:", e);
  }

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      {/* メインコンテンツ */}
      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-2xl mx-auto">
          
          {/* ★ 追加：ナビゲーションタブ */}
          <div className="flex gap-4 mb-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-blue-100">
              冷蔵庫
            </button>
            <Link href="/recipe" className="bg-white text-gray-400 px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-colors">
              レシピ
            </Link>
          </div>
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-gray-800">冷蔵庫の中身</h1>
            <Link href="/" className="text-sm text-blue-500 hover:underline">ホームへ</Link>
          </div>

          {/* 食材カードリスト */}
          <div className="space-y-3 mb-10">
            {foods.length === 0 ? (
              <p className="text-center py-10 text-gray-400">食材が登録されていません</p>
            ) : (
              foods.map((food: any) => (
                <div key={food.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex justify-between items-center transition-hover hover:shadow-md">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-700">{food.name}</span>
                    <span className="text-xs text-gray-400">
                      期限: {food.trashDate ? new Date(food.trashDate).toLocaleDateString('ja-JP') : '未設定'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                      {food.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 追加ボタン */}
          <Link
            href="/add"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            <span>＋</span>
            <span>食材を追加する</span>
          </Link>
        </div>
      </main>
    </div>
  );
}