import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:8080/orders';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  public save(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(order: Order): Observable<Order> {
    return this.http.patch<Order>(this.url + '/' + order.id, order);
  }
}
