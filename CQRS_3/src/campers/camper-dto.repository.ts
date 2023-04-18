import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Camper } from "./camper.schema";
import { CamperDto } from "./dto/camper.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class CamperRepository {
  constructor(@InjectModel(Camper.name) private camperModel: Model<Camper>) {
  }

  async findOneById(id: string): Promise<CamperDto> {

    const camper = await this.camperModel.findOne({ _id: new ObjectId(id) }, {}, { lean: true });

    if (!camper) throw new NotFoundException("Entity was not found.");

    const _id = camper._id.toString();
    const allergiesLower = camper.allergies.map(allergy => allergy.toLocaleLowerCase());
    const isAllergicToPeanuts = allergiesLower.includes("peanuts");

    return {
      ...camper,
      _id,
      isAllergicToPeanuts
    };

  }

  async findAll(): Promise<CamperDto[]> {

    const campers = await this.camperModel.find({}, {}, { lean: true });

    return campers.map(camper => {

      const _id = camper._id.toString();
      const allergiesLower = camper.allergies.map(allergy => allergy.toLocaleLowerCase());
      const isAllergicToPeanuts = allergiesLower.includes("peanuts");

      return {
        ...camper,
        _id,
        isAllergicToPeanuts
      };

    });

  }





}
