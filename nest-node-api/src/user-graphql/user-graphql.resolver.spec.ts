import { Test, TestingModule } from '@nestjs/testing';
import { UserGraphqlResolver } from './user-graphql.resolver';

describe('UserGraphqlResolver', () => {
  let resolver: UserGraphqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGraphqlResolver],
    }).compile();

    resolver = module.get<UserGraphqlResolver>(UserGraphqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
