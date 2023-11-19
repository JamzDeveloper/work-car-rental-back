import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FaqDocument = HydratedDocument<Faq>;

@Schema()
export class Faq {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: String, required: true })
  answer: string;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
