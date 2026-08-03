import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    getProfile(req: any): Promise<import("./entities/customer.entity").Customer>;
    updateProfile(req: any, updateCustomerDto: UpdateCustomerDto): Promise<import("./entities/customer.entity").Customer>;
}
