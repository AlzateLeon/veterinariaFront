import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(private router: Router) { }

  navegarAInicioUser() {
    this.router.navigate(['/app-inicio-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
  }

}
