import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCamperDto } from "./dto/create-camper.dto";
import { UpdateCamperAllergiesDto } from "./dto/update-camper-allergies-request.dto";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCamperCommand } from "./commands/create-camper/create-camper.command";
import { UpdateAllergiesCommand } from "./commands/update-allergies/update-allergies.command";
import { CamperDto } from "./dto/camper.dto";
import { CampersQuery } from "./queries/campers-query/campers.query";
import { CamperQuery } from "./queries/camper-query/camperQuery";
import { Camper } from "./camper.schema";

@Controller("campers")
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Get(":id")
  async getCamper(@Param("id") camperId: string): Promise<CamperDto> {
    return this.queryBus.execute<CamperQuery, CamperDto>(new CamperQuery(camperId));
  }

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<CampersQuery, CamperDto[]>(new CampersQuery());
  }

  @Post()
  async createCamper(
    @Body() createCamperDto: CreateCamperDto
  ): Promise<CamperDto> {
    const camper = await this.commandBus.execute<CreateCamperCommand, Camper>(
      new CreateCamperCommand(createCamperDto)
    );
    return this.getCamper(camper.getId());
  }

  @Patch(":id/allergies")
  async updateCamperAllergies(
    @Param("id") camperId: string,
    @Body() updateCamperAllergiesDto: UpdateCamperAllergiesDto
  ): Promise<CamperDto> {
    await this.commandBus.execute<UpdateAllergiesCommand, Camper>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesDto.allergies
      )
    );
    return this.getCamper(camperId);
  }
}
