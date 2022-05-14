import { prisma } from "lib/prisma";

export default async function handler(req, res) {
  const allJobs = await prisma.job.findMany();

  res.status(200).json(allJobs);
}
