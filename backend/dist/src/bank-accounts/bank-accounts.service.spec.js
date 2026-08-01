"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const bank_accounts_service_1 = require("./bank-accounts.service");
describe('BankAccountsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [bank_accounts_service_1.BankAccountsService],
        }).compile();
        service = module.get(bank_accounts_service_1.BankAccountsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=bank-accounts.service.spec.js.map