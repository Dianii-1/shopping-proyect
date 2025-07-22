"use server";

import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async () => {
  try {
    const productsdb = await prisma.product.findMany({
      //   take: 2,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    return {
      products: productsdb.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudio realizar la consulta");
  }
};
