import request from 'supertest';

export const requestCallbackHandler
  = (done: jest.DoneCallback) => (err: any, res: request.Response) => {
    if (err) {
      console.log(res.body);

      done(err);
    } else {
      done();
    }
  }
