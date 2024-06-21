import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compromisso } from '../model/Compromisso';
import { StorageService } from './storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  private url: string = 'http://localhost:8080/api/compromisso'

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private _snack: MatSnackBar
  ) {}

  obterTodos(): Observable<Compromisso[]>{
    const baseUrl = `${this.url}/obterTodos`
    return this.http.get<Compromisso[]>(baseUrl);
  }

  cadastrar(obj:Compromisso):Observable<Compromisso>{
    return this.http.post<Compromisso>(this.url, obj);
  }

  findCompromissoPage(page: number, size: number, sort: string = ''): Observable<any> {
    const baseUrl = `${this.url}?page=${page}&size=${size}&sort=${sort}`;
    return this.http.get(baseUrl);
  }
  findById(id: string): Observable<Compromisso> {
    const baseUrl = `${this.url}/${id}`
    return this.http.get<Compromisso>(baseUrl);
  }

  deleteCompromisso(id: string): Observable<void> {
    const baseUrl = `${this.url}/${id}`
    return this.http.delete<void>(baseUrl);
  }

  mensagem(str: String): void{
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  update(compromisso: Compromisso):Observable<void> {
    const baseUrl = `${this.url}/${compromisso.id}`
    return this.http.put<void>(baseUrl, compromisso)
  }

  getCompromissosByUsuario(usuarioId: number, page: number, size: number, sort: string = ''): Observable<any> {
    const url = `${this.url}/usuario/${usuarioId}?page=${page}&size=${size}&sort=${sort}`;
    return this.http.get(url);
  }
}
