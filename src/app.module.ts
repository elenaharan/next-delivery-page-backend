import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommsController } from './comms/comms.controller';

@Module({
  imports: [],
  controllers: [AppController, CommsController],
  providers: [AppService],
})
export class AppModule {}

/*/comms/your-next-delivery/1d792ee1-f4eb-4df6-9ba2-828132f1679e*/
