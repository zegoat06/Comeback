import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: any): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        role: import("../../users/enums/user-role.enum").UserRole;
        createdAt: Date;
        customer: import("../../customers/entities/customer.entity").Customer;
    }>;
}
export {};
