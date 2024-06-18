import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Compromisso } from '../model/compromisso.model';
@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  
  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar) { }

  /*findAll():Observable<compromisso[]>{
    return this.http.get<compromisso[]>(url)
  }*/

  create(compromisso: Compromisso): Observable<Compromisso>{
    const url = `${this.baseUrl}/compromisso`
    return this.http.post<Compromisso>(url, compromisso);
  }

  findById(id: string): Observable<Compromisso> {
    const url = `${this.baseUrl}/compromisso/${id}`
    return this.http.get<Compromisso>(url);
  }

  deletecompromisso(id: string): Observable<void> {
    const url = `${this.baseUrl}/compromisso/${id}`
    return this.http.delete<void>(url);
  }

  /*update(compromisso: Compromisso):Observable<void> {
    const url = `${this.baseUrl}/compromisso/${compromisso.id}`
    return this.http.put<void>(url, compromisso)
  }*/

  update(id: string, formData: FormData): Observable<Compromisso> {
    const url = `${this.baseUrl}/compromisso/${id}`;
    return this.http.put<Compromisso>(url, formData);
  }

  mensagem(str: String): void{
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

}