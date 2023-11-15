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
import { CarnetDetrasComponent } from './mascota/carnet-detras/carnet-detras.component';
import { AgendaMascotasComponent } from './mascota/agenda-mascotas/agenda-mascotas.component';
import { AgregarCitaComponent } from './mascota/agenda-mascotas/agregar-cita/agregar-cita.component';
import { ModalCancelarCitaComponent } from './mascota/agenda-mascotas/modal-cancelar-cita/modal-cancelar-cita.component';
import { ModalConsultarCitaComponent } from './mascota/agenda-mascotas/modal-consultar-cita/modal-consultar-cita.component';
import { EditarUsuarioComponent } from './usuario/perfil-usuario/editar-usuario/editar-usuario.component';
import { InformacionPerfilUsuarioComponent } from './usuario/perfil-usuario/informacion-perfil-usuario/informacion-perfil-usuario.component';

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
    CarnetDetrasComponent,
    AgendaMascotasComponent,
    AgregarCitaComponent,
    ModalCancelarCitaComponent,
    ModalConsultarCitaComponent,
    EditarUsuarioComponent,
    InformacionPerfilUsuarioComponent,
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
