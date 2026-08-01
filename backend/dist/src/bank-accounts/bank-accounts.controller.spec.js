"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const bank_accounts_controller_1 = require("./bank-accounts.controller");
describe('BankAccountsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [bank_accounts_controller_1.BankAccountsController],
        }).compile();
        controller = module.get(bank_accounts_controller_1.BankAccountsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=bank-accounts.controller.spec.js.map