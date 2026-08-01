import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
import { UserRole } from '../users/enums/user-role.enum';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: UserRole;
        createdAt: Date;
        customer: import("../customers/entities/customer.entity").Customer;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        token: string;
        role: any;
        user: {
            id: any;
            fullName: any;
            email: any;
            phoneNumber: any;
            role: any;
        };
    }>;
    resetPassword(email: string): Promise<{
        message: string;
        token: string;
    }>;
}
