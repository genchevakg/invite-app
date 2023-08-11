import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Counterparty } from '../models/counterparty.model';

@Injectable({
  providedIn: 'root'
})
export class CounterpartiesService {

  constructor(private http: HttpClient) { }

  getCounterparties(): Observable<Counterparty[]> {
    return this.http.get<Counterparty[]>('assets/data.json');
  }
}
