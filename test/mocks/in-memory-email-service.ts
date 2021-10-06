import { IEmailService } from '../../src/use-cases/interfaces/email-service';
import { Subscription } from '../../src/entities/subscription';

export type InMemoryEmailServiceFactory = (props?: IEmailService) => IEmailService;

export const createInMemoryEmailService: InMemoryEmailServiceFactory = (props) => {
  return {
    notifyAboutSubscription: props?.notifyAboutSubscription || (
      (_: Subscription) => Promise.resolve(true)
    )
  }
}
