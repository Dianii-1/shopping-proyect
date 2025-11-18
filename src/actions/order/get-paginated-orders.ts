"use server";

import { auth } from "@/auth";
import { getPrisma } from "@/lib/prisma";

const prisma = getPrisma();
export const getPaginatedOrders = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe ser un administrador" };
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAd: "desc" },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders: orders,
  };
};
