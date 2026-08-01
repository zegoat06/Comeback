"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const applications_service_1 = require("./applications.service");
describe('ApplicationsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [applications_service_1.ApplicationsService],
        }).compile();
        service = module.get(applications_service_1.ApplicationsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=applications.service.spec.js.map