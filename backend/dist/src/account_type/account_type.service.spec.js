"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const account_type_service_1 = require("./account_type.service");
describe('AccountTypesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [account_type_service_1.AccountTypesService],
        }).compile();
        service = module.get(account_type_service_1.AccountTypesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=account_type.service.spec.js.map