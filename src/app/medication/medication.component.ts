import { Component, OnInit } from '@angular/core';
import {MedicationService} from '../service/medication.service';
import {Medication} from '../models/medication.model';
import {StorageModel} from '../models/storage.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ManufacturerService} from '../service/manufacturer.service';
import {PackagingService} from '../service/packaging.service';
import {DiseaseService} from '../service/disease.service';
import {Manufacturer} from '../models/manufacturer.model';
import {Packaging} from '../models/packaging.model';
import {StorageService} from '../service/storage.service';
import {Disease} from '../models/disease.model';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {
  medications: Medication[];
  manufacturers: Manufacturer[];
  packagings: Packaging[];
  storages: StorageModel[];
  diseases: Disease[];
  medication: FormGroup;
  storageLoc: FormGroup;
  packaging: FormGroup;
  manufacturer: FormGroup;
  diseasesSet: Set<Disease>;
  changeMedication = false;
  constructor(private medicationService: MedicationService,
              private manufacturerService: ManufacturerService,
              private packagingService: PackagingService,
              private diseaseService: DiseaseService,
              private storageService: StorageService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.diseasesSet = new Set<Disease>();
    this.medicationService.findAll().subscribe(data => {
      this.medications = data;
    });
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = data;
    });
    this.packagingService.findAll().subscribe(data => {
      this.packagings = data;
    });
    this.storageService.findAll().subscribe(data => {
      this.storages = data;
    });
    this.diseaseService.findAll().subscribe(data => {
      this.diseases = data;
    });
    this.medication = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      salePrice: new FormControl('', Validators.required),
    });
    this.storageLoc = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required)
    });
    this.packaging = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required)
    });
    this.manufacturer = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  addMedication(): void {
    const newMedication = new Medication();
    newMedication.id = this.medication.get('id').value;
    newMedication.name = this.medication.get('name').value;
    newMedication.purchasePrice = this.medication.get('purchasePrice').value;
    newMedication.salePrice = this.medication.get('salePrice').value;

    const newManufacturer = new Manufacturer();
    newManufacturer.id = this.manufacturer.get('id').value;
    newManufacturer.name = this.manufacturer.get('name').value;
    newManufacturer.city = this.manufacturer.get('city').value;
    newMedication.manufacturer = newManufacturer;

    const newPackaging = new Packaging();
    newPackaging.id = this.packaging.get('id').value;
    newPackaging.name = this.packaging.get('name').value;
    newMedication.packaging = newPackaging;

    const newStorage = new StorageModel();
    newStorage.id = this.storageLoc.get('id').value;
    newStorage.name = this.storageLoc.get('id').value;
    newMedication.storageLoc = newStorage;
    newMedication.diseases = [];
    this.diseasesSet.forEach(disease => newMedication.diseases.push(disease));
    // console.log(newMedication);
    if (!this.changeMedication) { this.medicationService.save(newMedication).subscribe(result => {
      console.log(result);
    });
    }
    else { this.medicationService.change(newMedication).subscribe(result => {
      console.log(result);
    });
    }
  }

  change(): void {
    this.changeMedication = !this.changeMedication;
    this.medication.reset();
    this.storageLoc.reset();
    this.packaging.reset();
    this.manufacturer.reset();
  }

  chooseMedication(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.medication = this.fb.group({
        id: new FormControl(this.medications[index].id),
        name: new FormControl(this.medications[index].name, Validators.required),
        purchasePrice: new FormControl(this.medications[index].purchasePrice, Validators.required),
        salePrice: new FormControl(this.medications[index].salePrice, Validators.required),
      });
      this.storageLoc = this.fb.group({
        id: new FormControl(this.medications[index].storageLoc.id),
        name: new FormControl(this.medications[index].storageLoc.name, Validators.required)
      });
      this.packaging = this.fb.group({
        id: new FormControl(this.medications[index].packaging.id),
        name: new FormControl(this.medications[index].packaging.name, Validators.required)
      });
      this.manufacturer = this.fb.group({
        id: new FormControl(this.medications[index].manufacturer.id),
        name: new FormControl(this.medications[index].manufacturer.name, Validators.required),
        city: new FormControl(this.medications[index].manufacturer.city, Validators.required),
      });
      this.diseasesSet.clear();
      this.medications[index].diseases.forEach(disease => this.diseasesSet.add(disease));
      this.medication.markAllAsTouched();
      this.packaging.markAllAsTouched();
      this.manufacturer.markAllAsTouched();
      this.storageLoc.markAllAsTouched();
    }
    else {
      this.medication.reset();
    }
  }

  choosePackaging(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.packaging = this.fb.group({
        id: new FormControl(this.packagings[index].id),
        name: new FormControl(this.packagings[index].name, Validators.required)
      });
      this.packaging.markAllAsTouched();
    }
    else {
      this.packaging.reset();
    }
  }

  stylePadding(): string {
    return !this.changeMedication ? 'padding-top: 300px' : 'padding-top: 420px';
  }

  chooseDisease(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (this.diseasesSet.has(this.diseases[index])) { this.diseasesSet.delete(this.diseases[index]); }
    else { this.diseasesSet.add(this.diseases[index]); }
  }

  checkDisease(index: number): boolean {
    let checked = false;
    this.diseasesSet.forEach(disease => {
      if (disease.id === this.diseases[index].id) { checked = true; }
    });
    return checked;
  }

  chooseManufacturer(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.manufacturer = this.fb.group({
        id: new FormControl(this.manufacturers[index].id),
        name: new FormControl(this.manufacturers[index].name, Validators.required),
        city: new FormControl(this.manufacturers[index].city, Validators.required)
      });
      this.manufacturer.markAllAsTouched();
    }
    else {
      this.manufacturer.reset();
    }
  }

  chooseStorage(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.storageLoc = this.fb.group({
        id: new FormControl(this.storages[index].id),
        name: new FormControl(this.storages[index].name, Validators.required)
      });
      this.storageLoc.markAllAsTouched();
    }
    else {
      this.storageLoc.reset();
    }
  }

  deleteMedication(): void {
    this.medicationService.delete(this.medication.get('id').value).subscribe(data => console.log(data));
  }
}
