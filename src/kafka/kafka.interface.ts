import { IWikiPost } from './models/wikipost.dto.interface';

export interface IKafkaService {
  putWikiPost(key: string, value: IWikiPost): void;
  getMessage(): Promise<string>;
}
