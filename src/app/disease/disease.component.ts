import { Component, OnInit } from '@angular/core';
import {DiseaseService} from '../service/disease.service';
import {Disease} from '../models/disease.model';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent implements OnInit {
  diseases: Disease[];
  constructor(private diseaseSerivce: DiseaseService) { }

  ngOnInit(): void {
    this.diseaseSerivce.findAll().subscribe(data => {
      this.diseases = data;
    });
  }

}
