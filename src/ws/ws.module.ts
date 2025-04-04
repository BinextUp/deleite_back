import { Module } from '@nestjs/common';
import { WsController } from './ws.controller';

@Module({
  controllers: [WsController]
})
export class WsModule {}
