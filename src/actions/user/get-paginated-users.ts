"use server";

import { auth } from "@/auth";
import { getPrisma } from "@/lib/prisma";

const prisma = getPrisma();
export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser un administrador",
    };
  }

  const users = await prisma.user.findMany({ orderBy: { name: "desc" } });

  return {
    ok: true,
    users: users,
  };
};
