import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;

import { WikiPostDto } from './models/wikipost'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {

  constructor(private readonly configService: ConfigService) { }
  private producer;

  async onModuleInit() {
    this.producer = new Kafka().producer({
      'bootstrap.servers': this.configService.get<string>('KAFKA_BROKER_URL'),
    });
    await this.producer.connect();
    console.log("Connected successfully");
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    console.log("Disconnected successfully");
  }


  async getMessage(): Promise<string> {

    const res: any[] = [];
    for (let i = 0; i < 50; i++) {
      res.push(this.producer.send({
        topic: 'demo_ts1',
        messages: [
          { value: `Added value is ${i}`, partition: 0, key: `key_${i}` }
        ]
      }));
    }
    await Promise.all(res);
    return 'ok';
  }

  async putWikiPost(key: string, value: WikiPostDto) {
    const valueStr = JSON.stringify(value);

    console.log(`key is ${key}`);
    console.log(`value is ${valueStr}`);

    const res: any[] = [];

    res.push(this.producer.send({
      topic: 'demo_ts1',
      messages: [
        { value: valueStr, key: key }
      ]
    }));

    const result = this.producer.send({
      topic: 'demo_ts1',
      messages: [
        { value: valueStr, key: key }
      ]
    });

    await result;
  }
}
