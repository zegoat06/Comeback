"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const account_type_controller_1 = require("./account_type.controller");
describe('AccountTypesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [account_type_controller_1.AccountTypesController],
        }).compile();
        controller = module.get(account_type_controller_1.AccountTypesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=account_type.controller.spec.js.map