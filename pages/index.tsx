import {
  useQuery
} from "react-query";
import React, {
  useCallback,
  useState
} from "react";
import Loader from "lib/components/Loader";
import { get as getJobs, Job } from "lib/api/jobs";
import SalariesGraph from "lib/components/SalariesGraph";
import JobItem from "lib/components/JobItem";

const JobsStatistics: React.FC = () => {
  const { isLoading, data: jobs } = useQuery<Job[], Error>("jobs", getJobs);
  const [selectedJobId, setSelectedJobId] = useState<number>(0);

  const selectJobId = useCallback((id: number) => {
    setSelectedJobId(id);
  }, [setSelectedJobId]);

  if (!jobs || isLoading) return <Loader />;

  return (
    <div
      className="w-full h-full flex bg-gray-100"
      data-testid="root"
    >
      <div className="flex-auto w-3/12 p-5 m-3 mr-0 bg-white rounded drop-shadow-md">
        <h1>Which role are you interested in?</h1>
        {jobs.map(job => <JobItem key={job.id} job={job} selectedJobId={selectedJobId} selectJobId={selectJobId} />)}
      </div>
      <div className="flex-auto w-9/12 p-5 m-3 bg-white rounded drop-shadow-md">
        <SalariesGraph selectedJobId={selectedJobId} />
      </div>
    </div>
  );
};

export default JobsStatistics;
