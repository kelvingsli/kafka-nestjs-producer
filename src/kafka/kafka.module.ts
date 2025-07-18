import { Module, Logger } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { IKafkaService } from './kafka.interface';

@Module({
  controllers: [KafkaController],
  providers: [
    {
      provide: 'IKafkaService',
      useClass: KafkaService,
    },
    Logger,
  ],
  exports: ['IKafkaService'],
})
export class KafkaModule {}
