"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;

  if (page < 1) page = 1;

  try {
    // 1. obtener los productos
    const productsdb = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take, // se coloca asi por que hace alucion a la cantidad que se quiere saltar
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // 2.obtener el total de paginas
    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: productsdb.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudio realizar la consulta");
  }
};
