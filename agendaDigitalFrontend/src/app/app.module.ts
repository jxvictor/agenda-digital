import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './componentes/template/principal/principal.component';
import { FormsModule } from '@angular/forms';
import { UsuarioCreateComponent } from './componentes/views/usuario/usuario-create/usuario-create.component';
import { UsuarioReadComponent } from './componentes/views/usuario/usuario-read/usuario-read.component';
import { CreateComponent } from './componentes/views/compromisso/create/create.component';
import { ReadComponent } from './componentes/views/compromisso/read/read.component';
import { DeleteComponent } from './componentes/views/compromisso/delete/delete.component';
import { UpdateComponent } from './componentes/views/compromisso/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    UsuarioCreateComponent,
    UsuarioReadComponent,
    CreateComponent,
    ReadComponent,
    DeleteComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
