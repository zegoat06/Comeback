import { Controller, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.customersService.findByUserId(req.user.id);
  }

  @Put('profile')
  updateProfile(@Request() req, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.updateByUserId(req.user.id, updateCustomerDto);
  }
}
