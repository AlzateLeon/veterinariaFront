import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {

  userName: string;

  constructor(private route: ActivatedRoute) {
    // Recupera el valor del parámetro 'id' de la URL
    this.route.queryParams.subscribe(params => {
      this.userName = params['user'];
    });
  }

}
