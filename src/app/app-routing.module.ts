import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioUsuarioComponent } from './usuario/inicio-usuario/inicio-usuario.component';

const routes: Routes = [
    { path: '', component: AppComponent }, // Ruta de la pantalla de inicio
    { path: 'app-inicio-usuario', component: InicioUsuarioComponent }, // Ruta hacia otro componente
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }