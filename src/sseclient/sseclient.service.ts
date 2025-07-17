import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { EventSource } from 'eventsource';
import { ConfigService } from '@nestjs/config';
import { KafkaService } from '../kafka/kafka.service'
import { WikiPostDto } from '../kafka/models/wikipost'

@Injectable()
export class SseclientService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly kafkaService: KafkaService, private readonly configService: ConfigService, private readonly logger: Logger) { }
  private eventSource: EventSource;

  onModuleInit() {
    this.eventSource = new EventSource(this.configService.get<string>('STREAM_URL') ?? '');

    this.eventSource.onmessage = (event) => {
      const eventPost = JSON.parse(event.data);
      const newPost = new WikiPostDto(eventPost.id, eventPost.title, eventPost.title_url, new Date(eventPost.timestamp), eventPost.source);
      this.kafkaService.putWikiPost(newPost.id, newPost);
    };

    this.eventSource.onerror = (err) => {
      this.logger.error('SSE Error:', err);
    };
  }

  onModuleDestroy() {
    this.eventSource?.close();
    this.logger.log('SSE connection closed');
  }
}
