import { PrismaClient } from "../generated/prisma";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// const prisma = new PrismaClient();
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };
// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV === "production") globalForPrisma.prisma = prisma;

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// export default prisma;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
