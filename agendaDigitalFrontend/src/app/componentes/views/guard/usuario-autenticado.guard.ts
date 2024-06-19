import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{
    constructor(
      private storage: StorageService,
      private router: Router) { }
    canActivate(){
      if (this.storage.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }
}