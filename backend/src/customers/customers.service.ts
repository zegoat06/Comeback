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

  async findOrCreateByUserId(userId: string) {
    console.log('findOrCreateByUserId called with userId:', userId);
    
    // First check if customer exists
    let customer = await this.customerRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!customer) {
      console.log('Customer not found, creating...');
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        console.log('User not found:', userId);
        throw new NotFoundException('User not found');
      }

      // Create new customer
      customer = this.customerRepository.create({
        user,
        nationalId: '',
        dateOfBirth: new Date(),
        address: '',
        occupation: '',
      });

      await this.customerRepository.save(customer);
      console.log('Customer created with ID:', customer.id);
    } else {
      console.log('Customer found with ID:', customer.id);
    }

    return customer;
  }

  async updateByUserId(userId: string, updateCustomerDto: UpdateCustomerDto) {
    console.log('updateByUserId called with userId:', userId);
    const customer = await this.findOrCreateByUserId(userId);

    if (updateCustomerDto) {
      Object.assign(customer, updateCustomerDto);
      await this.customerRepository.save(customer);
      console.log('Customer updated:', customer.id);
    }

    return customer;
  }
}
