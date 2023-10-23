import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InicioUsuarioComponent } from './usuario/inicio-usuario/inicio-usuario.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrincipalComponent } from './principal/principal.component';
import { ModalInfoComponent } from './utiles/modal-info/modal-info.component';
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ListaMascotasComponent } from './mascota/lista-mascotas/lista-mascotas.component';
import { AgregarMascotaComponent } from './mascota/agregar-mascota/agregar-mascota.component';
import { ValidarMailComponent } from './usuario/validar-mail/validar-mail.component';
import { CarnetMascotaComponent } from './mascota/carnet-mascota/carnet-mascota.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioUsuarioComponent,
    PrincipalComponent,
    ModalInfoComponent,
    PerfilUsuarioComponent,
    CrearUsuarioComponent,
    ListaMascotasComponent,
    AgregarMascotaComponent,
    ValidarMailComponent,
    CarnetMascotaComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    RouterModule ,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
