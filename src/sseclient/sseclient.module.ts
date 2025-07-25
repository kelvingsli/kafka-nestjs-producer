import { Module, Logger } from '@nestjs/common';
import { SseclientService } from './sseclient.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  providers: [SseclientService, Logger],
  imports: [KafkaModule],
})
export class SseclientModule {}
