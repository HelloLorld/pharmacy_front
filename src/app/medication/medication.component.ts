import { Component, OnInit } from '@angular/core';
import {MedicationService} from '../service/medication.service';
import {Medication} from '../models/medication.model';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {
  medications: Medication[];
  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.medicationService.findAll().subscribe(data => {
      this.medications = data;
    });
  }

}
