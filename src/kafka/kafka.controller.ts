import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
    constructor(private readonly kafkaService: KafkaService) {}

    @Get()
    async getKafka() {
        const output = await this.kafkaService.getMessage();
        return output;
    }
}
