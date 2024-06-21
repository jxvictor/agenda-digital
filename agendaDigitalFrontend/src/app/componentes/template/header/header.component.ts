import { Component } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(public storageService: StorageService,
    private router: Router
  ) {
     }


     ngOnInit(): void {
      this.isLoggedIn = this.storageService.isLoggedIn(); // Método que verifica se o usuário está logado no StorageService
    }
    
  deslogar(){
    this.storageService.clean();
    this.isLoggedIn = false;
  }

  routerCompromissos(){
    this.router.navigate(['compromissos'])
  }

  routerHome(){
    this.router.navigate(['home'])
  }

}
