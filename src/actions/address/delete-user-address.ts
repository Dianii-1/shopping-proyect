"use server";
import { getPrisma } from "@/lib/prisma";

const prisma = getPrisma();
export const deleteUserAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({ where: { userId } });
    return {
      ok: true,
    };
  } catch (error) {
    console.log("error set", error);
    return {
      ok: false,
      message: "No se pudo eliminar la direccion",
    };
  }
};
