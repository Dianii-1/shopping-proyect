"use server";

import { Gender, Product, Size } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

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

  try {
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

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if (formdata.getAll("images")) {
        const images = await uploadImages(formdata.getAll("images") as File[]);

        if (!images) {
          throw new Error("No se pudo cargar las imagenes, rollback");
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: productResult.id,
          })),
        });
      }

      return {
        productResult,
      };
    });

    // Revalidate path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.productResult,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Revisar logs, No se pudo actualizar/crear ",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => {
            console.log(r.secure_url);
            return r.secure_url;
          });
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
