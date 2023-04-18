import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ObjectId } from "mongodb";


export type CamperDocument = HydratedDocument<Camper>;

@Schema({ versionKey: false, collection: "campers" })
export class Camper {

  @Prop()
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  allergies: string[];

}

export const CamperSchema = SchemaFactory.createForClass(Camper);
