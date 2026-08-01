import { AccountTypesService } from './account_type.service';
import { CreateAccountTypeDto } from './dtos/create-account-type.dto';
import { UpdateAccountTypeDto } from './dtos/update-account-type.dto';
export declare class AccountTypesController {
    private readonly service;
    constructor(service: AccountTypesService);
    create(dto: CreateAccountTypeDto): Promise<import("./entities/account-type.entity").AccountType>;
    findAll(): Promise<import("./entities/account-type.entity").AccountType[]>;
    findOne(id: string): Promise<import("./entities/account-type.entity").AccountType>;
    update(id: string, dto: UpdateAccountTypeDto): Promise<import("./entities/account-type.entity").AccountType>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
