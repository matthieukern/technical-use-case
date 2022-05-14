import { prisma } from "lib/prisma";

export default async function truncate() {
  await prisma.employee.deleteMany();
  await prisma.job.deleteMany();
  return null;
}
