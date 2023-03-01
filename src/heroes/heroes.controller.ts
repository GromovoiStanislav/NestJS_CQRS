import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { KillDragonCommand } from './commands/impl/kill-dragon.command';
import { KillDragonDto } from './interfaces/kill-dragon-dto.interface';
import { Hero } from './models/hero.model';
import { GetHeroesQuery } from './queries/impl';
import { HeroKilledDragonEvent } from "./events/impl/hero-killed-dragon.event";

@Controller('hero')
export class HeroesGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  // @Post(':id/kill')
  // async killDragon(@Param('id') id: string, @Body() dto: KillDragonDto) {
  //   return this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
  // }

  @Get(':id/kill')
  async killDragon(@Param('id') id: string) {
    return this.commandBus.execute(new KillDragonCommand(id, '20'));
  }

  @Get('event')
  async event(){
    return  this.eventBus.publish(new HeroKilledDragonEvent('1','20'));;
  }

  @Get()
  async findAll(): Promise<Hero[]>{
    return this.queryBus.execute(new GetHeroesQuery());
  }
}
