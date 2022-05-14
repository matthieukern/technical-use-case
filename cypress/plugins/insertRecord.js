import { prisma } from "lib/prisma";

export default function insertRecord(model, data) {
  return prisma[model].create({
    data,
  });
}
