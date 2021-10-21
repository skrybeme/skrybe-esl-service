import request from 'supertest';
import { internet } from 'faker';
import { createServer } from '../../src/http/server';
import {
  EmailAlreadyTakenErrorResponse,
  InternalServerErrorResponse,
  WrongEmailAddressFormatErrorResponse
} from '../../src/http/error-responses';
import { requestCallbackHandler } from '../helpers';
import {
  SubscriptionMongoDbModel
} from '../../src/infra/database/mongodb/models/subscription-mongodb-model';
import {
  mongoDbSubscriptionDataSource
} from '../../src/infra/database/mongodb/mongodb-subscription-data-source';

const app = createServer();

describe('POST /esl/subscription', () => {
  const email = internet.email();

  afterAll(async () => {
    await SubscriptionMongoDbModel.deleteOne({ email });
  });

  describe('happy path', () => {
    it('responds with status 201 CREATED', (done) => {
      request(app)
        .post('/esl/subscription')
        .set('Content-type', 'text/plain')
        .send(email)
        .expect(201, requestCallbackHandler(done));
    });

    it('persists the subscription in the repository', async () => {
      const record = await mongoDbSubscriptionDataSource.findByEmail(email)

      expect(record?.email).toEqual(email);
    });

    it.todo('sends email notification via email service');
  });

  describe('error path', () => {
    describe('invalid email format', () => {
      it('responds with status 422 UNPROCESSABLE ENTITY and proper error type', (done) => {
        request(app)
          .post('/esl/subscription')
          .set('Content-type', 'text/plain')
          .send('invalidemail.com')
          .expect(422)
          .expect(
            new WrongEmailAddressFormatErrorResponse().toJSON(),
            requestCallbackHandler(done)
          );
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
      it('responds with status 409 CONFLICT', (done) => {
        request(app)
          .post('/esl/subscription')
          .set('Content-type', 'text/plain')
          .send(email)
          .expect(409)
          .expect(
            new EmailAlreadyTakenErrorResponse().toJSON(),
            requestCallbackHandler(done)
          );
      });
    });
  });

  describe('infra failures', () => {
    const unexpectedErrorMessage = `WHY CAN'T YOU CUST BE NORMAL?! *Screams in 2020*`;

    describe('data source error on record fetching', () => {
      it('responds with status 500 INTERNAL_SERVER_ERROR', (done) => {
        const findByEmailMock = jest.spyOn(mongoDbSubscriptionDataSource, 'findByEmail')
          .mockImplementation(() => {
            throw new Error(unexpectedErrorMessage);
          });

        request(app)
          .post('/esl/subscription')
          .set('Content-type', 'text/plain')
          .send(internet.email())
          .expect(500)
          .expect(
            new InternalServerErrorResponse().toJSON(),
            requestCallbackHandler(done)
          );

        findByEmailMock.mockRestore();
      });
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
