"use server";

import { auth } from "@/auth";
import { getPrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const prisma = getPrisma();
export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser un administrador",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    // esto ayuda a realizar revalidaciones de ciertas rutas para evitar que entre en cache
    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo cambiar el rol del usuario, revisar logs",
    };
  }
};
