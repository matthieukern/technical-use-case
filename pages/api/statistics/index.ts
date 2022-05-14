import { prisma } from "lib/prisma";

type Statistics = {
  p25: number;
  mean: number;
  p75: number;
  sampleSize: number;
};

export default async function handler(req, res) {
  const [data]: Statistics[] = await prisma.$queryRaw`
     SELECT
       percentile_disc(0.25) WITHIN GROUP (ORDER BY salary) as p25,
       percentile_disc(0.5) WITHIN GROUP (ORDER BY salary) as mean,
       percentile_disc(0.75) WITHIN GROUP (ORDER BY salary) as p75,
       count(*) as "sampleSize"
     FROM "Employee"
     WHERE "jobId" = ${Number(req.query.jobId)}
  `;

  if (!data || !data.sampleSize) {
    res.status(404).json({ status: "not found" });
    return;
  }

  const formattedData = {
    jobId: Number(req.query.jobId),
    sampleSize: data.sampleSize,
    percentiles: {
      p25: data.p25,
      mean: data.mean,
      p75: data.p75,
    },
  };

  res.status(200).json(formattedData);
}
