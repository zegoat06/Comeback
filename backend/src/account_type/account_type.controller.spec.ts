import { Test, TestingModule } from '@nestjs/testing';
import { AccountTypesController } from './account_type.controller';

describe('AccountTypesController', () => {
  let controller: AccountTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTypesController],
    }).compile();

    controller = module.get<AccountTypesController>(AccountTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
