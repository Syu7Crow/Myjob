// src/app/refrigerator/page.tsx
import Link from 'next/link';
import { prisma } from '@/lib/prisma'; // さっき苦労して作ったprisma.ts

export default async function RefrigeratorPage() {
  // DBから全食材を取得（userIdが固定ならwhere句はなくてもOKですが、一応）
  const foods = await prisma.food.findMany({
    where: { userId: "user_01" },
    orderBy: { buyDate: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">冷蔵庫の中身</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">ホームへ</Link>
        </div>

        <div className="space-y-4">
          {foods.length === 0 ? (
            <p className="text-center text-gray-500 py-10">食材がありません</p>
          ) : (
            foods.map((food) => (
              <div key={food.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg text-gray-700">{food.name}</h2>
                  <p className="text-xs text-gray-400">
                    期限: {food.trashDate
                      ? new Date(food.trashDate).toLocaleDateString('ja-JP')
                      : "未設定"}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {food.quantity}
                </div>
              </div>
            ))
          )}
        </div>

        <Link href="/add">
          <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition">
            ＋ 食材を追加する
          </button>
        </Link>
      </div>
    </div>
  );
}