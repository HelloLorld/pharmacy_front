import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Disease} from '../models/disease.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private url = 'http://localhost:8080/diseases';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Disease[]> {
    return this.http.get<Disease[]>(this.url);
  }

  public save(disease: Disease): Observable<Disease> {
    return this.http.post<Disease>(this.url, disease);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(disease: Disease): Observable<Disease> {
    return this.http.patch<Disease>(this.url + '/' + disease.id, disease);
  }
}
