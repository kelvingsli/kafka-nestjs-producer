import { Inject, Controller, Get } from '@nestjs/common';
import { IKafkaService } from './kafka.interface';

@Controller('kafka')
export class KafkaController {
  constructor(
    @Inject('IKafkaService') private readonly kafkaService: IKafkaService,
  ) {}

  @Get()
  async getKafka() {
    const output = await this.kafkaService.getMessage();
    return output;
  }
}
