import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalService } from 'src/core/global.service';
import { UsersController } from './users.controller';
import { HealthSchema } from './users.model';
import { UsersSchema } from './users.model';
import { SkillsSchema } from './skills.model';
import { UsersService } from './users.service';
import { TechStackSchema } from './techStack.model';
import { SocketChatGateway } from 'src/chat/socket-chat/socket-chat.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GlobalService],
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Health', schema: HealthSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'Skills', schema: SkillsSchema },
      { name: 'TechStack', schema: TechStackSchema }
    ])],
})
export class UsersModule { }
