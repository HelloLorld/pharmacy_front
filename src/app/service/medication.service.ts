import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Medication} from '../models/medication.model';


@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private url = 'http://localhost:8080/medications';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Medication[]> {
    return this.http.get<Medication[]>(this.url);
  }

  public save(medication: Medication): Observable<Medication> {
    return this.http.post<Medication>(this.url, medication);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(medication: Medication): Observable<Medication> {
    return this.http.put<Medication>(this.url + '/' + medication.id, medication);
  }
}
