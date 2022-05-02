import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Saler} from '../models/saler.model';


@Injectable({
  providedIn: 'root'
})
export class SalerService {
  private url = 'http://localhost:8080/sellers';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Saler[]> {
    return this.http.get<Saler[]>(this.url);
  }

  public save(saler: Saler): Observable<Saler> {
    return this.http.post<Saler>(this.url, saler);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(saler: Saler): Observable<Saler> {
    return this.http.patch<Saler>(this.url + '/' + saler.id, saler);
  }
}
