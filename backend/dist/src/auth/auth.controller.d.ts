import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: import("../users/enums/user-role.enum").UserRole;
        createdAt: Date;
        customer: import("../customers/entities/customer.entity").Customer;
    }>;
    login(req: any, loginDto: LoginDto): Promise<{
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
