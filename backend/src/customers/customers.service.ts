import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { User } from '../users/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUserId(userId: string) {
    const customer = await this.customerRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!customer) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newCustomer = this.customerRepository.create({
        user,
        nationalId: '',
        dateOfBirth: new Date(),
        address: '',
        occupation: '',
      });

      return this.customerRepository.save(newCustomer);
    }

    return customer;
  }

  async updateByUserId(userId: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findByUserId(userId);

    Object.assign(customer, updateCustomerDto);
    await this.customerRepository.save(customer);

    return customer;
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
