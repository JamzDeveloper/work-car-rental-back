import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum ExtraType {
  ADDITIONAL = 'ADDITIONAL',
  PROMOTION = 'PROMOTION',
}
export type ExtraDocument = HydratedDocument<Extra>;

@Schema()
export class Extra {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(ExtraType),
    default: ExtraType.ADDITIONAL,
  })
  type: ExtraType;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ExtraSchema = SchemaFactory.createForClass(Extra);
