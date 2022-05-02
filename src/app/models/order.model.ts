import {Client} from './client.model';
import {Saler} from './saler.model';
import {Ordered} from './ordered.model';

export class Order {
  id: number;
  client: Client;
  saler: Saler;
  ordered: Ordered[];
}
