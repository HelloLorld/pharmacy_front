import { Component, OnInit } from '@angular/core';
import {PackagingService} from '../service/packaging.service';
import {Packaging} from '../models/packaging.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css']
})
export class PackagingComponent implements OnInit {
  packagings: Packaging[];
  packaging: FormGroup;
  changePackaging = false;
  find = '';
  constructor(private packagingService: PackagingService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.packagingService.findAll().subscribe(data => {
      this.packagings = data;
    });
    this.packaging = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required)
    });
  }

  addPackaging(): void {
    const newPackaging = new Packaging();
    newPackaging.name = this.packaging.get('name').value;
    this.packagingService.save(newPackaging).subscribe(result => {
      console.log(result);
    });
  }

  change(): void {
    this.changePackaging = !this.changePackaging;
    this.packaging.reset();
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

  deletePackaging(): void {
    this.packagingService.delete(this.packaging.get('id').value).subscribe(data => console.log(data));
  }

}
