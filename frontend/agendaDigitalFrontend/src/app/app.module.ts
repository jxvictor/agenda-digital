import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompromissoCreateComponent } from './componentes/views/compromisso-create/compromisso-create.component';
import { CompromissoReadComponent } from './componentes/views/compromisso-read/compromisso-read.component';
import { CompromissoDeleteComponent } from './componentes/views/compromisso-delete/compromisso-delete.component';
import { CompromissoUpdateComponent } from './componentes/views/compromisso-update/compromisso-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CompromissoCreateComponent,
    CompromissoReadComponent,
    CompromissoDeleteComponent,
    CompromissoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
