import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Compromisso } from '../../model/compromisso.model';
import { CompromissoService } from '../../service/compromisso.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  compromisso: Compromisso = {}

  constructor(private service: CompromissoService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.compromisso).subscribe((resposta: any) => {
      console.log(resposta);
      this.router.navigate(['compromisso'])
      this.service.mensagem('Usuário criado com sucesso!');
    }, (error: any) => {
      console.log(error);
    })
  }

  cancel(): void {
    this.router.navigate(['compromisso'])
    this.service.mensagem('Você cancelou a criação de um novo usuário!');
  }

}