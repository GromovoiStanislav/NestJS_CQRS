import { CamperCreatedHandler } from './create-camper/camper-created.handler';
import { UpdateAllergiesHandler } from "./update-allergies/update-allergies.handler";

export const CamperEventHandlers = [
  CamperCreatedHandler,
  UpdateAllergiesHandler
];