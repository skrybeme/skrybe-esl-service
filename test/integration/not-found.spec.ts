import { createServer } from '../../src/http/server';
import request from 'supertest';

const app = createServer();

describe(`For any undefined route`, () => {
  it('responds with 404 NOT FOUND', (done) => {
    request(app)
      .post('/undefined')
      .expect(404, done);

    request(app)
      .post('/undefined/route')
      .expect(404, done);
  });
});
