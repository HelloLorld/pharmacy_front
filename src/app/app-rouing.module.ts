import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {ClientsComponent} from './clients/clients.component';
import {ManufacturerComponent} from './manufacturer/manufacturer.component';
import {SellersComponent} from './sellers/sellers.component';
import {DiseaseComponent} from './disease/disease.component';
import {MedicationComponent} from './medication/medication.component';
import {PackagingComponent} from './packaging/packaging.component';
import {OrdersComponent} from './orders/orders.component';
import {StorageComponent} from './storage/storage.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'manufacturers', component: ManufacturerComponent },
  { path: 'sellers', component: SellersComponent },
  { path: 'diseases', component: DiseaseComponent },
  { path: 'medications', component: MedicationComponent },
  { path: 'packagings', component: PackagingComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'storages', component: StorageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
