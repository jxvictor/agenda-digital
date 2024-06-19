import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate{
    constructor(
      private storage: StorageService,
      private router: Router) { }
    canActivate(){
      if (this.storage.isLoggedIn()) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
}