import { Component, OnInit } from '@angular/core';
import {PackagingService} from '../service/packaging.service';
import {Packaging} from '../models/packaging.model';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css']
})
export class PackagingComponent implements OnInit {
  packagings: Packaging[];
  constructor(private packagingService: PackagingService) { }

  ngOnInit(): void {
    this.packagingService.findAll().subscribe(data => {
      this.packagings = data;
    });
  }

}
