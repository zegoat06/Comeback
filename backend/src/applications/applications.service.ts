import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from './entities/application.entity';
import { Customer } from '../customers/entities/customer.entity';

import { CreateApplicationDto } from './dtos/create-application.dto';
import { ResubmitApplicationDto } from './dtos/resubmit-application.dto';
import { UpdateApplicationStatusDto } from './dtos/update-application-status.dto';
import { ApplicationStatus } from './entities/application-status.enum';

import { BankAccountsService } from '../bank-accounts/bank-accounts.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @Inject(forwardRef(() => BankAccountsService))
    private readonly bankAccountsService: BankAccountsService,
  ) {}

  async create(userId: string, dto: CreateApplicationDto) {
    const customer = await this.customerRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer profile not found');
    }

    const existingApplication = await this.applicationRepository.findOne({
      where: {
        customer: { id: customer.id },
        status: ApplicationStatus.PENDING,
      },
    });

    if (existingApplication) {
      throw new ConflictException('You already have a pending application.');
    }

    const application = this.applicationRepository.create({
      customer,
      accountType: dto.accountType,
      status: ApplicationStatus.PENDING,
    });

    return await this.applicationRepository.save(application);
  }

  async findAll() {
    return await this.applicationRepository.find({
      relations: { customer: true },
      order: { submittedAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: { customer: true },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async findMyApplications(userId: string) {
    const customer = await this.customerRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return await this.applicationRepository.find({
      where: { customer: { id: customer.id } },
      order: { submittedAt: 'DESC' },
    });
  }

  async approve(id: string) {
    const application = await this.findOne(id);

    if (application.status === ApplicationStatus.APPROVED) {
      throw new BadRequestException('Application is already approved.');
    }

    application.status = ApplicationStatus.APPROVED;
    application.rejectionReason = null;

    const savedApplication = await this.applicationRepository.save(application);

    // Create bank account for the customer
    try {
      await this.bankAccountsService.create({
        customerId: application.customer.id,
        accountType: application.accountType,
      });
      console.log('✅ Bank account created for customer:', application.customer.id);
    } catch (error) {
      console.error('❌ Failed to create bank account:', error.message);
    }

    return savedApplication;
  }

  async reject(id: string, dto: UpdateApplicationStatusDto) {
    const application = await this.findOne(id);

    if (application.status === ApplicationStatus.APPROVED) {
      throw new BadRequestException('Cannot reject an approved application.');
    }

    application.status = ApplicationStatus.REJECTED;
    application.rejectionReason = dto.rejectionReason ?? null;

    return await this.applicationRepository.save(application);
  }

  async requestResubmission(id: string, dto: ResubmitApplicationDto) {
    const application = await this.findOne(id);

    if (application.status === ApplicationStatus.APPROVED) {
      throw new BadRequestException('Approved applications cannot be resubmitted.');
    }

    if (application.status === ApplicationStatus.REJECTED) {
      throw new BadRequestException('Rejected applications cannot be resubmitted.');
    }

    application.status = ApplicationStatus.RESUBMISSION;
    application.remarks = dto.remarks;

    return await this.applicationRepository.save(application);
  }
}
