'use client';

export default function RecipePage() {
    // 1. 冷蔵庫にある材料（ダミー）
    const myIngredients = ["たまご", "鶏もも肉", "キャベツ"];

    // 2. 提案レシピのデータ
    const recipes = [
        {
            id: 1,
            title: "ふわとろ親子丼",
            time: "15分",
            matchIngredients: ["たまご", "鶏もも肉"],
            image: "🍳",
            description: "冷蔵庫の鶏肉と卵でパパッと作れる定番メニューです。",
            difficulty: "簡単"
        },
        {
            id: 2,
            title: "鶏肉とキャベツの旨塩炒め",
            time: "10分",
            matchIngredients: ["鶏もも肉", "キャベツ"],
            image: "🥗",
            description: "キャベツの甘みと鶏肉のジューシーさが相性抜群！",
            difficulty: "普通"
        },
        {
            id: 3,
            title: "具だくさんお好み焼き",
            time: "20分",
            matchIngredients: ["たまご", "キャベツ"],
            image: "🥞",
            description: "余ったキャベツを大量消費できるヘルシーレシピ。",
            difficulty: "普通"
        }
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* ヘッダーセクション */}
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">おすすめレシピ</h1>
                <p className="text-gray-500">
                    現在の冷蔵庫にある <span className="font-bold text-blue-600">{myIngredients.join("、")}</span> を使ったレシピです。
                </p>
            </header>

            {/* レシピカード一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 bg-orange-50 flex items-center justify-center text-5xl">
                            {recipe.image}
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
                                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">
                                    {recipe.difficulty}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {recipe.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {recipe.matchIngredients.map((ing) => (
                                    <span key={ing} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                        #{ing}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className="text-sm text-gray-400">⏱ {recipe.time}</span>
                                <button className="text-sm font-bold text-blue-600 hover:text-blue-800">
                                    レシピを見る →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 材料が足りない時の案内 */}
            <div className="mt-12 p-6 bg-blue-50 rounded-2xl text-center">
                <p className="text-blue-700 font-medium">
                    「玉ねぎ」があれば、さらに5件のレシピが作れます！
                </p>
                <button className="mt-2 text-sm text-blue-600 underline font-bold">
                    買い物リストに追加する
                </button>
            </div>
        </div>
    );
}