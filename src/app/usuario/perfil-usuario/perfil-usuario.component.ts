import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['../../app.component.css']
})
export class PerfilUsuarioComponent {

  userName: string;

  public usuarioDTO: UsuarioDTO;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    private serviciosVeterinariaService: ServiciosVeterinariaService) {
    // Recupera el valor del parámetro 'id' de la URL
    this.route.queryParams.subscribe(params => {
      
      this.usuarioDTO = JSON.parse(params['user']);
      console.log("recibido", this.usuarioDTO);
      
      this.userName = this.usuarioDTO.nombre;
    });
  }

  volver(){
    this.router.navigate(['/']);
  }

  editarPerfil(){
    console.log("editar");
    
  }

}
