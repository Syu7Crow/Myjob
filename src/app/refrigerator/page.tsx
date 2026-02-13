'use client';

import Link from 'next/link';

export default function RefrigeratorPage() {
  const foods = [
    { id: 1, name: "たまご", quantity: "6個", date: "2026-02-20", color: "bg-yellow-100" },
    { id: 2, name: "牛乳", quantity: "1本", date: "2026-02-18", color: "bg-blue-100" },
    { id: 3, name: "鶏もも肉", quantity: "300g", date: "2026-02-15", color: "bg-red-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">冷蔵庫の中身</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">ホームへ</Link>
        </div>

        <div className="space-y-4">
          {foods.map((food) => (
            <div key={food.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg text-gray-700">{food.name}</h2>
                <p className="text-xs text-gray-400">期限: {food.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${food.color}`}>
                {food.quantity}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition">
          ＋ 食材を追加する
        </button>
      </div>
    </div>
  );
}