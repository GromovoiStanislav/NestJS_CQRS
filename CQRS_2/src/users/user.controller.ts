import {Post, Controller, Body, Get} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {CreateUserCommand} from './commands/impl/create-user.command';
import {SignUp} from "./dto/input-SignUp.dto";
import {GetUsersQuery} from "./queries/impl/get-users.query";


@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    @Get()
    public async findAll() {
        try {
            console.log("send query GetUsersQuery");
            return this.queryBus.execute(new GetUsersQuery());
        } catch (errors) {
            console.log("Caught promise rejection (validation failed). Errors: ", errors);
        }
    }


    @Post()
    public async signup(@Body('input') input: SignUp) {

        try {
            console.log("send command CreateUserCommand");
            return await this.commandBus.execute(
                new CreateUserCommand(input.username, input.email, input.password)
            );
        } catch (errors) {
            console.log("Caught promise rejection (validation failed). Errors: ", errors);
        }
    }

}