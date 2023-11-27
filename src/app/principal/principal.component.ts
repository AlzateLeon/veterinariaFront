import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosVeterinariaService } from '../servicios-veterinaria.service';
import { MatDialog } from '@angular/material/dialog';
import { InicioUsuarioComponent } from '../usuario/inicio-usuario/inicio-usuario.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: [
    '../app.component.css',
    '../css/principal.css',
    '../lib/flaticon/font/flaticon.css',
  ],
})
export class PrincipalComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {}

  navegarAInicioUser() {
    //this.router.navigate(['/app-inicio-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
    // this.serviciosVeterinariaService.openIngresarModal();
    const dialogoModal = this.dialog.open(InicioUsuarioComponent,{
      width: '360px',
      height: '550px',
      disableClose:true
    });
  }

  navegarACrearUsuarior() {
    this.router.navigate(['/crear-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
  }

  navegarASobreNosotros() {
    // Utiliza JavaScript o TypeScript para navegar a la sección de destino
    const seccionDestino = document.getElementById('seccionSobreNosotros');
    if (seccionDestino) {
      seccionDestino.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  navegarAservicios() {
    // Utiliza JavaScript o TypeScript para navegar a la sección de destino
    const seccionDestino = document.getElementById('seccionServicios');
    if (seccionDestino) {
      seccionDestino.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navegarAContactenos() {
    // Utiliza JavaScript o TypeScript para navegar a la sección de destino
    const seccionDestino = document.getElementById('seccionContacto');
    if (seccionDestino) {
      seccionDestino.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
