import {CreateUserCommand} from "../impl/create-user.command";
import {ICommandHandler, CommandHandler, EventBus} from "@nestjs/cqrs";
import {UserRepository} from "src/users/user.repository";
import {v4 as uuidv4} from 'uuid';
import {UserCreatedEvent} from "src/users/events/impl/user-created.event";
import {User} from "src/users/users.entity";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly userRepository: UserRepository,
    ) {
    }

    async execute(command: CreateUserCommand) {
        console.log('Inside [CreateUserCommand]')

        const {username, email, password} = command;

        const user = this.userRepository.create();
        user.userId = await this.convertStringToBinary(uuidv4());
        user.username = username;
        user.email = email;
        user.password = password;

        const userDB: User = await this.userRepository.save(user);
        this.sendEvent(userDB.userId, this.eventBus);
        return userDB;
    }

    private async sendEvent(userId: Buffer, eventBus: EventBus) {
        if (userId !== undefined) {
            console.log("send event UserCreatedEvent");
            eventBus.publish(
                new UserCreatedEvent(Buffer.from(userId).toString('hex'))
            );
        }
    }

    private async convertStringToBinary(uuid: string): Promise<Buffer> {
        const guid = Buffer.alloc(16);
        guid.write(uuid);
        return guid;
    }
}