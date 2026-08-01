"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supabase_controller_1 = require("./supabase.controller");
describe('SupabaseController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [supabase_controller_1.SupabaseController],
        }).compile();
        controller = module.get(supabase_controller_1.SupabaseController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=supabase.controller.spec.js.map