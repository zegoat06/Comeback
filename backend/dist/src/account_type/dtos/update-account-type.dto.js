"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_account_type_dto_1 = require("./create-account-type.dto");
class UpdateAccountTypeDto extends (0, mapped_types_1.PartialType)(create_account_type_dto_1.CreateAccountTypeDto) {
}
exports.UpdateAccountTypeDto = UpdateAccountTypeDto;
//# sourceMappingURL=update-account-type.dto.js.map