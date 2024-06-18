import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompromissoService } from '../../service/compromisso.service';
import { Compromisso } from '../../model/compromisso.model';

@Component({
  selector: 'app-compromisso-update',
  templateUrl: './compromisso-update.component.html',
  styleUrls: ['./compromisso-update.component.css']
})
export class CompromissoUpdateComponent implements OnInit {
  compromissoForm: FormGroup;
  compromissoId!: string;

  constructor(
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.compromissoForm = this.fb.group({
      nome: [''],
      inicio: [''],
      fim: ['']
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.compromissoId! = this.route.snapshot.paramMap.get("id")!;
    });

  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('nome', this.compromissoForm.value.nome);
    formData.append('inicio', this.compromissoForm.value.inicio);
    formData.append('fim', this.compromissoForm.value.fim);

    this.compromissoService.update(this.compromissoId, formData).subscribe(
      response => {
        console.log('Compromisso atualizado com sucesso', response);
        this.router.navigate(['/compromisso']);
      },
      error => {
        console.error('Erro ao atualizar compromisso', error);
      }
    );
  }
}