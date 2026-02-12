import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger, OnModuleInit } from '@nestjs/common';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  onModuleInit() {
    this.logger.log('EventsGateway initialized on port 3001');
  }

  emitNewIncident(data: any) {
    this.server.emit('new_incident_alert', data);
    this.logger.log('Emitted new_incident_alert: ' + JSON.stringify(data));
  }
}
