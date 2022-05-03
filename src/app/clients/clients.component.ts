import { Component, OnInit } from '@angular/core';
import {ClientService} from '../service/client.service';
import {Client} from '../models/client.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  client: FormGroup;
  changeClient = false;
  find = '';
  constructor(private clientService: ClientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientService.findAll().subscribe(data => {
      this.clients = data;
    });
    this.client = this.fb.group({
      id: new FormControl(),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.pattern('[0-9]{10}'), Validators.required])
    });
  }

  stylePadding(): string {
    return !this.changeClient ? 'padding-top: 0px' : 'padding-top:100px';
  }

  addClient(): void {
    const newClient = new Client();
    newClient.fullName = this.client.get('fullName').value;
    newClient.phoneNumber = '7' + this.client.get('phoneNumber').value;
    this.clientService.save(newClient).subscribe(result => {
      console.log(result);
    });
  }

  change(): void {
    this.changeClient = !this.changeClient;
    this.client.reset();
  }

  chooseClient(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.client = this.fb.group({
        id: new FormControl(this.clients[index].id),
        fullName: new FormControl(this.clients[index].fullName, Validators.required),
        phoneNumber: new FormControl(this.clients[index].phoneNumber.slice(1), [Validators.pattern('[0-9]{10}'), Validators.required])
      });
      this.client.markAllAsTouched();
    }
    else {
      this.client.reset();
    }
  }

  deleteClient(): void {
    this.clientService.delete(this.client.get('id').value).subscribe(data => console.log(data));
  }

}
