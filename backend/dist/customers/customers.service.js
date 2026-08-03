"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CustomersService = class CustomersService {
    constructor(customerRepository, userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }
    async findOrCreateByUserId(userId) {
        console.log('findOrCreateByUserId called with userId:', userId);
        let customer = await this.customerRepository.findOne({
            where: { user: { id: userId } },
            relations: { user: true },
        });
        if (!customer) {
            console.log('Customer not found, creating...');
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                console.log('User not found:', userId);
                throw new common_1.NotFoundException('User not found');
            }
            customer = this.customerRepository.create({
                user,
                nationalId: '',
                dateOfBirth: new Date(),
                address: '',
                occupation: '',
            });
            await this.customerRepository.save(customer);
            console.log('Customer created with ID:', customer.id);
        }
        else {
            console.log('Customer found with ID:', customer.id);
        }
        return customer;
    }
    async updateByUserId(userId, updateCustomerDto) {
        console.log('updateByUserId called with userId:', userId);
        const customer = await this.findOrCreateByUserId(userId);
        if (updateCustomerDto) {
            Object.assign(customer, updateCustomerDto);
            await this.customerRepository.save(customer);
            console.log('Customer updated:', customer.id);
        }
        return customer;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map