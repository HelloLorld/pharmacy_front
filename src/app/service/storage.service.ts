import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageModel} from '../models/storage.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private url = 'http://localhost:8080/storages';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<StorageModel[]> {
    return this.http.get<StorageModel[]>(this.url);
  }

  public save(storage: StorageModel): Observable<StorageModel> {
    return this.http.post<StorageModel>(this.url, storage);
  }

  public delete(id: number): Observable<object> {
    return this.http.delete<object>(this.url + '/' + id);
  }

  public change(storage: StorageModel): Observable<StorageModel> {
    return this.http.patch<StorageModel>(this.url + '/' + storage.id, storage);
  }
}
