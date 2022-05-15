import { renderHook, waitFor } from "@testing-library/react";
import nock from "nock";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import useSalariesData from "lib/components/hooks/useSalariesData";

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe("JobsStatistics", () => {
  it("renders a heading", async () => {
    nock("http://localhost/")
      .get("/api/statistics?jobId=2")
      .reply(200, {
        jobId: 2,
        sampleSize: 50,
        percentiles: {
          p25: 35000,
          mean: 45000,
          p75: 65000
        }
      });

    const { result } = renderHook(() => useSalariesData({ selectedJobId: 2 }), { wrapper });
    await waitFor(() => {
      expect(!result.current.isLoading && result.current.ready).toBeTruthy();
    });

    expect(result.current).toMatchObject({
      isLoading: false,
      ready: true,
      step: 6000,
      startPercent: 25,
      endPercent: 75,
      maxSalaryDisplay: 80000,
      percentiles: {
        p25: 35000,
        mean: 45000,
        p75: 65000
      }
    })
  });
});
