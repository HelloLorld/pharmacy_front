import { Component, OnInit } from '@angular/core';
import {Saler} from '../models/saler.model';
import {SalerService} from '../service/saler.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  sellers: Saler[] = [];
  saler: FormGroup;
  changeSaler = false;
  find = '';
  constructor(private salerService: SalerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.salerService.findAll().subscribe(data => {
      this.sellers = data;
    });
    this.saler = this.fb.group({
      id: new FormControl(),
      fullName: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      startedWork: new FormControl('', Validators.required),
      post: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required)
    });
  }

  stylePadding(): string {
    return !this.changeSaler ? 'padding-top: 0px' : 'padding-top: 100px';
  }

  addSaler(): void {
    const saler = new Saler();
    saler.fullName = this.saler.get('fullName').value;
    saler.post = this.saler.get('post').value;
    saler.birthday = this.saler.get('birthday').value;
    saler.salary = this.saler.get('salary').value;
    saler.startedWork = this.saler.get('startedWork').value;
    console.log(saler);
    this.salerService.save(saler).subscribe(data => console.log(data));
  }

  change(): void {
    this.changeSaler = !this.changeSaler;
    this.saler.reset();
  }

  format(date): string {
    date = new Date(date);

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  chooseSaler(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.saler = this.fb.group({
        id: new FormControl(this.sellers[index].id),
        fullName: new FormControl(this.sellers[index].fullName, Validators.required),
        salary: new FormControl(this.sellers[index].salary, Validators.required),
        startedWork: new FormControl(this.format(this.sellers[index].startedWork), Validators.required),
        post: new FormControl(this.sellers[index].post, Validators.required),
        birthday: new FormControl(this.format(this.sellers[index].birthday), Validators.required)
      });
      this.saler.markAllAsTouched();
    }
    else {
      this.saler.reset();
    }
  }

  deleteSaler(): void {
    this.salerService.delete(this.saler.get('id').value).subscribe(data => console.log(data));
  }
}
