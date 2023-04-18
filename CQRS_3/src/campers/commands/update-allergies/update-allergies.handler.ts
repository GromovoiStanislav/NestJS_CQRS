import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateAllergiesCommand } from "./update-allergies.command";
import { UpdateAllergiesEvent } from "../../events/update-allergies/update-allergies.event";
import { CamperEntityRepository } from "../../camper-entity.repository";
import { CamperFactory } from "../../camper.factory";
import { CamperDDD } from "../../CamperDDD";


@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand> {
  constructor(
    private readonly camperRepository: CamperEntityRepository,
    private readonly camperFactory: CamperFactory,
    private readonly eventPublisher: EventPublisher
  ) {
  }

  async execute({ camperId, allergies }: UpdateAllergiesCommand): Promise<CamperDDD> {
    const camper = this.eventPublisher.mergeObjectContext(
      this.camperFactory.createFromSchema(await this.camperRepository.findOneById(camperId))
    );

    camper.updateAllergies(allergies);
    await this.camperRepository.findOneAndReplaceById(camperId, camper);

    camper.apply(new UpdateAllergiesEvent(camperId));
    camper.commit();
    return camper
  }
}