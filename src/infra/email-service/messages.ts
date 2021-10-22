export const getConfirmationEmailMessageHtml = (unsubscribeUrl: string) => `
<p>Hi!</p>
<p>Thank you for subscribing to Skrybe.co. We are working on user accounts and a bunch of other features to make the app fun and helpful.</p>
<p>We will use this email to notify you when we publish the full version of Skrybe.co.</p>
<p><small><strong>If you want to unsubscribe</strong></small></p>
<p><small>Click <a href="${unsubscribeUrl}">this link</a> if you want to unsubscribe. We will remove your email from our database. Please note, that this operation is irreversible.</small></p>
<p>All best,<br/>Tony</p>
`;

export const getConfirmationEmailMessageText = (unsubscribeUrl: string) => `
Hi!

Thank you for subscribing to Skrybe.co. We are working on user accounts and a bunch of other features to make the app fun and helpful.

We will use this email to notify you when we publish the full version of Skrybe.co.

Click ${unsubscribeUrl} if you want to unsubscribe. We will remove your email from our database. Please note, that this operation is irreversible.

All best,
Tony
`;
