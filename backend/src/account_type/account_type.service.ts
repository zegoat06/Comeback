import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountType } from './entities/account-type.entity';

import { CreateAccountTypeDto } from './dtos/create-account-type.dto';
import { UpdateAccountTypeDto } from './dtos/update-account-type.dto';

@Injectable()
export class AccountTypesService {

  constructor(
    @InjectRepository(AccountType)
    private readonly repository: Repository<AccountType>,
  ) {}

  create(dto: CreateAccountTypeDto) {
    const account = this.repository.create(dto);
    return this.repository.save(account);
  }

  findAll() {
    return this.repository.find({
      where: {
        active: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string) {

    const account = await this.repository.findOne({
      where: { id },
    });

    if (!account)
      throw new NotFoundException(
        'Account Type not found',
      );

    return account;
  }

  async update(
    id: string,
    dto: UpdateAccountTypeDto,
  ) {

    const account = await this.findOne(id);

    Object.assign(account, dto);

    return this.repository.save(account);
  }

  async remove(id: string) {

    const account = await this.findOne(id);

    await this.repository.remove(account);

    return {
      message: 'Deleted successfully',
    };
  }
}
