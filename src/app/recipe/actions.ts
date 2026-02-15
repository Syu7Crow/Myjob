"use server";

import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const rawKey = process.env.GEMINI_API_KEY || "";

export async function generateRecipeAction() {
  console.log("🚀 アクション開始");

  const apiKey = rawKey.replace(/[^\x21-\x7E]/g, "").trim();

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const foods = await prisma.refrigerator.findMany();

    if (foods.length === 0) {
      console.log("⚠️ 食材がありません");
      return;
    }

    const foodList = foods.map(f => f.name).join(", ");

    // 先ほど成功した 2.0-flash を使用
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash" },
      { apiVersion: "v1beta" }
    );

    console.log("🤖 Geminiにリクエスト中...");

    // プロンプトを強化：AIに「どのサイトが最適か」も選ばせる
    const prompt = `以下の食材を使った料理レシピを1つ提案し、JSON形式で出力してください。
食材: ${foodList}

出力フォーマット:
{
  "title": "料理名",
  "description": "説明",
  "cookingTime": 20,
  "preferredPlatform": "cookpad", 
  "ingredients": [{ "name": "材料名", "amount": "分量" }],
  "instructions": [{ "stepNumber": 1, "text": "手順内容" }]
}

※ preferredPlatform は "cookpad", "rakuten", "delishkitchen" のいずれかから選んでください。`.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("📝 Geminiからの回答受信");

    const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const recipeData = JSON.parse(jsonString);

    // --- ここでURLを出し分けるロジック ---
    let searchUrl = "";
    const encodedTitle = encodeURIComponent(recipeData.title);

    switch (recipeData.preferredPlatform) {
      case "cookpad":
        searchUrl = `https://cookpad.com/search/${encodedTitle}`;
        break;
      case "rakuten":
        searchUrl = `https://recipe.rakuten.co.jp/search/${encodedTitle}/`;
        break;
      case "delishkitchen":
        searchUrl = `https://delishkitchen.tv/search?q=${encodedTitle}`;
        break;
      default:
        // 判定が漏れた場合のデフォルト
        searchUrl = `https://www.google.com/search?q=${encodedTitle}+レシピ`;
    }

    await prisma.recipe.create({
      data: {
        userId: "user_01",
        title: recipeData.title,
        description: recipeData.description,
        cookingTime: Number(recipeData.cookingTime) || 20,
        searchUrl: searchUrl, // AIが選んだサイトのURLを保存
        ingredients: { create: recipeData.ingredients },
        instructions: { create: recipeData.instructions },
      },
    });

    console.log(`✅ DB保存成功！ (サイト: ${recipeData.preferredPlatform})`);

  } catch (error: any) {
    console.error("❌ エラー発生:", error.message);
  }

  revalidatePath("/recipe");
  redirect("/recipe");
}