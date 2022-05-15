import { Job } from "lib/api/jobs";

const SALARIES = new Array(10).fill(0).map((_, index) => 30000 + index * 4000);

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

  it("displays a graph with the salaries data", () => {
    cy.visit("http://localhost:3001/");

    cy.contains("Please select a job to start");
    cy.contains("Test job").not(".selected").click();
    cy.contains("Please select a job to start").should("not.exist");
    cy.contains("Test job").should("have.class", "selected");
    cy.get(".salary-graph-item").should("exist");
  });

  it("displays the p75, mean and p25 data on the graph", () => {
    cy.visit("http://localhost:3001/");
    cy.contains("Test job").click();
    cy.get("[data-testid=p25-salary]").should("contain", "38,000€");
    cy.get("[data-testid=mean-salary]").should("contain", "46,000€");
    cy.get("[data-testid=p75-salary]").should("contain", "58,000€");
  });
});

export {};
