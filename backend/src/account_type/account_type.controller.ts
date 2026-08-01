import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AccountTypesService } from './account_type.service';

import { CreateAccountTypeDto } from './dtos/create-account-type.dto';
import { UpdateAccountTypeDto } from './dtos/update-account-type.dto';

@Controller('account-types')
export class AccountTypesController {

  constructor(
    private readonly service: AccountTypesService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateAccountTypeDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAccountTypeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }
}
