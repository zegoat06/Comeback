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
exports.AccountTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_type_entity_1 = require("./entities/account-type.entity");
let AccountTypesService = class AccountTypesService {
    constructor(repository) {
        this.repository = repository;
    }
    create(dto) {
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
    async findOne(id) {
        const account = await this.repository.findOne({
            where: { id },
        });
        if (!account)
            throw new common_1.NotFoundException('Account Type not found');
        return account;
    }
    async update(id, dto) {
        const account = await this.findOne(id);
        Object.assign(account, dto);
        return this.repository.save(account);
    }
    async remove(id) {
        const account = await this.findOne(id);
        await this.repository.remove(account);
        return {
            message: 'Deleted successfully',
        };
    }
};
exports.AccountTypesService = AccountTypesService;
exports.AccountTypesService = AccountTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_type_entity_1.AccountType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountTypesService);
//# sourceMappingURL=account_type.service.js.map