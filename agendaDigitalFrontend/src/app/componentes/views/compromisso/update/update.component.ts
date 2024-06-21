import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compromisso } from 'src/app/componentes/model/Compromisso';
import { CompromissoService } from 'src/app/componentes/service/compromisso.service';
import { StorageService } from 'src/app/componentes/service/storage.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  compromisso: Compromisso = {};
  nome = new FormControl('', [Validators.required]);

  constructor(
    private service: CompromissoService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.compromisso.id! = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.compromisso.id!).subscribe((resposta) => {
      this.compromisso.nome = resposta.nome;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Correção aqui
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  update(): void {
    const user = this.storageService.getUser();
    this.compromisso.usuario = { id: user.id };

    if (this.compromisso.inicio && this.compromisso.fim) {
      this.compromisso.inicio = this.formatDate(this.compromisso.inicio);
      this.compromisso.fim = this.formatDate(this.compromisso.fim);

      this.service.update(this.compromisso).subscribe({
        next: () => {
          this.router.navigate(["compromissos"]);
          this.service.mensagem("Compromisso atualizado com sucesso");
        },
        error: (err) => {
          this.service.mensagem('Validar se todos os campos estão preenchidos corretamente!');
        }
      });
    } else {
      this.service.mensagem('Por favor, preencha as datas de início e fim.');
    }
  }

  cancel(): void {
    this.router.navigate(['compromissos'])
  }

  getMessage() {
    if(this.nome.invalid){
      return 'O campo NOME precisa ser preenchido.'
      //return 'O campo NOME deve conter entre 2 e 200 caracteres.'
    }
    return false;
  }
}