import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Application } from '../applications/entities/application.entity';
import { Document } from './entities/document.entity';
import { UploadDocumentDto } from './dtos/upload-document.dto';
import { Customer } from '../customers/entities/customer.entity';

import { SUPABASE_CLIENT } from '../supabase/supabase.constants';

@Injectable()
export class DocumentsService {

  constructor(

    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,

    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    @Inject(SUPABASE_CLIENT)
    private readonly supabase,

  ) {}

  async upload(
    dto: UploadDocumentDto,
    file: any,
  ) {

    if (!file) {
      throw new BadRequestException(
        'No file uploaded',
      );
    }

    const application =
      await this.applicationRepository.findOne({

        where: {
          id: dto.applicationId,
        },

      });

    if (!application) {
      throw new NotFoundException(
        'Application not found',
      );
    }

    const existing =
      await this.documentRepository.findOne({

        where: {
          application: {
            id: application.id,
          },
          documentType: dto.documentType,
        },

      });

    if (existing) {
      throw new BadRequestException(
        'Document already uploaded',
      );
    }

    const extension =
      file.originalname.split('.').pop();

    const fileName =
      `${uuid()}.${extension}`;

    const storagePath =
      `${application.id}/${fileName}`;

    const { error } =
      await this.supabase.storage
        .from('documents')
        .upload(
          storagePath,
          file.buffer,
          {
            contentType: file.mimetype,
          },
        );

    if (error) {
      throw new BadRequestException(
        error.message,
      );
    }

    const document =
      this.documentRepository.create({

        application,

        documentType: dto.documentType,

        fileName,

        filePath: storagePath,

        mimeType: file.mimetype,

        fileSize: file.size,

      });

    return await this.documentRepository.save(
      document,
    );

  }

  async findByApplication(
    applicationId: string,
  ) {

    return await this.documentRepository.find({

      where: {
        application: {
          id: applicationId,
        },
      },

    });

  }

  async findByCustomer(userId: string) {
    const customer = await this.customerRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const applications = await this.applicationRepository.find({
      where: { customer: { id: customer.id } },
    });

    const applicationIds = applications.map(app => app.id);

    if (applicationIds.length === 0) {
      return [];
    }

    return await this.documentRepository.find({
      where: { application: { id: In(applicationIds) } },
      relations: { application: true },
    });
  }
}
