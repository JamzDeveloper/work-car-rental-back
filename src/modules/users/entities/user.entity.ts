import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({
    type: 'String',
    uppercase: true,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  })
  role: string;

  @Prop({
    type: 'String',
    default: null,
  })
  photo: string;

  @Prop({
    type: 'String',
    default: null,
  })
  recoveryCode: string;

  @Prop({ type: String })
  acceTokenGoogle: string;

  @Prop({ type: String })
  facebookId: string;

  @Prop({ type: 'Date', default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
