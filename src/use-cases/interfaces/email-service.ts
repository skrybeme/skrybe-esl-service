import { Subscription } from '../../entities/subscription';

export interface IEmailService {
  notifyAboutSubscription: (subscription: Subscription) => Promise<any>;
}
