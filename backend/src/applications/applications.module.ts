import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

import { Application } from './entities/application.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Customer,
    ]),
  ],
  controllers: [
    ApplicationsController,
  ],
  providers: [
    ApplicationsService,
  ],
  exports: [
    ApplicationsService,
  ],
})
export class ApplicationsModule {}