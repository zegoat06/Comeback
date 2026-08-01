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
exports.AccountType = void 0;
const typeorm_1 = require("typeorm");
const application_entity_1 = require("../../applications/entities/application.entity");
const bank_account_entity_1 = require("../../bank-accounts/entities/bank-account.entity");
let AccountType = class AccountType {
};
exports.AccountType = AccountType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AccountType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        length: 100,
    }),
    __metadata("design:type", String)
], AccountType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], AccountType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], AccountType.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.Application, application => application.accountType),
    __metadata("design:type", Array)
], AccountType.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bank_account_entity_1.BankAccount, account => account.accountType),
    __metadata("design:type", Array)
], AccountType.prototype, "bankAccounts", void 0);
exports.AccountType = AccountType = __decorate([
    (0, typeorm_1.Entity)('account_types')
], AccountType);
//# sourceMappingURL=account-type.entity.js.map