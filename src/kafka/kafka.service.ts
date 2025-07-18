import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { KafkaJS } from '@confluentinc/kafka-javascript';
import { ConfigService } from '@nestjs/config';
import { IWikiPost } from './models/wikipost.dto.interface';
import { IKafkaService } from './kafka.interface';

@Injectable()
export class KafkaService
  implements OnModuleInit, OnModuleDestroy, IKafkaService
{
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}
  private producer: KafkaJS.Producer;

  async onModuleInit() {
    this.producer = new KafkaJS.Kafka().producer({
      'bootstrap.servers': this.configService.get<string>('KAFKA_BROKER_URL'),
    });
    await this.producer.connect();
    this.logger.log('Connected successfully');
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Disconnected successfully');
  }

  async getMessage(): Promise<string> {
    const res: any[] = [];
    for (let i = 0; i < 50; i++) {
      res.push(
        this.producer.send({
          topic: 'demo_ts1',
          messages: [
            { value: `Added value is ${i}`, partition: 0, key: `key_${i}` },
          ],
        }),
      );
    }
    await Promise.all(res);
    return 'ok';
  }

  async putWikiPost(key: string, value: IWikiPost) {
    const valueStr = JSON.stringify(value);

    this.logger.log(`key is ${key}`);
    this.logger.log(`value is ${valueStr}`);

    const res: any[] = [];

    res.push(
      this.producer.send({
        topic: 'demo_ts1',
        messages: [{ value: valueStr, key: key }],
      }),
    );

    const result = this.producer.send({
      topic: 'demo_ts1',
      messages: [{ value: valueStr, key: key }],
    });

    await result;
  }
}
