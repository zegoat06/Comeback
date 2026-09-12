import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

import { Document } from './entities/document.entity';
import { Application } from '../applications/entities/application.entity';
import { Customer } from '../customers/entities/customer.entity';

import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Document,
      Application,
      Customer,
    ]),
    SupabaseModule,
  ],
  controllers: [
    DocumentsController,
  ],
  providers: [
    DocumentsService,
  ],
  exports: [
    DocumentsService,
  ],
})
export class DocumentsModule {}
