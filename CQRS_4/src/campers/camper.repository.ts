import { FilterQuery, Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Camper, CamperDocument } from "./camper.schema";
import { ObjectId } from "mongodb";


@Injectable()
export class CamperRepository {

  constructor(@InjectModel(Camper.name) private camperModel: Model<CamperDocument>) {
  }

  async create(entity:Camper): Promise<Camper> {
    return new this.camperModel(entity).save();
  }

  async findOneById(id: string): Promise<Camper> {
    const camper = await this.camperModel.findById(new ObjectId(id));
    if (!camper) throw new NotFoundException("Entity was not found.");
    return camper;
  }

  async findOneByIdLean(id: string): Promise<Camper> {
    const camper = await this.camperModel.findById(new ObjectId(id),{}, { lean: true });
    if (!camper) throw new NotFoundException("Entity was not found.");
    return camper;
  }


   async findOne(filterQuery: FilterQuery<Camper>): Promise<Camper> {
    const camper = await this.camperModel.findOne(filterQuery, {}, { lean: true });
    if (!camper) throw new NotFoundException("Entity was not found.");
    return camper;
  }



  async findAllLean(): Promise<Camper[]> {
    return this.findLean({});
  }

  protected async findLean(filterQuery?: FilterQuery<Camper>): Promise<Camper[]> {
    return this.camperModel.find(filterQuery, {}, { lean: true })
  }



  async findOneAndUpdateById(id: string, entity): Promise<Camper> {
    return this.findOneAndUpdate({ _id: new ObjectId(id) }, entity);
  }

  protected async findOneAndUpdate(filterQuery: FilterQuery<Camper>, entity: Camper): Promise<Camper> {
    const updatedDocument = await this.camperModel.findOneAndUpdate(filterQuery, entity,
      {
        new: true,
        useFindAndModify: false,
        lean: true
      }
    );

    if (!updatedDocument) {
      throw new NotFoundException("Unable to find the entity to replace.");
    }
    return updatedDocument
  }


  async findOneAndReplaceById(id: string, entity): Promise<Camper> {
    return this.findOneAndReplace({ _id: new ObjectId(id) }, entity);
  }

  protected async findOneAndReplace(filterQuery: FilterQuery<Camper>, entity: Camper): Promise<Camper> {
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
    return updatedDocument
  }



}
