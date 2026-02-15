"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addFood(formData: FormData) {
  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;
  const trashDate = formData.get("trashDate") as string;

  await prisma.refrigerator.create({
    data: {
      userId: "user_01", // 認証を入れるまでは固定値でOK
      name: name,
      quantity: quantity,
      trashDate: trashDate ? new Date(trashDate) : null,
    },
  });

  // データを更新したので冷蔵庫ページを再読込させる
  revalidatePath("/refrigerator");
  // 冷蔵庫ページに戻る
  redirect("/refrigerator");
}