import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CamperCreatedEvent } from "./events/create-camper/camper-created.event";
import { CamperDDD } from "./CamperDDD";
import { CamperEntityRepository } from "./camper-entity.repository";
import { Camper } from "./camper.schema";


@Injectable()
export class CamperFactory {

  constructor(
    private readonly camperEntityRepository: CamperEntityRepository
  ) {
  }

  async create(
    name: string,
    age: number,
    allergies: string[]
  ): Promise<CamperDDD> {

    const camper = new CamperDDD(
      new ObjectId().toString(),
      name,
      age,
      allergies.map(allergy => allergy.toLowerCase())
    );

    await this.camperEntityRepository.create(camper);
    camper.apply(new CamperCreatedEvent(camper.getId()));
    return camper;
  }

  createFromSchema(camper: Camper): CamperDDD {
    return new CamperDDD(
      camper._id.toString(),
      camper.name,
      camper.age,
      camper.allergies
    );
  }

}