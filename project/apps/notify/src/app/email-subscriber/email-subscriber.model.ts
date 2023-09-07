import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber, UserRole } from '@project/shared/app-types';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public firstname: string;

  @Prop()
  public lastname: string;

  @Prop({
    type: String,
    enum: UserRole
  })
  public role: UserRole;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);