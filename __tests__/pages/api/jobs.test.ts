import { createMocks } from 'node-mocks-http';
import handleJobs from 'pages/api/jobs';

describe("/api/jobs", () => {
  it('serves a list of jobs', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {}
    })

    await handleJobs(req, res);

    expect(res.statusCode).toBe(200)
  })
});
