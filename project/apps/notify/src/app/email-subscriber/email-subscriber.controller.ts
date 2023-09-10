import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting, UserRole, Subscriber } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'tascforce.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'taskforce.notify',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }


  @RabbitSubscribe({
    exchange: 'taskforce.notify',
    routingKey: RabbitRouting.NewTask,
    queue: 'taskforce.notify',
  })
  public async sendAll(role: UserRole, subscribers: Subscriber[]){
    this.subscriberService.getSubscribers(role);
    this.mailService.sendNotifyAllSubscribers(subscribers);
  }
}