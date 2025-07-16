import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { SseclientModule } from './sseclient/sseclient.module';

@Module({
  imports: [KafkaModule, SseclientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
