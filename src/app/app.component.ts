import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-veterinaria';

  constructor(private router: Router) { }

  navegarAInicioUser() {
    this.router.navigate(['/app-inicio-usuario']); // 'otro' es la ruta que definiste en el enrutamiento
  }
}
