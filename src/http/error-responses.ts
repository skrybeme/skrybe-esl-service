export class ErrorResponse {
  constructor(public type: string = '', public message: string = '') {}

  toJSON() {
    return {
      message: this.message,
      type: this.type
    };
  }
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
  constructor(message: string = '') {
    super('internal_server_error', message);
  }
}

export class InvalidTokenErrorResponse extends ErrorResponse {
  constructor() {
    super('invalid_token');
  }
}
