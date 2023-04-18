import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateAllergiesCommand } from "./update-allergies.command";
import { UpdateAllergiesEvent } from "../../events/update-allergies/update-allergies.event";

import { CamperRepository } from "../../camper.repository";
import { BadRequestException } from "@nestjs/common";
import { Camper } from "../../camper.schema";


@CommandHandler(UpdateAllergiesCommand)
export class UpdateAllergiesHandler
  implements ICommandHandler<UpdateAllergiesCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly camperRepository: CamperRepository
  ) {
  }

  async execute({ camperId, allergies }: UpdateAllergiesCommand): Promise<Camper> {

    // const camper = await this.camperRepository.findOneByIdLean(camperId);
    // camper.allergies = this.updateAllergies(allergies);
    // await this.camperRepository.findOneAndReplaceById(camperId, camper);

    const camper = await this.camperRepository.findOneAndUpdateById(camperId, { allergies: this.updateAllergies(allergies) });
    this.eventBus.publish(new UpdateAllergiesEvent(camperId));
    return camper;
  }


  updateAllergies(allergies: string[]): string[] {
    const allergiesLower = allergies.map(allergy =>
      allergy.toLowerCase()
    );
    if (allergiesLower.includes("chocolate")) {
      throw new BadRequestException("Allergy may not be chocolate.");
    }
    return allergiesLower;
  }

}