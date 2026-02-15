// src/lib/actions.ts
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
      userId: "user_01", 
      name: name,
      quantity: quantity,
      trashDate: trashDate ? new Date(trashDate) : null,
    },
  });

  revalidatePath("/refrigerator");
  redirect("/refrigerator");
}