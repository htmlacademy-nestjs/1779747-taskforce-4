import { Entity } from '@project/util/util-types';
import { Subscriber, UserRole } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public userId: string;
  public role: UserRole;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.lastname = entity.lastname;
    this.firstname = entity.firstname;
    this.id = entity.id;
    this.role = entity.role;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}