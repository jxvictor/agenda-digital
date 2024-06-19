import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../../service/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data["roles"] as string[];
    
    if (requiredRoles && requiredRoles.some(role => this.storageService.hasRole(role))) {
      return true; // O usuário possui pelo menos uma das funções necessárias
    }

    // Redireciona para uma página de erro ou para a página de login
    this.router.navigate(['error']); // Substitua 'error' pela rota de sua escolha
    return false;
  }
}
