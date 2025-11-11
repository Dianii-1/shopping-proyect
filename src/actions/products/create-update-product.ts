"use server";

import { Gender, Product, Size } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { optional, z } from "zod";

const productSchema = z.object({
  id: z.uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.enum(Gender),
});

export const createUpdateProduct = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "").trim();

  const { id, ...rest } = product;

  const prismaTx = await prisma.$transaction(async (tx) => {
    let productResult: Product;
    const tags = rest.tags.split(",").map((tag) => tag.trim().toLowerCase());
    if (id) {
      // Actualizar

      productResult = await prisma.product.update({
        where: { id },
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tags },
        },
      });
    } else {
      // crear
      productResult = await prisma.product.create({
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tags },
        },
      });
    }

    console.log({ productResult });

    return {
      productResult,
    };
  });

  // Todo: Revalidate path

  return {
    ok: true,
    // product: prismaTx,
  };
};
