import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { SseclientModule } from './sseclient/sseclient.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [KafkaModule, SseclientModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
