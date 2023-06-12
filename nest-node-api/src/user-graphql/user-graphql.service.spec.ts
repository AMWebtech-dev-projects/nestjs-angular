import { Test, TestingModule } from '@nestjs/testing';
import { UserGraphqlService } from './user-graphql.service';

describe('UserGraphqlService', () => {
  let service: UserGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGraphqlService],
    }).compile();

    service = module.get<UserGraphqlService>(UserGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
