import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Packaging} from '../models/packaging.model';


@Injectable({
  providedIn: 'root'
})
export class PackagingService {
  private url = 'http://localhost:8080/packagings';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Packaging[]> {
    return this.http.get<Packaging[]>(this.url);
  }

  public save(packaging: Packaging): Observable<Packaging> {
    return this.http.post<Packaging>(this.url, packaging);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(packaging: Packaging): Observable<Packaging> {
    return this.http.patch<Packaging>(this.url + '/' + packaging.id, packaging);
  }
}
