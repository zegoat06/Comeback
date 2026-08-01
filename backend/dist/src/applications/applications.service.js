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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./entities/application.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const application_status_enum_1 = require("./entities/application-status.enum");
let ApplicationsService = class ApplicationsService {
    constructor(applicationRepository, customerRepository) {
        this.applicationRepository = applicationRepository;
        this.customerRepository = customerRepository;
    }
    async create(userId, dto) {
        const customer = await this.customerRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: { user: true },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer profile not found');
        }
        const existingApplication = await this.applicationRepository.findOne({
            where: {
                customer: {
                    id: customer.id,
                },
                status: application_status_enum_1.ApplicationStatus.PENDING,
            },
        });
        if (existingApplication) {
            throw new common_1.ConflictException('You already have a pending application.');
        }
        const application = this.applicationRepository.create({
            customer,
            accountType: dto.accountType,
            status: application_status_enum_1.ApplicationStatus.PENDING,
        });
        return await this.applicationRepository.save(application);
    }
    async findAll() {
        return await this.applicationRepository.find({
            relations: {
                customer: true,
            },
            order: {
                submittedAt: 'DESC',
            },
        });
    }
    async findOne(id) {
        const application = await this.applicationRepository.findOne({
            where: {
                id,
            },
            relations: {
                customer: true,
            },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        return application;
    }
    async findMyApplications(userId) {
        const customer = await this.customerRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: { user: true },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return await this.applicationRepository.find({
            where: {
                customer: {
                    id: customer.id,
                },
            },
            order: {
                submittedAt: 'DESC',
            },
        });
    }
    async approve(id) {
        const application = await this.findOne(id);
        application.status =
            application_status_enum_1.ApplicationStatus.APPROVED;
        application.rejectionReason = null;
        return await this.applicationRepository.save(application);
    }
    async reject(id, dto) {
        const application = await this.findOne(id);
        application.status =
            application_status_enum_1.ApplicationStatus.REJECTED;
        application.rejectionReason = dto.rejectionReason ?? null;
        return await this.applicationRepository.save(application);
    }
    async requestResubmission(id, dto) {
        const application = await this.findOne(id);
        if (application.status ===
            application_status_enum_1.ApplicationStatus.APPROVED) {
            throw new common_1.BadRequestException('Approved applications cannot be resubmitted.');
        }
        application.status =
            application_status_enum_1.ApplicationStatus.RESUBMISSION;
        application.remarks =
            dto.remarks;
        return await this.applicationRepository.save(application);
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map