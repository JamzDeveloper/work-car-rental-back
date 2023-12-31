import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Number })
  countPerson: number;

  @Prop({ type: String })
  typeChange: string;

  @Prop({ type: String, lowercase: true })
  brand: string;

  @Prop({ type: String, lowercase: true })
  model: string;

  @Prop({ type: String })
  pickupTime: string;

  @Prop({ type: Number })
  minTankQuantity: number;

  @Prop({ type: Number })
  maxTankQuantity: number;

  @Prop({ type: String })
  fullType: string;

  @Prop({ type: String })
  subTitle: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: Boolean, default: false })
  availability: boolean;

  @Prop({ type: Boolean, default: false })
  published: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
