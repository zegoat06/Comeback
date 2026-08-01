"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const applications_controller_1 = require("./applications.controller");
describe('ApplicationsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [applications_controller_1.ApplicationsController],
        }).compile();
        controller = module.get(applications_controller_1.ApplicationsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=applications.controller.spec.js.map