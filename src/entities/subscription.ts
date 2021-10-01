export class Subscription {
  private constructor(private _props: SubscriptionProps, private _id?: string) {}

  static create(props: SubscriptionProps, id?: string): Subscription {
    if (!isValidEmail(props.email)) {
      throw new InvalidEntity();
    }

    return new Subscription(props, id);
  }

  get email() {
    return this._props.email;
  }

  get id() {
    return this._id;
  }
}

export interface SubscriptionProps {
  email: string;
}

export class InvalidEntity extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, InvalidEntity.prototype);
  }
}

function isValidEmail(email: string): boolean {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
