"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const documents_controller_1 = require("./documents.controller");
const documents_service_1 = require("./documents.service");
const document_entity_1 = require("./entities/document.entity");
const application_entity_1 = require("../applications/entities/application.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const supabase_module_1 = require("../supabase/supabase.module");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                document_entity_1.Document,
                application_entity_1.Application,
                customer_entity_1.Customer,
            ]),
            supabase_module_1.SupabaseModule,
        ],
        controllers: [
            documents_controller_1.DocumentsController,
        ],
        providers: [
            documents_service_1.DocumentsService,
        ],
        exports: [
            documents_service_1.DocumentsService,
        ],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map