import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompromissoReadComponent } from './componentes/views/compromisso-read/compromisso-read.component';
import { CompromissoDeleteComponent } from './componentes/views/compromisso-delete/compromisso-delete.component';
import { CompromissoUpdateComponent } from './componentes/views/compromisso-update/compromisso-update.component';
import { CompromissoCreateComponent } from './componentes/views/compromisso-create/compromisso-create.component';

const routes: Routes = [

  {
    path: 'inicio',
    redirectTo: 'http://localhost:4200',
    pathMatch: 'full'
    
  },
  {
    path: 'compromisso',
    component: CompromissoReadComponent
  },
  {
    path: 'compromisso/delete/:id',
    component: CompromissoDeleteComponent
  },
  {
    path: 'compromisso/update/:id',
    component: CompromissoUpdateComponent
  },
  {
    path: 'compromisso/update/:id',
    component: CompromissoCreateComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
