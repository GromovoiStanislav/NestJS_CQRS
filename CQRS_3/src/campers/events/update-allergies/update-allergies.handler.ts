import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateAllergiesEvent } from "./update-allergies.event";

@EventsHandler(UpdateAllergiesEvent)
export class UpdateAllergiesHandler implements IEventHandler<UpdateAllergiesEvent>{
  async handle({ camperId }: UpdateAllergiesEvent): Promise<void> {
    console.log('Update allergies:', camperId);
  }
}