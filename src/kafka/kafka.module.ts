import { Module, Logger } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';

@Module({
  controllers: [KafkaController],
  providers: [KafkaService, Logger],
  exports: [KafkaService]
})
export class KafkaModule {}
