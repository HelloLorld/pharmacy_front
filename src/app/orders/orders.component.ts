import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order.model';
import {OrderService} from '../service/order.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../models/client.model';
import {Saler} from '../models/saler.model';
import {SalerService} from '../service/saler.service';
import {ClientService} from '../service/client.service';
import {Medication} from '../models/medication.model';
import {MedicationService} from '../service/medication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  medications: Medication[] = [];
  order: FormGroup;
  client: FormGroup;
  saler: FormGroup;
  changeOrder = false;
  clients: Client[] = [];
  sellers: Saler[] = [];
  orderedSet: Set<Medication>;
  priceOrdered = 0;

  constructor(private orderService: OrderService,
              private salerService: SalerService,
              private clientService: ClientService,
              private medicationService: MedicationService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.orderedSet = new Set<Medication>();
    this.orderService.findAll().subscribe(data => {
      this.orders = data;
      this.orders.sort((a, b) => {
        if (a.id > b.id) { return 1; }
        if (a.id < b.id) { return -1; }
        return 0;
      });
    });
    this.salerService.findAll().subscribe(data => {
      this.sellers = data;
    });
    this.clientService.findAll().subscribe(data => {
      this.clients = data;
    });
    this.medicationService.findAll().subscribe(data => {
      this.medications = data;
    });
    this.order = this.fb.group({
      client: new FormControl(),
      saler: new FormControl(),
      price: new FormControl('', Validators.required),
      ordered: new FormControl()
    });
    this.client = this.fb.group({
      id: new FormControl(),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
    this.saler = this.fb.group({
      id: new FormControl(),
      fullName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      startedWork: new FormControl('', Validators.required),
      post: new FormControl('', Validators.required)
    });
  }

  stylePadding(): string {
    return !this.changeOrder ? 'padding-top:10px' : 'padding-top: 110px';
  }

  addOrder(): void {
    const newOrder = new Order();
    newOrder.id = this.order.get('id')?.value;
    if (!newOrder.id) { newOrder.id = this.orders[this.orders.length - 1].id + 1; }
    const newClient = new Client();
    newClient.id = this.client.get('id').value;
    newClient.fullName = this.client.get('fullName').value;
    newClient.phoneNumber = this.client.get('phoneNumber').value;
    newOrder.client = newClient;

    const newSaler = new Saler();
    newSaler.id = this.saler.get('id').value;
    newSaler.fullName = this.saler.get('fullName').value;
    newSaler.post = this.saler.get('post').value;
    newSaler.birthday = this.saler.get('birthday').value;
    newSaler.startedWork = this.saler.get('startedWork').value;
    newSaler.salary = this.saler.get('salary').value;
    newOrder.saler = newSaler;

    newOrder.ordered = [];
    this.orderedSet.forEach(medication => newOrder.ordered.push({
      count: this.getCountFromInput(medication.name),
      orderedId: {
        fkOrder: newOrder.id,
        fkMedication: medication.id
      },
      price: this.order.get('price')?.value,
      medication
    }));
    console.log(newOrder);
    if (!this.changeOrder) { this.orderService.save(newOrder).subscribe(result => {
      console.log(result);
    });
    }
    else { this.orderService.change(newOrder).subscribe(result => {
      console.log(result);
    });
    }
  }

  getCountFromInput(name: string): number {
    let count = 0;
    const inputs = Array.from(document.getElementsByClassName('counts') as HTMLCollectionOf<HTMLInputElement>);
    inputs.forEach(input => {
      if (input.getAttribute('name').includes(name)) {
        count = Number(input.value);
      }
    });
    return count;
  }

  getIndexMedication(medicationID: number): number {
    for (let i = 0; i < this.medications.length; i++) {
      if (this.medications[i].id === medicationID) { return i; }
    }
  }

  change(): void {
    this.changeOrder = !this.changeOrder;
    this.order.reset();
    this.client.reset();
    this.saler.reset();
    this.orderedSet.clear();
  }


  chooseOrder(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.order = this.fb.group({
        id: new FormControl(this.orders[index].id),
        price: new FormControl(this.orders[index].ordered[0]?.price, Validators.required)
      });
      this.client = this.fb.group({
        id: new FormControl(this.clients[index].id),
        fullName: new FormControl(this.clients[index].fullName, Validators.required),
        phoneNumber: new FormControl(this.clients[index].phoneNumber.slice(1), Validators.required)
      });
      this.saler = this.fb.group({
        id: new FormControl(this.sellers[index].id),
        fullName: new FormControl(this.sellers[index].fullName, Validators.required),
        birthday: new FormControl(this.sellers[index].birthday, Validators.required),
        salary: new FormControl(this.sellers[index].salary, Validators.required),
        startedWork: new FormControl(this.sellers[index].startedWork, Validators.required),
        post: new FormControl(this.sellers[index].post, Validators.required)
      });
      this.orderedSet.clear();
      this.orders[index].ordered.forEach(order => this.orderedSet.add(order.medication));
      this.order.markAllAsTouched();
      this.client.markAllAsTouched();
      this.saler.markAllAsTouched();
    }
    else {
      this.order.reset();
    }
  }

  chooseOrdered(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (this.orderedSet.has(this.medications[index])) { this.orderedSet.delete(this.medications[index]); }
    else { this.orderedSet.add(this.medications[index]); }
  }

  checkOrdered(index: number): boolean {
    let checked = false;
    this.orderedSet.forEach(ordered => {
      if (ordered.id === this.medications[index].id) { checked = true; }
    });
    return checked;
  }

  getCount(index: number): number {
    let count = 0;
    this.orders.forEach(order => {
      if (order.id ===  this.order.get('id')?.value) {
        order.ordered.forEach(ordered => {
          if (ordered.medication.id === this.medications[index].id) { count = ordered.count; }
        });
      }
    });
    return count;
  }

  chooseClient(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.client = this.fb.group({
        id: new FormControl(this.clients[index].id),
        fullName: new FormControl(this.clients[index].fullName, Validators.required),
        phoneNumber: new FormControl(this.clients[index].phoneNumber.slice(1), Validators.required)
      });
      this.client.markAllAsTouched();
    }
    else {
      this.client.reset();
    }
  }

  chooseSaler(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.saler = this.fb.group({
        id: new FormControl(this.sellers[index].id),
        fullName: new FormControl(this.sellers[index].fullName, Validators.required),
        birthday: new FormControl(this.sellers[index].birthday, Validators.required),
        salary: new FormControl(this.sellers[index].salary, Validators.required),
        startedWork: new FormControl(this.sellers[index].startedWork, Validators.required),
        post: new FormControl(this.sellers[index].post, Validators.required)
      });
      this.saler.markAllAsTouched();
    }
    else {
      this.saler.reset();
    }
  }

  deleteOrder(): void {
    this.orderService.delete(this.order.get('id').value).subscribe(data => console.log(data));
  }
}
