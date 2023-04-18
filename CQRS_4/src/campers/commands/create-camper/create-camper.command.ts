import { CreateCamperDto } from '../../dto/create-camper.dto';

export class CreateCamperCommand {
  constructor(public readonly createCamperDto: CreateCamperDto) {}
}