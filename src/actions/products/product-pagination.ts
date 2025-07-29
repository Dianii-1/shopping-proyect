"use server";

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
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
      where: {
        gender: gender ?? undefined,
      },
    });

    // 2.obtener el total de paginas
    const totalCount = await prisma.product.count({
      where: {
        gender: gender ?? undefined,
      },
    });
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
