// src/app/add/page.tsx
import { addFood } from "@/lib/actions";

export default function AddFoodPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
          食材を登録 🍎
        </h1>

        <form action={addFood} className="space-y-6">
          {/* 食材名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              食材の名前
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="例：たまご、牛乳"
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            />
          </div>

          {/* 個数 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              個数・量
            </label>
            <input
              name="quantity"
              type="text"
              required
              placeholder="例：1パック、500ml"
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            />
          </div>

          {/* 購入日 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              購入日
            </label>
            <input
              name="buyDate"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            />
          </div>

          {/* 登録ボタン */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            冷蔵庫に追加する
          </button>
        </form>
      </div>
    </div>
  );
}