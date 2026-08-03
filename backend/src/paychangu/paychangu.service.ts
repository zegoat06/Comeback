import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Payment, PaymentStatus } from './entities/payment.entity';
import { Application } from '../applications/entities/application.entity';
import { ApplicationStatus } from '../applications/entities/application-status.enum';

import { InitiatePaymentDto, PaymentResponseDto, PaymentStatusDto } from './dtos';

@Injectable()
export class PayChanguService {
  // Use the correct PayChangu API endpoints
  private readonly API_BASE = process.env.PAYCHANGU_API_URL || 'https://api.paychangu.com';
  private readonly API_KEY = process.env.PAYCHANGU_API_KEY || 'test-secret-key';

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly httpService: HttpService,
  ) {}

  async initiatePayment(dto: InitiatePaymentDto): Promise<PaymentResponseDto> {
    const application = await this.applicationRepository.findOne({
      where: { id: dto.applicationId },
      relations: { customer: { user: true } },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== ApplicationStatus.APPROVED) {
      throw new BadRequestException('Application must be approved first');
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        application: { id: dto.applicationId },
        status: PaymentStatus.PENDING,
      },
    });

    if (existingPayment) {
      return {
        reference: existingPayment.reference,
        paymentUrl: existingPayment.paymentUrl,
        status: 'pending',
        message: 'Payment already initiated',
      };
    }

    // Generate a unique reference
    const reference = 'PAY-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    // Create payment record
    const payment = this.paymentRepository.create({
      application,
      reference,
      paymentUrl: `${this.API_BASE}/pay/${reference}`,
      amount: dto.amount,
      currency: 'MWK',
      status: PaymentStatus.PENDING,
      provider: 'PayChangu',
    });

    await this.paymentRepository.save(payment);

    // For demo/testing, return success without calling external API
    // In production, you would call the PayChangu API here
    console.log(`💰 Payment initiated: ${reference} for amount ${dto.amount} MWK`);

    return {
      reference: payment.reference,
      paymentUrl: payment.paymentUrl,
      status: 'pending',
      message: 'Payment initiated successfully. Please complete payment via the provided URL.',
    };
  }

  async verifyPayment(reference: string): Promise<PaymentStatusDto> {
    const payment = await this.paymentRepository.findOne({
      where: { reference },
      relations: { application: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // For demo, check if payment was marked as completed
    return {
      reference: payment.reference,
      status: payment.status,
      amount: payment.amount,
      paidAt: payment.paidAt,
      message: `Payment ${payment.status}`,
    };
  }

  async handleWebhook(payload: any, signature?: string): Promise<{ received: boolean }> {
    const { reference, status } = payload;

    const payment = await this.paymentRepository.findOne({
      where: { reference },
      relations: { application: true },
    });

    if (!payment) {
      console.warn('Payment not found for webhook:', reference);
      return { received: true };
    }

    payment.status = status === 'completed' ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;
    if (status === 'completed') {
      payment.paidAt = new Date();
    }

    await this.paymentRepository.save(payment);

    console.log(`✅ Payment ${status} for application: ${payment.application.id}`);

    return { received: true };
  }

  async getPaymentByApplication(applicationId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { application: { id: applicationId } },
      relations: { application: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found for this application');
    }

    return payment;
  }

  async getPaymentByReference(reference: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { reference },
      relations: { application: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async completePayment(reference: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { reference },
      relations: { application: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = PaymentStatus.COMPLETED;
    payment.paidAt = new Date();

    await this.paymentRepository.save(payment);

    console.log(`✅ Payment completed: ${reference}`);

    return payment;
  }
}
