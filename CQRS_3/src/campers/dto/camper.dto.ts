import { ObjectId } from 'mongoose';

export class CamperDto {
  readonly _id: string;
  readonly name: string;
  readonly age: number;
  readonly allergies: string[];
  readonly isAllergicToPeanuts: boolean;
}