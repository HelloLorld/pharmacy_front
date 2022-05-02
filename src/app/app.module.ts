import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ClientsComponent } from './clients/clients.component';
import { SellersComponent } from './sellers/sellers.component';
import { OrdersComponent } from './orders/orders.component';
import { DiseaseComponent } from './disease/disease.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { MedicationComponent } from './medication/medication.component';
import { StorageComponent } from './storage/storage.component';
import {ClientService} from './service/client.service';
import {DiseaseService} from './service/disease.service';
import {ManufacturerService} from './service/manufacturer.service';
import {MedicationService} from './service/medication.service';
import {OrderService} from './service/order.service';
import {PackagingService} from './service/packaging.service';
import {StorageService} from './service/storage.service';
import {SalerService} from './service/saler.service';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app-rouing.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {PackagingComponent} from './packaging/packaging.component';
import { PhonePipe } from './pipes/phone.pipe';
import {MatGridListModule} from '@angular/material/grid-list';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    SellersComponent,
    OrdersComponent,
    DiseaseComponent,
    ManufacturerComponent,
    MedicationComponent,
    StorageComponent,
    PackagingComponent,
    MainComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    ClientService,
    DiseaseService,
    ManufacturerService,
    MedicationService,
    OrderService,
    PackagingService,
    StorageService,
    SalerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
