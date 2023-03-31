import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UsersSagas } from './sagas/users.saga';
import { UserController } from './user.controller';
import {User} from "./users.entity";
import {UserCreatedHandler} from "./events/handlers/user-created.handler";
import {GetUsersHandler} from "./queries/handlers/get-userss.handler";

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers =  [GetUsersHandler];
export const EventHandlers = [UserCreatedHandler];
@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers, 
        UsersSagas
    ],
})
export class UsersModule {}
