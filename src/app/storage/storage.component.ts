import { Component, OnInit } from '@angular/core';
import {StorageModel} from '../models/storage.model';
import {StorageService} from '../service/storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  storages: StorageModel[];
  storageMed: FormGroup;
  changeStorage = false;
  constructor(private storageService: StorageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.storageService.findAll().subscribe(data => {
      this.storages = data;
    });
    this.storageMed = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required)
    });
  }

  addStorage(): void {
    const newStorage = new StorageModel();
    newStorage.name = this.storageMed.get('name').value;
    this.storageService.save(newStorage).subscribe(result => {
      console.log(result);
    });
  }

  change(): void {
    this.changeStorage = !this.changeStorage;
    this.storageMed.reset();
  }

  chooseStorage(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.storageMed = this.fb.group({
        id: new FormControl(this.storages[index].id),
        name: new FormControl(this.storages[index].name, Validators.required)
      });
      this.storageMed.markAllAsTouched();
    }
    else {
      this.storageMed.reset();
    }
  }

  deleteStorage(): void {
    this.storageService.delete(this.storageMed.get('id').value).subscribe(data => console.log(data));
  }
}
