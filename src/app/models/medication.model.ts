import {Manufacturer} from './manufacturer.model';
import {Disease} from './disease.model';
import {Packaging} from './packaging.model';
import {StorageModel} from './storage.model';

export class Medication {
  id: number;
  name: string;
  salePrice: string;
  purchasePrice: string;
  manufacturer: Manufacturer;
  packaging: Packaging;
  storageLoc: StorageModel;
  diseases: Disease[];
}
