import { IEmailService } from '../../../use-cases/interfaces/email-service';
import { Subscription } from '../../../entities/subscription';
import sendgrid from '@sendgrid/mail';
import { config } from '../../../config/config';
import { getConfirmationEmailMessageHtml, getConfirmationEmailMessageText } from '../messages';

sendgrid.setApiKey(config.sendgrid.apiKey as string);

class SendgridEmailService implements IEmailService {
  // @TODO This link should be stored along with other user data in the database in case the url will change in the future.
  private _createUnsubscribeLink(subscription: Subscription): string {
    return `https://skrybe.co/esl/unsubscribe/${subscription.token}`;
  }

  // @TODO Use Sendgrid templates instead of hardcoded html.
  private _createMessage(subscription: Subscription): sendgrid.MailDataRequired {
    const unsubscribeLink = this._createUnsubscribeLink(subscription);

    return {
      from: config.sendgrid.messageFrom as string,
      html: getConfirmationEmailMessageHtml(unsubscribeLink),
      subject: 'Thank you for subscribing to Skrybe.co!',
      text: getConfirmationEmailMessageText(unsubscribeLink),
      to: subscription.email
    };
  }

  async notifyAboutSubscription(subscription: Subscription): Promise<any> {
    const message = this._createMessage(subscription);

    try {
      await sendgrid.send(message);

      return true;
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        console.error(error.response.body)
      }

      return false;
    }
  }
}

export const sendgridEmailService = new SendgridEmailService();
