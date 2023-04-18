import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CampersQuery } from "./campers.query";
import { CamperDto } from "../../dto/camper.dto";
import { CamperDtoRepository } from "../../camper-dto.repository";

@QueryHandler(CampersQuery)
export class CampersHandler implements IQueryHandler<CampersQuery> {
  constructor(private readonly camperRepository: CamperDtoRepository) {
  }

  async execute(): Promise<CamperDto[]> {
    return this.camperRepository.findAll();
  }
}