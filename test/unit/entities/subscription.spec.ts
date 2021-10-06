import { InvalidEntity, Subscription } from '../../../src/entities/subscription';
import { datatype } from 'faker';

describe('Subscription', () => {
  describe('creation', () => {
    it('throws when given email address has invalid format', () => {
      expect(() => Subscription.create({ email: 'wrongemail' })).toThrow(InvalidEntity);
      expect(() => Subscription.create({ email: '  wrong   ' })).toThrow(InvalidEntity);
      expect(() => Subscription.create({ email: 'not@ok' })).toThrow(InvalidEntity);
      expect(() => Subscription.create({ email: '@not.ok' })).toThrow(InvalidEntity);
      expect(() => Subscription.create({ email: '!@#$^@not.ok' })).toThrow(InvalidEntity);
      expect(() => Subscription.create({ email: 'not@ok,com' })).toThrow(InvalidEntity);
      expect(() => Subscription.create({ email: ' not@ok.pl ' })).toThrow(InvalidEntity);

      expect(() => Subscription.create({ email: 'valid@email.com' }))
        .not
        .toThrow(InvalidEntity);
    });

    it('gives access to email and id (if such is passed)', () => {
      const subscription = Subscription.create({ email: 'test@email.com' });

      expect(subscription.email).toEqual('test@email.com');
      expect(subscription.id).toBeUndefined();

      const id = datatype.uuid();

      const subscriptionWithId = Subscription.create({ email: 'test@email.com' }, id);

      expect(subscriptionWithId.email).toEqual('test@email.com');
      expect(subscriptionWithId.id).toEqual(id);
    });

    it('creates with random and unique token of 64 characters', () => {
      const subscription1 = Subscription.create({ email: 'test1@email.com' });
      const subscription2 = Subscription.create({ email: 'test2@email.com' });

      expect(subscription1.token).toHaveLength(64);
      expect(subscription2.token).toHaveLength(64);

      expect(subscription1.token).not.toEqual(subscription2.token)
    });

    it('creates with given token', () => {
      const subscription1 = Subscription.create({
        email: 'test@email.com',
        token: 'test-token'
      });

      expect(subscription1.token).toEqual('test-token')
    });
  });
});
