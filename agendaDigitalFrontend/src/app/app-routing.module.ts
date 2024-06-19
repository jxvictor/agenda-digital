import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/template/principal/principal.component';
import { UsuarioCreateComponent } from './componentes/views/usuario/usuario-create/usuario-create.component';

const routes: Routes = [
  { 
    path: 'home', component: PrincipalComponent
  },
  { 
    path: 'registro', component: UsuarioCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
