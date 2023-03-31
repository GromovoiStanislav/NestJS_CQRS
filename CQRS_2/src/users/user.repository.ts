import {Repository} from "typeorm";
import {User} from "./users.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {
    }

    create(): User {
        return new User();
    }

    async save(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    async getAll(): Promise<User[]> {
        return this.usersRepository.find({});
    }
}