import { Component } from '@angular/core';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-informacion-perfil-usuario',
  templateUrl: './informacion-perfil-usuario.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class InformacionPerfilUsuarioComponent {

  public usuarioDTO: UsuarioDTO;

  constructor(public usuarioService: UsuarioService,){
    this.usuarioDTO = usuarioService.getUsuarioData();
  }

}
