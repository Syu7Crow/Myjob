import { prisma } from '@/lib/prisma';
import Link from 'next/link';
// Prismaから生成された型をインポート
import { Recipe, Ingredient } from '@prisma/client';

// レシピに材料が含まれた状態の型を定義
type RecipeWithIngredients = Recipe & {
    ingredients: Ingredient[];
};

export default async function RecipePage() {
    // ★ ここで型を指定！
    let recipes: RecipeWithIngredients[] = [];

    try {
        recipes = await prisma.recipe.findMany({
            include: {
                ingredients: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {
        console.error("レシピ取得エラー:", e);
    }

    return (
        <div className="flex min-h-screen bg-[#F5F7FB]">
            <main className="flex-1 p-6 md:p-12">
                <div className="max-w-2xl mx-auto">

                    {/* ナビゲーション */}
                    <div className="flex gap-4 mb-8">
                        <Link href="/" className="bg-white text-gray-400 px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-colors">
                            冷蔵庫
                        </Link>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-blue-100">
                            レシピ
                        </button>
                    </div>

                    {/* ヘッダー */}
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800">Recipes</h1>
                            <p className="text-sm text-gray-400 mt-1">おすすめの献立</p>
                        </div>
                    </div>

                    {/* レシピリスト */}
                    <div className="grid gap-4 mb-24">
                        {recipes.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                <p className="text-gray-400 font-bold">まだレシピがありません 🍳</p>
                                <p className="text-xs text-gray-300 mt-2 text-balance">AIに冷蔵庫の食材から考えてもらいましょう</p>
                            </div>
                        ) : (
                            recipes.map((recipe: any) => (
                                <div key={recipe.id} className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-50 transition-all hover:shadow-md">
                                    <div className="p-5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{recipe.description}</p>
                                            </div>
                                            <span className="bg-orange-50 text-orange-500 text-[10px] font-black px-2 py-1 rounded-lg">
                                                {recipe.cookingTime}分
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {recipe.ingredients.slice(0, 3).map((ing: any) => (
                                                <span key={ing.id} className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded-md">
                                                    {ing.name}
                                                </span>
                                            ))}
                                            {recipe.ingredients.length > 3 && (
                                                <span className="text-[10px] text-gray-300 self-center">...他</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* AIレシピ生成ボタン（将来用） */}
                    <div className="fixed bottom-8 left-0 right-0 px-6">
                        <button
                            className="max-w-2xl mx-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-blue-200 hover:opacity-90 transition-all active:scale-[0.98]"
                        >
                            <span className="text-xl">✨</span>
                            <span>AIにレシピを考えてもらう</span>
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}