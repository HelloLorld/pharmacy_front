import { Component, OnInit } from '@angular/core';
import {Manufacturer} from '../models/manufacturer.model';
import {ManufacturerService} from '../service/manufacturer.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  manufacturers: Manufacturer[] = [];
  manufacturer: FormGroup;
  changeManufacturer = false;
  find = '';
  constructor(private manufacturerService: ManufacturerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = data;
    });
    this.manufacturer = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  addManufacturer(): void {
    const newManufacturer = new Manufacturer();
    newManufacturer.name = this.manufacturer.get('name').value;
    newManufacturer.city = this.manufacturer.get('city').value;
    this.manufacturerService.save(newManufacturer).subscribe(result => {
      console.log(result);
    });
  }

  change(): void {
    this.changeManufacturer = !this.changeManufacturer;
    this.manufacturer.reset();
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

  deleteManufacturer(): void {
    this.manufacturerService.delete(this.manufacturer.get('id').value).subscribe(data => console.log(data));
  }

}
