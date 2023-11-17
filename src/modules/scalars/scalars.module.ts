import { Module } from '@nestjs/common';
import { DateScalar } from './date.scalar';
import { EmailScalar } from './email.scalar';

@Module({
  providers: [DateScalar, EmailScalar],
})
export class ScalarsModule {}
