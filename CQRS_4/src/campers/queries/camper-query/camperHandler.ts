import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CamperQuery } from "./camperQuery";
import { CamperDto } from "../../dto/camper.dto";
import { CamperDtoRepository } from "../../camper-dto.repository";

@QueryHandler(CamperQuery)
export class CamperHandler implements IQueryHandler<CamperQuery> {
  constructor(private readonly camperRepository: CamperDtoRepository) {
  }

  async execute({ camperId }: CamperQuery): Promise<CamperDto> {
    return this.camperRepository.findOneById(camperId);
  }
}