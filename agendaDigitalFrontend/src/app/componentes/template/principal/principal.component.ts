import { Component, OnInit } from '@angular/core';
import { Compromisso } from '../../model/Compromisso';
import { CompromissoService } from '../../service/compromisso.service';
import { Page } from '../../model/page.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  hide = true;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  usuarioData: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.usuarioData = this.storageService.getUser().username;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.usuarioData = this.storageService.getUser().usuarioData;
        this.reloadPage();
        this.router.navigate(["/home"])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  registrar(): void {
      this.router.navigate(['register'])
  }

  reloadPage(): void {
    window.location.reload();
  }
}