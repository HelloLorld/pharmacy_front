import { Component, OnInit } from '@angular/core';
import {DiseaseService} from '../service/disease.service';
import {Disease} from '../models/disease.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent implements OnInit {
  diseases: Disease[];
  disease: FormGroup;
  changeDisease = false;
  constructor(private diseaseService: DiseaseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.diseaseService.findAll().subscribe(data => {
      this.diseases = data;
    });
    this.disease = this.fb.group({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      symptoms: new FormControl('', Validators.required)
    });
  }

  stylePadding(): string {
    return !this.changeDisease ? 'padding-top: 0px' : 'padding-top: 100px';
  }

  addDisease(): void {
    const newDisease = new Disease();
    newDisease.name = this.disease.get('name').value;
    newDisease.symptoms = this.disease.get('symptoms').value;
    this.diseaseService.save(newDisease).subscribe(result => {
      console.log(result);
    });
  }

  change(): void {
    this.changeDisease = !this.changeDisease;
    this.disease.reset();
  }

  chooseDisease(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.disease = this.fb.group({
        id: new FormControl(this.diseases[index].id),
        name: new FormControl(this.diseases[index].name, Validators.required),
        symptoms: new FormControl(this.diseases[index].symptoms, Validators.required)
      });
      this.disease.markAllAsTouched();
    }
    else {
      this.disease.reset();
    }
  }

  deleteDisease(): void {
    this.diseaseService.delete(this.disease.get('id').value).subscribe(data => console.log(data));
  }

}
