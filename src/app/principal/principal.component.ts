import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css',
    '../lib/flaticon/font/flaticon.css',
    '../lib/owlcarousel/assets/owl.carousel.min.css',
    '../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css']
})
export class PrincipalComponent {

  constructor(private router: Router) { }

  navegarAInicioUser() {
    this.router.navigate(['/app-inicio-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
  }

  navegarACrearUsuarior() {
    this.router.navigate(['/crear-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
  }

  navegarASobreNosotros() {
    // Utiliza JavaScript o TypeScript para navegar a la sección de destino
    const seccionDestino = document.getElementById('seccionSobreNosotros');
    if (seccionDestino) {
      seccionDestino.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }

  navegarAservicios() {
    // Utiliza JavaScript o TypeScript para navegar a la sección de destino
    const seccionDestino = document.getElementById('seccionServicios');
    if (seccionDestino) {
      seccionDestino.scrollIntoView({ behavior: 'smooth' });
    }
  }
  


}
