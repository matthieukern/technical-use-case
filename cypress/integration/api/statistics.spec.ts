import { Job } from "lib/api/jobs";

const SALARIES = new Array(10).fill(0).map((_, index) => 1000 + index * 500);

describe("api/jobs", () => {
  beforeEach(() => {
    cy.task("db:insertRecord", {
      model: "job",
      data: {
        name: "Test job",
      },
    }).then((job: Job) => {
      SALARIES.forEach((salary) =>
        cy.task("db:insertRecord", {
          model: "employee",
          data: {
            jobId: job.id,
            salary,
          },
        })
      );
    });
  });

  it("returns the computed statistics on a particular job", () => {
    cy.request({
      method: "GET",
      url: "/api/jobs",
    }).then((response) => {
      const jobId: number = response.body[0].id;
      cy.request({
        method: "GET",
        url: "/api/statistics",
        qs: {
          jobId,
        },
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.jobId).to.eq(jobId);
        expect(response.body).to.deep.eq({
          jobId,
          sampleSize: 10,
          percentiles: {
            p25: 2000,
            mean: 3000,
            p75: 4500,
          },
        });
      });
    });
  });

  it("doesn't return data from other jobs", () => {
    cy.task("db:insertRecord", {
      model: "job",
      data: {
        name: "Another job",
      },
    }).then((job: Job) => {
      cy.request({
        method: "GET",
        url: "/api/statistics",
        qs: {
          job: job.id,
        },
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  it("returns a 404 when no record is found", () => {
    cy.request({
      method: "GET",
      url: "/api/statistics",
      qs: {
        jobId: -1,
      },
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

export {};
