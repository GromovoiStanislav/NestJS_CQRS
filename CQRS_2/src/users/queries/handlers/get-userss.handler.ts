import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {UserRepository} from "../../user.repository";
import {GetUsersQuery} from "../impl/get-users.query";


@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(private readonly repository: UserRepository) {
    }

    async execute(query: GetUsersQuery) {
        console.log('Inside [GetUsersQuery]')
        return this.repository.getAll();
    }
}