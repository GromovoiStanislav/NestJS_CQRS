import { CampersController } from "./campers.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { CamperCommandHandlers } from "./commands";
import { CamperEventHandlers } from "./events";
import { CamperQueryHandlers } from "./queries";
import { Camper, CamperSchema } from "./camper.schema";
import { CamperDtoRepository } from "./camper-dto.repository";
import { CamperSagas } from "./sagas/camper.sagas";
import { CamperRepository } from "./camper.repository";


@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Camper.name, schema: CamperSchema }])
  ],
  controllers: [CampersController],
  providers: [
    CamperRepository,
    CamperDtoRepository,
    ...CamperCommandHandlers,
    ...CamperEventHandlers,
    ...CamperQueryHandlers,
    CamperSagas
  ]
})
export class CampersModule {
}