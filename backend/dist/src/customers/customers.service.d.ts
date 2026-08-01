import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { User } from '../users/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
export declare class CustomersService {
    private readonly customerRepository;
    private readonly userRepository;
    constructor(customerRepository: Repository<Customer>, userRepository: Repository<User>);
    findByUserId(userId: string): Promise<Customer>;
    updateByUserId(userId: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    findOne(id: string): Promise<Customer>;
}
