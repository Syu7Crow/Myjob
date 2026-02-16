"use server";

import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const apiKey = (process.env.GEMINI_API_KEY || "").replace(/[^\x21-\x7E]/g, "").trim();

export async function generateRecipeAction() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const foods = await prisma.refrigerator.findMany();
    if (foods.length === 0) return;

    const foodList = foods.map(f => f.name).join(", ");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, { apiVersion: "v1beta" });

    // 「3つ以上、可能な限りたくさん」と指示
    const prompt = `冷蔵庫にある食材リストから、相性の良いものを組み合わせて、レシピサイトに実在する定番料理を【3つ以上、可能な限りたくさん】提案してください。
食材リスト: ${foodList}

指示:
- 全ての食材を使う必要はありません。
- 定番の組み合わせ（例：鶏肉と卵、牛肉と玉ねぎ等）を見つけて、それぞれのパターンで料理を提案してください。
- 料理名は具体的で一般的な名称（クックパッド等でヒットするもの）にしてください。

出力フォーマット(JSON配列のみ):
[
  {
    "title": "料理名",
    "description": "説明",
    "cookingTime": 20,
    "preferredPlatform": "cookpad",
    "ingredients": [{ "name": "材料名", "amount": "分量" }],
    "instructions": [{ "stepNumber": 1, "text": "手順内容" }]
  }
]`.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonString = text.substring(text.indexOf('['), text.lastIndexOf(']') + 1);
    const recipesData = JSON.parse(jsonString);

    // 以前の提案をすべてリセット（常に最新の検索結果リストを表示するため）
    await prisma.recipe.deleteMany({ where: { userId: "user_01" } });

    // 生成されたすべてのレシピを保存
    for (const data of recipesData) {
      const encodedTitle = encodeURIComponent(data.title);
      let searchUrl = "";
      switch (data.preferredPlatform) {
        case "cookpad": searchUrl = `https://cookpad.com/search/${encodedTitle}`; break;
        case "rakuten": searchUrl = `https://recipe.rakuten.co.jp/search/${encodedTitle}/`; break;
        case "delishkitchen": searchUrl = `https://delishkitchen.tv/search?q=${encodedTitle}`; break;
        default: searchUrl = `https://www.google.com/search?q=${encodedTitle}+レシピ`;
      }

      await prisma.recipe.create({
        data: {
          userId: "user_01",
          title: data.title,
          description: data.description,
          cookingTime: Number(data.cookingTime) || 20,
          searchUrl: searchUrl,
          ingredients: { create: data.ingredients },
          instructions: { create: data.instructions },
        },
      });
    }

  } catch (error: any) {
    console.error("❌ エラー:", error.message);
  }

  revalidatePath("/recipe");
  redirect("/recipe");
}