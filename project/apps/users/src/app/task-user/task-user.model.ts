import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@project/shared/app-types';
import { City } from '@project/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class TaskUserModel extends Document implements User {
    @Prop({
    required: true,
  })
  public firstname: string;

    @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
    unique: true,
  })
  public city: City;

  @Prop({
    required: true,
  })
  public passwordHash: string;
   
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Performer,
  })
  public role: UserRole;
}

export const BlogUserSchema = SchemaFactory.createForClass(TaskUserModel);