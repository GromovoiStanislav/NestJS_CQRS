import { Module } from "@nestjs/common";
import { CampersModule } from "./campers/campers.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ddd'),
    CampersModule,
  ]
})
export class AppModule {
}
