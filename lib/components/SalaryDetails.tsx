type SalaryDetailsProps = {
  percentiles: {
    p25: number;
    mean: number;
    p75: number;
  };
};

const SalaryDetails: React.FC<SalaryDetailsProps> = ({
  percentiles,
}: SalaryDetailsProps) => {
  const formatter = new Intl.NumberFormat();

  return (
    <div className="relative w-full h-full flex flex-col justify-around text-center">
      <div
        data-testid="p75-salary"
        className="absolute -top-3 inset-x-1/2 -translate-x-1/2 w-1/3 bg-blue-100 rounded"
      >
        ⬆️&nbsp;&nbsp;{formatter.format(percentiles.p75)}€
      </div>
      <div data-testid="mean-salary" className="text-white font-bold text-2xl">
        Mean: {formatter.format(percentiles.mean)}€
      </div>
      <div
        data-testid="p25-salary"
        className="absolute -bottom-3 inset-x-1/2 -translate-x-1/2 w-1/3 bg-blue-100 rounded"
      >
        ⬇️&nbsp;&nbsp;{formatter.format(percentiles.p25)}€
      </div>
    </div>
  );
};

export default SalaryDetails;
