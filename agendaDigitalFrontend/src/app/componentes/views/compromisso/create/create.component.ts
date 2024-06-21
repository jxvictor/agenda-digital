import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Compromisso } from 'src/app/componentes/model/Compromisso';
import { CompromissoService } from 'src/app/componentes/service/compromisso.service';
import { StorageService } from 'src/app/componentes/service/storage.service';
import { UsuarioService } from 'src/app/componentes/service/usuario.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  compromisso = new Compromisso();

  compromissos: Compromisso[] = [];

  constructor(private service: CompromissoService,
    private storageService: StorageService,
    private router: Router
  ){}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00'; 
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  cadastrar(): void {
    const user = this.storageService.getUser();
    this.compromisso.usuario = { id: user.id };

    // Ensure inicio and fim are defined
    if (this.compromisso.inicio && this.compromisso.fim) {
      this.compromisso.inicio = this.formatDate(this.compromisso.inicio);
      this.compromisso.fim = this.formatDate(this.compromisso.fim);

      this.service.cadastrar(this.compromisso)
        .subscribe(retorno => {
          this.compromissos.push(retorno);
          this.compromisso = new Compromisso();
          alert('Compromisso cadastrado com sucesso!');
        });
    } else {
      alert('Por favor, preencha as datas de início e fim.');
    }
  }

  cancelar():void{

    // Limpar formulário
    this.router.navigate(['compromissos'])

    // Visibilidade da tabela

  }


}
