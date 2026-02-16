import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { generateRecipeAction } from './actions';
import { SubmitButton } from './SubmitButton';

export const dynamic = "force-dynamic";

export default async function RecipePage() {
    const recipes = await prisma.recipe.findMany({
        where: { userId: "user_01" },
        include: { ingredients: true },
        orderBy: { createdAt: 'asc' }, // 生成された順に表示
    });

    return (
        <div className="flex min-h-screen bg-[#F5F7FB]">
            <main className="flex-1 p-6 md:p-12">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-4 mb-8">
                        <Link href="/" className="bg-white text-gray-400 px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition-colors">冷蔵庫</Link>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-blue-100">レシピ</button>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">Menu Options</h1>
                        <p className="text-sm text-gray-400 mt-1">今の食材で作れるレパートリー（全{recipes.length}件）</p>
                    </div>

                    {/* レシピリスト */}
                    <div className="grid gap-4 mb-32">
                        {recipes.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                <p className="text-gray-400 font-bold">まだ提案がありません 🍳</p>
                                <p className="text-xs text-gray-300 mt-2">下のボタンを押してAIに考えてもらいましょう</p>
                            </div>
                        ) : (
                            recipes.map((recipe) => {
                                const url = recipe.searchUrl || "";
                                const config = url.includes("cookpad.com") ? { name: "Cookpad", color: "bg-[#ff6400]" }
                                             : url.includes("rakuten.co.jp") ? { name: "楽天レシピ", color: "bg-[#bf0000]" }
                                             : url.includes("delishkitchen.tv") ? { name: "Delish", color: "bg-[#f37b21]" }
                                             : { name: "Google", color: "bg-gray-700" };

                                return (
                                    <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
                                            <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">⏳ {recipe.cookingTime}分</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-4 line-clamp-1">{recipe.description}</p>
                                        
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex -space-x-1">
                                                {recipe.ingredients.slice(0, 3).map((ing, i) => (
                                                    <div key={i} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-white">
                                                        {ing.name}
                                                    </div>
                                                ))}
                                                {recipe.ingredients.length > 3 && <span className="text-[9px] text-gray-400 ml-2">...</span>}
                                            </div>
                                            <a 
                                                href={url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className={`${config.color} text-white text-xs px-4 py-2 rounded-lg font-bold whitespace-nowrap`}
                                            >
                                                {config.name}で開く
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="fixed bottom-8 left-0 right-0 px-6">
                        <form action={generateRecipeAction as any} className="max-w-2xl mx-auto">
                            <SubmitButton />
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}