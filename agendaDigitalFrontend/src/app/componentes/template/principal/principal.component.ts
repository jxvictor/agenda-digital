import { Component } from '@angular/core';
import { Compromisso } from '../../model/Compromisso';
import { CompromissoService } from '../../service/compromisso.service';
import { Page } from '../../model/page.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../model/Usuario';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

}
