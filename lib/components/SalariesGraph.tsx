import React from "react";
import Loader from "lib/components/Loader";
import useSalariesData from "lib/components/hooks/useSalariesData";
import SalaryDetails from "lib/components/SalaryDetails";

type SalariesGraphProps = {
  selectedJobId: number
}

const SalariesGraph: React.FC<SalariesGraphProps> = ({ selectedJobId}: SalariesGraphProps) => {
  const {
    isLoading,
    ready,
    step,
    startPercent,
    endPercent,
    maxSalaryDisplay,
    percentiles
  } = useSalariesData({ selectedJobId })

  if (isLoading) return <Loader />;

  if (!ready) return <div>Please select a job to start</div>;

  return (
    <div className="flex w-full h-full divide-x divide-gray-600 divide-x-2">
      <div className="relative w-1/12 h-full">
        {new Array(10).fill(0).map((_, index) =>
          <div key={index} style={{ height: "10%" }} className="flex items-center justify-end pr-2">
            <span>{maxSalaryDisplay - step * index}€</span></div>
        )}
      </div>
      <div className="relative w-11/12 h-full">
        <div className="absolute w-full h-full divide-y divide-dotted divide-gray-400">
          <div style={{ height: "5%" }} className="block" />
          {new Array(10).fill(0).map((_, index) => <div key={index} style={{ height: "10%" }} className="block" />)}
          <div style={{ height: "5%" }} className="block" />
        </div>
        <div className="absolute w-full h-full">
          <div style={{ height: `${100 - endPercent}%` }} className="block" />
          <div style={{ height: `${endPercent - startPercent}%` }} className="block bg-blue-700 rounded mx-1 salary-graph-item">
            <SalaryDetails percentiles={percentiles} />
          </div>
          <div style={{ height: `${startPercent}%` }} className="block" />
        </div>
      </div>
    </div>
  );
};

export default SalariesGraph;
