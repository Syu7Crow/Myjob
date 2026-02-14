// src/lib/actions.ts
"use server"

import { prisma } from './prisma' // さっき作ったファイルをインポート
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addFood(formData: FormData) {
  const name = formData.get("name") as string;
  const quantity = formData.get("quantity") as string;
  const buyDate = formData.get("buyDate") as string;

  await prisma.food.create({
    data: {
      userId: "user_01",
      name: name,
      quantity: quantity,
      buyDate: new Date(buyDate),
    },
  });

  revalidatePath("/refrigerator");
  redirect("/refrigerator");
}