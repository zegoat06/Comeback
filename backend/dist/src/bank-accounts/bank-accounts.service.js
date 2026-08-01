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
exports.BankAccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bank_account_entity_1 = require("./entities/bank-account.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
let BankAccountsService = class BankAccountsService {
    constructor(bankAccountRepository, customerRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.customerRepository = customerRepository;
    }
    async generateAccountNumber() {
        let accountNumber;
        let exists;
        do {
            accountNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
            exists = await this.bankAccountRepository.findOne({
                where: {
                    accountNumber,
                },
            });
        } while (exists);
        return accountNumber;
    }
    async create(createBankAccountDto) {
        const customer = await this.customerRepository.findOne({
            where: {
                id: createBankAccountDto.customerId,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found.');
        }
        const existingAccount = await this.bankAccountRepository.findOne({
            where: {
                customer: {
                    id: customer.id,
                },
                accountType: createBankAccountDto.accountType,
            },
        });
        if (existingAccount) {
            throw new common_1.ConflictException('Customer already has this account type.');
        }
        const accountNumber = await this.generateAccountNumber();
        const account = this.bankAccountRepository.create({
            customer,
            accountType: createBankAccountDto.accountType,
            accountNumber,
        });
        return await this.bankAccountRepository.save(account);
    }
    async findAll() {
        return await this.bankAccountRepository.find({
            relations: {
                customer: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findOne(id) {
        const account = await this.bankAccountRepository.findOne({
            where: {
                id,
            },
            relations: {
                customer: true,
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Bank account not found.');
        }
        return account;
    }
    async findCustomerAccounts(customerId) {
        return await this.bankAccountRepository.find({
            where: {
                customer: {
                    id: customerId,
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findMyAccounts(userId) {
        const customer = await this.customerRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer profile not found.');
        }
        return this.findCustomerAccounts(customer.id);
    }
    async updateStatus(id, dto) {
        const account = await this.findOne(id);
        account.status = dto.status;
        return await this.bankAccountRepository.save(account);
    }
    async closeAccount(id) {
        const account = await this.findOne(id);
        account.status = 'Closed';
        await this.bankAccountRepository.save(account);
        return {
            message: 'Bank account closed successfully.',
        };
    }
    async exists(accountNumber) {
        const account = await this.bankAccountRepository.findOne({
            where: {
                accountNumber,
            },
        });
        return !!account;
    }
};
exports.BankAccountsService = BankAccountsService;
exports.BankAccountsService = BankAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bank_account_entity_1.BankAccount)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BankAccountsService);
//# sourceMappingURL=bank-accounts.service.js.map