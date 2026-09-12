import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { PayChanguController } from './paychangu.controller';
import { PayChanguService } from './paychangu.service';
import { Payment } from './entities/payment.entity';
import { Application } from '../applications/entities/application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Application]),
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PayChanguController],
  providers: [PayChanguService],
  exports: [PayChanguService],
})
export class PayChanguModule {}
