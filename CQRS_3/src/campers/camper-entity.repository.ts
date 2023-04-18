import { Model, FilterQuery } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Camper, CamperDocument } from "./camper.schema";


@Injectable()
export class CamperEntityRepository {

  constructor(@InjectModel(Camper.name) private camperModel: Model<CamperDocument>) {
  }


  async findOneById(id: string): Promise<Camper> {
    const camper = await this.findOne({ _id: id });
    if (!camper) throw new NotFoundException("Entity was not found.");
    return camper;
  }

  protected async findOne(filterQuery: FilterQuery<Camper>): Promise<Camper> {
    return this.camperModel.findOne(filterQuery, {}, { lean: true });
  }



  async findOneAndReplaceById(id: string, entity): Promise<void> {
    await this.findOneAndReplace({ _id: id }, entity);
  }

  protected async findOneAndReplace(filterQuery: FilterQuery<Camper>, entity: Camper): Promise<void> {
    const updatedDocument = await this.camperModel.findOneAndReplace(filterQuery, entity,
      {
        new: true,
        useFindAndModify: false,
        lean: true
      }
    );

    if (!updatedDocument) {
      throw new NotFoundException("Unable to find the entity to replace.");
    }
  }



  async findAll(): Promise<Camper[]> {
    return this.find({});
  }

  protected async find(filterQuery?: FilterQuery<Camper>): Promise<Camper[]> {
    return this.camperModel.find(filterQuery, {}, { lean: true })
  }



  async create(entity): Promise<void> {
    await new this.camperModel(entity).save();
  }


}
