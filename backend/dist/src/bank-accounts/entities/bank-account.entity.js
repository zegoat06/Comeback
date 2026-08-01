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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const account_type_enum_1 = require("../../applications/entities/account-type.enum");
const account_status_enum_1 = require("./account-status.enum");
const application_entity_1 = require("../../applications/entities/application.entity");
let BankAccount = class BankAccount {
};
exports.BankAccount = BankAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BankAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, customer => customer.bankAccounts, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'customer_id',
    }),
    __metadata("design:type", customer_entity_1.Customer)
], BankAccount.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        length: 20,
    }),
    __metadata("design:type", String)
], BankAccount.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: account_type_enum_1.AccountType,
    }),
    __metadata("design:type", String)
], BankAccount.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: account_status_enum_1.AccountStatus,
        default: account_status_enum_1.AccountStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], BankAccount.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => application_entity_1.Application, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'application_id',
    }),
    __metadata("design:type", application_entity_1.Application)
], BankAccount.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BankAccount.prototype, "createdAt", void 0);
exports.BankAccount = BankAccount = __decorate([
    (0, typeorm_1.Entity)('bank_accounts')
], BankAccount);
//# sourceMappingURL=bank-account.entity.js.map