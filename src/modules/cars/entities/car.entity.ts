import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Number })
  countPerson: number;

  @Prop({ type: String })
  typeChange: string;

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

  @Prop({ type: Number })
  precio: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
