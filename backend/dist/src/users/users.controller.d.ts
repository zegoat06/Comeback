import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRole } from './enums/user-role.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: UserRole;
        createdAt: Date;
        customer: import("../customers/entities/customer.entity").Customer;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: UserRole;
        createdAt: Date;
        customer: import("../customers/entities/customer.entity").Customer;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
