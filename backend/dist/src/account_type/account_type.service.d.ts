import { Repository } from 'typeorm';
import { AccountType } from './entities/account-type.entity';
import { CreateAccountTypeDto } from './dtos/create-account-type.dto';
import { UpdateAccountTypeDto } from './dtos/update-account-type.dto';
export declare class AccountTypesService {
    private readonly repository;
    constructor(repository: Repository<AccountType>);
    create(dto: CreateAccountTypeDto): Promise<AccountType>;
    findAll(): Promise<AccountType[]>;
    findOne(id: string): Promise<AccountType>;
    update(id: string, dto: UpdateAccountTypeDto): Promise<AccountType>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
