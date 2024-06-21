import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compromisso } from 'src/app/componentes/model/Compromisso';
import { CompromissoService } from 'src/app/componentes/service/compromisso.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  compromisso: Compromisso = {}

  constructor(
    private http: HttpClient,
    private service: CompromissoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.compromisso.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.compromisso.id!).subscribe((resposta) => {
      this.compromisso = resposta;
      console.log(this.compromisso);
    })
  }

  deleteCompromisso(): void {
    this.service.deleteCompromisso(this.compromisso.id!).subscribe({
      next: () => {
        this.router.navigate(['compromissos']);
        this.service.mensagem('Compromisso deletado com sucesso!');
        console.log('Compromisso deletada com sucesso!');
      },
      error: error => {
        console.error(error);
      },
    });
  }
  

  cancel(): void {
    this.router.navigate(['compromissos'])
    this.service.mensagem('Você cancelou a remoção do compromisso!');
  }

}