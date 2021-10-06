export class ErrorResponse {
  constructor(public type: string = '') {}
}

export class NotFoundErrorResponse extends ErrorResponse {
  constructor() {
    super('not_found');
  }
}

export class EmailAlreadyTakenErrorResponse extends ErrorResponse {
  constructor() {
    super('email_already_taken');
  }
}

export class WrongEmailAddressFormatErrorResponse extends ErrorResponse {
  constructor() {
    super('invalid_email_format');
  }
}

export class ConfirmationEmailSendingFailureErrorResponse extends ErrorResponse {
  constructor() {
    super('confirmation_email_sending_failure');
  }
}

export class InternalServerErrorResponse extends ErrorResponse {
  constructor() {
    super('internal_server_error');
  }
}

export class InvalidTokenErrorResponse extends ErrorResponse {
  constructor() {
    super('invalid_token');
  }
}
