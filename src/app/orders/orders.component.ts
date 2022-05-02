import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order.model';
import {OrderService} from '../service/order.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../models/client.model';
import {Saler} from '../models/saler.model';
import {SalerService} from '../service/saler.service';
import {ClientService} from '../service/client.service';
import {Ordered} from '../models/ordered.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  order: FormGroup;
  client: FormGroup;
  saler: FormGroup;
  changeOrder = false;
  clients: Client[];
  sellers: Saler[];
  orderedSet: Set<Ordered>;

  constructor(private orderService: OrderService,
              private salerService: SalerService,
              private clientService: ClientService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.orderedSet = new Set<Ordered>();
    this.orderService.findAll().subscribe(data => {
      this.orders = data;
    });
    this.salerService.findAll().subscribe(data => {
      this.sellers = data;
    });
    this.clientService.findAll().subscribe(data => {
      this.clients = data;
    });
    this.order = this.fb.group({
      client: new FormControl(),
      saler: new FormControl(),
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
    this.orderedSet.forEach(ordered => newOrder.ordered.push(ordered));
    // console.log(newMedication);
    if (!this.changeOrder) { this.orderService.save(newOrder).subscribe(result => {
      console.log(result);
    });
    }
    else { this.orderService.change(newOrder).subscribe(result => {
      console.log(result);
    });
    }
  }

  change(): void {
    this.changeOrder = !this.changeOrder;
    this.order.reset();
    this.client.reset();
    this.saler.reset();
  }


  chooseOrder(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.order = this.fb.group({
        id: new FormControl(this.orders[index].id)
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
      this.order.markAllAsTouched();
      this.client.markAllAsTouched();
      this.saler.markAllAsTouched();
    }
    else {
      this.order.reset();
    }
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
