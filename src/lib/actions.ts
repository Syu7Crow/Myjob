// src/lib/actions.ts
"use server"

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addFood(formData: FormData) {
    const name = formData.get("name") as string;
    const quantity = formData.get("quantity") as string;
    const buyDate = formData.get("buyDate") as string;
    const trashDate = formData.get("trashDate") as string; // 追加

    await prisma.food.create({
        data: {
            userId: "user_01",
            name: name,
            quantity: quantity,
            buyDate: new Date(buyDate),
            trashDate: trashDate ? new Date(trashDate) : null, // 追加
        },
    });

    revalidatePath("/refrigerator");
    redirect("/refrigerator");
}