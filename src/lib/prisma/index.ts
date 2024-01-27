import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

/**
 * Connect with the database
 *
 */
export const dbConnect = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const dbDisconnect = async () => {
  await prisma.$disconnect();
};


