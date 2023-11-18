import { IsEnum, IsOptional } from 'class-validator';
import { ExtraType } from '../entities/extra.entity';

export class FilterExtraInput {
  @IsOptional()
  @IsEnum(ExtraType, {
    message: `Invalid extra type. Options are ${Object.values(ExtraType).join(
      ', ',
    )}`,
  })
  type?: ExtraType | string;
}
