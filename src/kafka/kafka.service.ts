import { Injectable } from '@nestjs/common';
const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS;

import { WikiPostDto } from './models/wikipost'


@Injectable()
export class KafkaService {
    async getMessage(): Promise<string> {
        const producer = new Kafka().producer({
            'bootstrap.servers': '127.0.0.1:9092',
        });

        await producer.connect();
        console.log("Connected successfully");

        const res: any[] = [];
        for (let i = 0; i < 50; i++) {
            res.push(producer.send({
                topic: 'demo_ts1',
                messages: [
                    { value: `Added value is ${i}`, partition: 0, key: `key_${i}` }
                ]
            }));
        }
        await Promise.all(res);

        await producer.disconnect();
        console.log("Disconnected successfully");
        return 'ok';
    }

    async putWikiPost(key: string, value: WikiPostDto) {
        const producer = new Kafka().producer({
            'bootstrap.servers': '127.0.0.1:9092',
        });

        await producer.connect();
        const valueStr = JSON.stringify(value);
        console.log("Connected successfully");
        console.log(`key is ${key}`);
        console.log(`value is ${valueStr}`);

        const res: any[] = [];
        
        
        res.push(producer.send({
            topic: 'demo_ts1',
            messages: [
                { value: valueStr, partition: 0, key: 'key' }
            ]
        }));
        
        await Promise.all(res);

        await producer.disconnect();
        console.log("Disconnected successfully");
    }
}
