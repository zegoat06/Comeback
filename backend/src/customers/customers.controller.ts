import { Controller, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    // The user is attached to req.user by JwtAuthGuard
    const userId = req.user.id || req.user.sub;
    console.log('Getting profile for user:', userId);
    return this.customersService.findOrCreateByUserId(userId);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateCustomerDto: UpdateCustomerDto) {
    const userId = req.user.id || req.user.sub;
    console.log('Updating profile for user:', userId);
    return this.customersService.updateByUserId(userId, updateCustomerDto);
  }
}
