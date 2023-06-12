import { SubscribeMessage, WebSocketGateway, OnGatewayInit, } from '@nestjs/websockets';
import { WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200'] } })

export class SocketChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor() { }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('SocketJoinEvent')
  public async joinEvent(client: Socket, message: object) {
    this.sendMsgToClient(message)
  }

  sendMsgToClient(msg: object) {
    this.server.emit('SocketDemoEvent', msg);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
    this.sendMsgToClient(null)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }


}