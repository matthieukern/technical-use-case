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
    cy.visit('http://localhost:3001/')

    cy.contains('Please select a job to start')
    cy.contains('Test job').not('.selected').click()
    cy.contains('Please select a job to start').should('not.exist')
    cy.contains('Test job').should('have.class', 'selected')
    cy.get('.salary-graph-item').should('exist')
  });
});

export {};
