import { Test, TestingModule } from '@nestjs/testing';
import { SocketChatGateway } from './socket-chat.gateway';

describe('SocketChatGateway', () => {
  let gateway: SocketChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketChatGateway],
    }).compile();

    gateway = module.get<SocketChatGateway>(SocketChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
