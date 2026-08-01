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
exports.Application = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const document_entity_1 = require("../../documents/entities/document.entity");
const account_type_enum_1 = require("./account-type.enum");
const application_status_enum_1 = require("./application-status.enum");
let Application = class Application {
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.applications, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], Application.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: account_type_enum_1.AccountType,
    }),
    __metadata("design:type", String)
], Application.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: application_status_enum_1.ApplicationStatus,
        default: application_status_enum_1.ApplicationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
    }),
    __metadata("design:type", String)
], Application.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
        default: null,
    }),
    __metadata("design:type", String)
], Application.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (document) => document.application, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Application.prototype, "documents", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications')
], Application);
//# sourceMappingURL=application.entity.js.map