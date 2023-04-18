import { CampersController } from "./campers.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { CamperCommandHandlers } from "./commands";
import { CamperEventHandlers } from "./events";
import { CamperQueryHandlers } from "./queries";
import { Camper, CamperSchema } from "./camper.schema";
import { CamperDtoRepository } from "./camper-dto.repository";
import { CamperFactory } from "./camper.factory";
import { CamperEntityRepository } from "./camper-entity.repository";
import { CamperSagas } from "./sagas/camper.sagas";


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Camper.name, schema: CamperSchema }])
  ],
  controllers: [CampersController],
  providers: [
    CamperFactory,
    CamperDtoRepository,
    CamperEntityRepository,
    ...CamperCommandHandlers,
    ...CamperEventHandlers,
    ...CamperQueryHandlers,
    CamperSagas
  ]
})
export class CampersModule {
}