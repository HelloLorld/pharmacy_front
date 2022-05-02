import { Component, OnInit } from '@angular/core';
import {StorageModel} from '../models/storage.model';
import {StorageService} from '../service/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  storages: StorageModel[];
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.findAll().subscribe(data => {
      this.storages = data;
    });
  }

}
