import request from 'supertest';
import { internet } from 'faker';
import { createServer } from '../../src/http/server';

const app = createServer();

describe('POST subscription', () => {
  const email = internet.email();

  describe('happy path', () => {
    it.todo('responds with status 201 CREATED');

    it.todo('persists the subscription in the repository');

    it.todo('sends email notification via email service');
  });

  describe('error path', () => {
    describe('invalid email format', () => {
      xit('responds with status 422 UNPROCESSABLE ENTITY and proper error type', (done) => {
        request(app)
          .post('/')
          .send(' invalid@email.com ')
          .expect(422, done);
      });
    });

    describe('confirmation email sending failure', () => {
      xit('responds with status 422 UNPROCESSABLE ENTITY and proper error type', (done) => {
        request(app)
          .post('/')
          .send(' invalid@email.com ')
          .expect(422, done);
      });
    });

    describe('email already taken', () => {
      xit('responds with status 409 CONFLICT', (done) => {
        request(app)
          .post('/')
          .send(email)
          .expect(409, done);
      });
    });
  });

  describe('infra failures', () => {
    describe('data source error on record fetching', () => {
      it.todo('rejects with DataSourceFailure error');
    });

    describe('data source error on record persisting', () => {
      it.todo('rejects with DataSourceFailure error');
    });

    describe('email service error on email sending', () => {
      it.todo('rejects with EmailServiceFailure error');

      it.todo('deletes subscription (record) from repository');

      describe('data source error on record deletion', () => {
        it.todo('rejects with EmailServiceAndDataSourceFailure error');
      });
    });
  });
});
