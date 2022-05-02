import { Component, OnInit } from '@angular/core';
import {Manufacturer} from '../models/manufacturer.model';
import {ManufacturerService} from '../service/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  manufacturers: Manufacturer[] = [];
  constructor(private manufacturerService: ManufacturerService) { }

  ngOnInit(): void {
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = data;
    });
  }

}
