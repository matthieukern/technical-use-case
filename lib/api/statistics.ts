import axios from "axios";

export type Statistics = {
  jobId: number,
  sampleSize: number,
  percentiles: {
    p25: number,
    mean: number,
    p75: number
  }
}

export const get = (jobId): Promise<Statistics | null> => {
  if (!jobId) {
    return Promise.resolve(null);
  }

  return axios
    .get("/api/statistics", {
      params: {
        jobId
      }
    })
    .then(res => res.data)
};
