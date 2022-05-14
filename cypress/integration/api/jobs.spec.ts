const JOBS = [
  "Back-end Developer",
  "Front-end Developer",
  "Full-stack Developer",
  "DevOps",
];

describe("api/jobs", () => {
  beforeEach(() => {
    cy.task("db:truncate");
    JOBS.forEach((name) =>
      cy.task("db:insertRecord", {
        model: "job",
        data: {
          name,
        },
      })
    );
  });

  it("returns the list of all available jobs", () => {
    cy.request({
      method: "GET",
      url: "/api/jobs",
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.eq(4);
      expect(response.body.map((job) => job.name)).to.deep.eq(JOBS);
    });
  });
});

export {};
