"use server";

import { getPrisma } from "@/lib/prisma";

const prisma = getPrisma();
export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return countries;
  } catch (error) {
    return [];
  }
};
