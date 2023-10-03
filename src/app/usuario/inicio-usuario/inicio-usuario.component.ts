import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreacionUsuarioIn } from 'src/app/dtos/creacion-usuario-in';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { ModalInfoComponent } from 'src/app/utiles/modal-info/modal-info.component';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent {

  public creacionUsuarioIn: CreacionUsuarioIn;

  public userForm : FormGroup;

  //variables pantalla
  usuario: string;
  contrasena: string;

  constructor(private router: Router,
    private form : FormBuilder,
    // private modalInfoComponent: ModalInfoComponent,
    private serviciosVeterinariaService: ServiciosVeterinariaService) {
      
      this.userForm = this.form.group({
        usuario: [null],
        password: [null],
        correo: [null]
      })
     }

  volver() {
    this.router.navigate(['/']);
  }

  crearNuevoUsuario(){
    if (this.userForm.get('usuario')?.value !== null &&
    this.userForm.get('password')?.value !== null){

      console.log(this.userForm.get('usuario')?.value,  this.userForm.get('password')?.value);

      this.creacionUsuarioIn = new CreacionUsuarioIn();
      this.creacionUsuarioIn.nombre = this.userForm.get('usuario')?.value;
      this.creacionUsuarioIn.password = this.userForm.get('password')?.value

      this.serviciosVeterinariaService.crearNuevoUsuario(this.creacionUsuarioIn).subscribe(
        respuesta =>{
          if (!respuesta.exitoso){
            this.serviciosVeterinariaService.openInfoModal(respuesta.mensaje);
          }else{
            this.serviciosVeterinariaService.openInfoModal("Exito");
          }
          this.limpiarCampos();
        }
      );
    }
  }

  iniciarSesion(){

    // se valida si ya existe el usuario
    if (this.userForm.get('correo')?.value !== null &&
    this.userForm.get('password')?.value !== null){
      this.serviciosVeterinariaService.consultarUsuarioExistente(this.userForm.get('correo')?.value,
      this.userForm.get('password')?.value ).subscribe(
        resultado =>{
          if (resultado.exitoso){
            // se redirige al perfil del this.usuario
            this.router.navigate(['/perfil-usuario'], { queryParams: { user: resultado.user } });
          }else{
              this.serviciosVeterinariaService.openInfoModal(resultado.mensaje);
          }
          this.limpiarCampos();
        }
      )
    }
  }

  limpiarCampos(){
    this.userForm.get('usuario')?.setValue("");
    this.userForm.get('password')?.setValue("");
  }


}
