import {Medication} from './medication.model';

class OrderedId {
  fkOrder: number;
  fkMedication: number;
}

export class Ordered {
  orderedId: OrderedId;
  count: number;
  price: number;
  medication: Medication;
}
