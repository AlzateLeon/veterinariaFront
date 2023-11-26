import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosVeterinariaService } from '../servicios-veterinaria.service';

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
    private router: Router,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {}

  navegarAInicioUser() {
    //this.router.navigate(['/app-inicio-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
    this.serviciosVeterinariaService.openIngresarModal();
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
