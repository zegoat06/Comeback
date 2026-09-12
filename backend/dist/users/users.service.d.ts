import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: import("./enums/user-role.enum").UserRole;
        createdAt: Date;
        customer: import("../customers/entities/customer.entity").Customer;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: import("./enums/user-role.enum").UserRole;
        createdAt: Date;
        customer: import("../customers/entities/customer.entity").Customer;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
