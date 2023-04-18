import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Camper, CamperDocument } from "./camper.schema";
import { CamperDto } from "./dto/camper.dto";
import { ObjectId } from "mongodb";

@Injectable()
export class CamperDtoRepository {
  constructor(@InjectModel(Camper.name) private camperModel: Model<CamperDocument>) {
  }

  async findOneById(id: string): Promise<CamperDto> {

    //const camper = await this.camperModel.find({ _id: new ObjectId(id) }, {}, { lean: true });
    const camper = await this.camperModel.findById(new ObjectId(id), {}, { lean: true });

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
