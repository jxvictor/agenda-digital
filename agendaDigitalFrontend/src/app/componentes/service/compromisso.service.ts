import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compromisso } from '../model/Compromisso';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  private url: string = 'http://localhost:8080/api/compromisso'

  constructor(
    private http: HttpClient
  ) {}

  obterTodos(): Observable<Compromisso[]>{
    const baseUrl = `${this.url}/obterTodos`
    return this.http.get<Compromisso[]>(baseUrl);
  }

  findCompromissoPage(page: number, size: number, sort: string = ''): Observable<any> {
    const baseUrl = `${this.url}?page=${page}&size=${size}&sort=${sort}`;
    return this.http.get(baseUrl);
  }
}
