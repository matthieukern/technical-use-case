import React from "react";
import classNames from "classnames";
import { Job } from "lib/api/jobs";

type JobItemProps = {
  job: Job;
  selectedJobId: number;
  selectJobId: Function;
};

const JobItem: React.FC<JobItemProps> = ({
  job,
  selectedJobId,
  selectJobId,
}: JobItemProps) => (
  <div
    key={job.id}
    className={classNames(
      "w-full my-3 p-1 rounded text-center cursor-pointer",
      {
        "bg-zinc-100": selectedJobId !== job.id,
        "selected bg-sky-100": selectedJobId === job.id,
      }
    )}
    onClick={() => selectJobId(job.id)}
  >
    {job.name}
  </div>
);

export default JobItem;
