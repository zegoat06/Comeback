"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const customer_entity_1 = require("../customers/entities/customer.entity");
const application_entity_1 = require("../applications/entities/application.entity");
const document_entity_1 = require("../documents/entities/document.entity");
const bank_account_entity_1 = require("../bank-accounts/entities/bank-account.entity");
const account_type_entity_1 = require("../account_type/entities/account-type.entity");
const databaseConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: parseInt(configService.get('DB_PORT') || '5432', 10),
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || '',
    database: configService.get('DB_DATABASE') || 'postgres',
    entities: [
        user_entity_1.User,
        customer_entity_1.Customer,
        application_entity_1.Application,
        document_entity_1.Document,
        bank_account_entity_1.BankAccount,
        account_type_entity_1.AccountType,
    ],
    synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
    ssl: {
        rejectUnauthorized: false,
    },
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map