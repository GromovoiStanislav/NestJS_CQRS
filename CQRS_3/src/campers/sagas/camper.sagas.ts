import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { delay, map, Observable } from "rxjs";
import { UpdateAllergiesEvent } from "../events/update-allergies/update-allergies.event";
import { CamperCreatedEvent } from "../events/create-camper/camper-created.event";

@Injectable()
export class CamperSagas {
  @Saga()
  CamperUpdateAllergies = (events: Observable<any>): Observable<ICommand> => {
    return events.pipe(
      ofType(UpdateAllergiesEvent),
      delay(1000),
      map((event) => {
        console.log("Inside [CamperSagas] UpdateAllergies event.camperId " + event.camperId);
        return null;
      })
    );
  };

  @Saga()
  CamperCreated = (events: Observable<any>): Observable<ICommand> => {
    return events.pipe(
      ofType(CamperCreatedEvent),
      delay(1000),
      map((event) => {
        console.log("Inside [CamperSagas] CamperCreated event.camperId " + event.camperId);
        return null;
      })
    );
  };
}