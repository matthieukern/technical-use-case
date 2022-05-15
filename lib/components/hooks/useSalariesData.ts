import { useQuery } from "react-query";
import { get as getStatistics, Statistics } from "lib/api/statistics";

type UseSalariesDataArgs = {
  selectedJobId: number
}

type UseSalariesDataValues = {
  isLoading: boolean,
  ready: boolean,
  step: number,
  startPercent: number,
  endPercent: number,
  maxSalaryDisplay: number,
  percentiles: {
    p25: number,
    mean: number,
    p75: number
  }
}

const useSalariesData = ({ selectedJobId }: UseSalariesDataArgs): UseSalariesDataValues => {
  const {
    isLoading,
    data: statistics
  } = useQuery<Statistics | null, Error>(["statistics", selectedJobId], (): Promise<Statistics | null> => getStatistics(selectedJobId));

  if (isLoading || !statistics) {
    return ({
      isLoading,
      ready: Boolean(statistics),
      step: 0,
      startPercent: 0,
      endPercent: 0,
      maxSalaryDisplay: 0,
      percentiles: {
        p25: 0,
        mean: 0,
        p75: 0
      }
    })
  }

  const order: number = Math.pow(10, Math.floor(Math.log(statistics.percentiles.mean) / Math.LN10 + 0.000000001));
  const minSalaryDisplay: number = Math.max(Math.floor(statistics.percentiles.p25 / order) * order - order, 0);
  const maxSalaryDisplay: number = Math.ceil(statistics.percentiles.p75 / order) * order + order;
  const step: number = Math.round((maxSalaryDisplay - minSalaryDisplay) / 10);

  const startPercent: number = (statistics.percentiles.p25 - minSalaryDisplay) / (maxSalaryDisplay - minSalaryDisplay) * 100;
  const endPercent: number = (statistics.percentiles.p75 - minSalaryDisplay) / (maxSalaryDisplay - minSalaryDisplay) * 100;

  return {
    isLoading,
    ready: true,
    step,
    startPercent,
    endPercent,
    maxSalaryDisplay,
    percentiles: statistics.percentiles
  }
};

export default useSalariesData;
