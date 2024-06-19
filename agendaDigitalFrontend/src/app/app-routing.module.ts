import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/template/principal/principal.component';
import { UsuarioCreateComponent } from './componentes/views/usuario/usuario-create/usuario-create.component';
import { ReadComponent } from './componentes/views/compromisso/read/read.component';
import { CreateComponent } from './componentes/views/compromisso/create/create.component';
import { UsuarioNaoAutenticadoGuard } from './componentes/views/guard/usuario-nao-autenticado.guard';
import { AuthGuard } from './componentes/views/guard/auth.guard';

const routes: Routes = [
  { 
    path: '', component: PrincipalComponent
  },
  {
    path: 'inicio',
    redirectTo: 'http://localhost:4200',
    pathMatch: 'full'
    
  },
  {
    path: 'login',
    component: PrincipalComponent,
    canActivate: [UsuarioNaoAutenticadoGuard]
  },
  {
    path: 'register',
    component: UsuarioCreateComponent,
    canActivate: [UsuarioNaoAutenticadoGuard]
  },
  { 
    path: 'compromissos', component: ReadComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_USER' , 'ROLE_MOD', 'ROLE_ADMIN'] }
  },
  { 
    path: 'cadastrar/compromisso', component: CreateComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_USER' , 'ROLE_MOD', 'ROLE_ADMIN'] }
  }
  /*{
    path: '', 
    component: PrincipalComponent, 
    canActivate: [UsuarioAutenticadoGuard],
    children: 
    [
      { 
        path: 'home', component: HomeComponent
      },
      {
        path: 'produto', component: ProdutoReadComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_MOD', 'ROLE_ADMIN'] }
      }
    ],
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
