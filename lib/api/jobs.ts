import axios from "axios";

export type Job = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date
}

export const get = (): Promise<Job[]> => {
  return axios
    .get("/api/jobs")
    .then(res => res.data)
};
