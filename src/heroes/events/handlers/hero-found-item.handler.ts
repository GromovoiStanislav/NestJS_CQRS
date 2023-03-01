import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroFoundItemEvent } from '../impl/hero-found-item.event';
import { HeroRepository } from "../../repository/hero.repository";

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {
  constructor(private repository: HeroRepository) {}
  handle(event: HeroFoundItemEvent) {
    console.log(clc.yellowBright('Async HeroFoundItemEvent...'));
    console.log(clc.yellowBright('event.heroId: '+event.heroId));
    console.log(clc.yellowBright('event.itemId: '+event.itemId));
    // logic
  }
}
