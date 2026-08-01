"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supabase_service_1 = require("./supabase.service");
describe('SupabaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [supabase_service_1.SupabaseService],
        }).compile();
        service = module.get(supabase_service_1.SupabaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=supabase.service.spec.js.map