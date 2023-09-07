import { Subscriber } from '@project/shared/app-types';
import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_TASK } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { notifyConfig } from '@project/config/config-notify';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    
        @Inject(notifyConfig.KEY)
        private readonly serviceConfig: ConfigType<typeof notifyConfig>,
      ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }

public async sendNotifyAllSubscribers(subscribers: Subscriber[]) {
  for (const subscriber of subscribers) {
  await this.mailerService.sendMail({
    to: subscriber.email,
    subject: EMAIL_NEW_TASK,
    template: './new-task',
    context: {
      user: `${subscriber.firstname} ${subscriber.lastname}`,
    }
  })
}
}
}
