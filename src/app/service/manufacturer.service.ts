import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Manufacturer} from '../models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private url = 'http://localhost:8080/manufacturers';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.url);
  }

  public save(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(this.url, manufacturer);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.patch<Manufacturer>(this.url + '/' + manufacturer.id, manufacturer);
  }
}
