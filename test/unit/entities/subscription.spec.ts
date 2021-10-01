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
  });
});
