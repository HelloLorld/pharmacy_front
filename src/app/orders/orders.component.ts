import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order.model';
import {OrderService} from '../service/order.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  order: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.orderService.findAll().subscribe(data => {
      this.orders = data;
    });
    this.order = this.fb.group({
      client: new FormControl(),
      saler: new FormControl(),
      ordered: new FormControl()
    });
  }

}
