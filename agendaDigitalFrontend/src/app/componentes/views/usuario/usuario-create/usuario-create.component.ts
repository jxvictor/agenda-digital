import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/componentes/model/Usuario';
import { UsuarioService } from 'src/app/componentes/service/usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent {

  usuario = new Usuario();

  //json
  usuarios: Usuario[] = [];

  constructor(
    private service: UsuarioService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  cadastrar():void{
    this.service.cadastrar(this.usuario).subscribe((resposta: any) => {
      console.log(resposta);
      this.router.navigate([''])
      this.service.mensagem('Usuário cadastrado com sucesso!');
    }, (error: any) => {
      console.log(error);
      this.service.mensagem("Erro ao criar Usuário! Tente mais tarde!");
    })
  }

  cancel(): void {
    this.router.navigate([''])
    this.service.mensagem('Você cancelou o cadastro!');
  }

}
