import {Manufacturer} from './manufacturer.model';
import {Disease} from './disease.model';
import {Packaging} from './packaging.model';

export class Medication {
  id: number;
  name: string;
  salePrice: string;
  purchasePrice: string;
  manufacturer: Manufacturer;
  packaging: Packaging;
  diseases: Disease[];
}
