import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../models/client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8080/clients';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  public save(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(client: Client): Observable<Client> {
    return this.http.patch<Client>(this.url + '/' + client.id, client);
  }
}
