import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { Incident } from './entities/incident.entity';
import { EventsGateway } from './events.gateway';
import { SmartDispatcher } from './smart-dispatcher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  controllers: [IncidentsController],
  providers: [IncidentsService, EventsGateway, SmartDispatcher],
  exports: [EventsGateway, SmartDispatcher],
})
export class IncidentsModule { }
