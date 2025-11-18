"use server";

import { getPrisma } from "@/lib/prisma";

const prisma = getPrisma();
export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma?.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
    throw new Error("Error al optener el producto por slug");
  }
};
