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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const application_entity_1 = require("../applications/entities/application.entity");
const document_entity_1 = require("./entities/document.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const supabase_constants_1 = require("../supabase/supabase.constants");
let DocumentsService = class DocumentsService {
    constructor(documentRepository, applicationRepository, customerRepository, supabase) {
        this.documentRepository = documentRepository;
        this.applicationRepository = applicationRepository;
        this.customerRepository = customerRepository;
        this.supabase = supabase;
    }
    async upload(dto, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const application = await this.applicationRepository.findOne({
            where: {
                id: dto.applicationId,
            },
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        const existing = await this.documentRepository.findOne({
            where: {
                application: {
                    id: application.id,
                },
                documentType: dto.documentType,
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('Document already uploaded');
        }
        const extension = file.originalname.split('.').pop();
        const fileName = `${(0, uuid_1.v4)()}.${extension}`;
        const storagePath = `${application.id}/${fileName}`;
        const { error } = await this.supabase.storage
            .from('documents')
            .upload(storagePath, file.buffer, {
            contentType: file.mimetype,
        });
        if (error) {
            throw new common_1.BadRequestException(error.message);
        }
        const document = this.documentRepository.create({
            application,
            documentType: dto.documentType,
            fileName,
            filePath: storagePath,
            mimeType: file.mimetype,
            fileSize: file.size,
        });
        return await this.documentRepository.save(document);
    }
    async findByApplication(applicationId) {
        return await this.documentRepository.find({
            where: {
                application: {
                    id: applicationId,
                },
            },
        });
    }
    async findByCustomer(userId) {
        const customer = await this.customerRepository.findOne({
            where: { user: { id: userId } },
            relations: { user: true },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const applications = await this.applicationRepository.find({
            where: { customer: { id: customer.id } },
        });
        const applicationIds = applications.map(app => app.id);
        if (applicationIds.length === 0) {
            return [];
        }
        return await this.documentRepository.find({
            where: { application: { id: (0, typeorm_2.In)(applicationIds) } },
            relations: { application: true },
        });
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(1, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(3, (0, common_1.Inject)(supabase_constants_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map