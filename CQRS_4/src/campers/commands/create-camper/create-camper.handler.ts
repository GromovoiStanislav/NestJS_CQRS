import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateCamperCommand } from "./create-camper.command";
import { ObjectId } from "mongodb";
import { CamperRepository } from "../../camper.repository";
import { Camper } from "../../camper.schema";
import { CamperCreatedEvent } from "../../events/create-camper/camper-created.event";


@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly camperRepository: CamperRepository,
  ) {
  }

  async execute({ createCamperDto }: CreateCamperCommand): Promise<Camper> {
    const { name, age, allergies } = createCamperDto;

    const camper = await this.camperRepository.create({
      _id: new ObjectId(),
      name,
      age,
      allergies: allergies.map(allergy => allergy.toLowerCase())
    });
    this.eventBus.publish(new CamperCreatedEvent(camper.getId()))

    return camper;
  }
}