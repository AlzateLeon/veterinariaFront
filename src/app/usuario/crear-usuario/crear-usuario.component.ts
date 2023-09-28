import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreacionUsuarioIn } from 'src/app/dtos/creacion-usuario-in';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: [
    '../../app.component.css',
    '../../lib/flaticon/font/flaticon.css',
    '../../lib/owlcarousel/assets/owl.carousel.min.css',
    '../../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  ],
})
export class CrearUsuarioComponent {
  public creacionUsuarioIn: CreacionUsuarioIn;

  public userForm: FormGroup;

  constructor(
    private router: Router,
    private form: FormBuilder,
    // private modalInfoComponent: ModalInfoComponent,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.userForm = this.form.group({
      usuario: [null],
      nombre: [null],
      correo: [null],
      cedula: [null],
      password: [null],
      Cpassword: [null],
    });
  }

  volver() {
    this.router.navigate(['/']);
  }

  crearNuevoUsuario() {
    if (this.validarContrasenas()) {
      if (
        this.userForm.get('usuario')?.value !== null &&
        this.userForm.get('password')?.value !== null &&
        this.userForm.get('Cpassword')?.value !== null
      ) {

        this.creacionUsuarioIn = new CreacionUsuarioIn();
        this.creacionUsuarioIn.nombre = this.userForm.get('nombre')?.value;
        this.creacionUsuarioIn.password = this.userForm.get('password')?.value;
        this.creacionUsuarioIn.cedula = this.userForm.get('cedula')?.value;
        this.creacionUsuarioIn.correo = this.userForm.get('correo')?.value;
        this.creacionUsuarioIn.userName = this.userForm.get('usuario')?.value;
        this.creacionUsuarioIn.tipoUsuarioEnum = "DUENO_MASCOTA";

        this.serviciosVeterinariaService
          .crearNuevoUsuario(this.creacionUsuarioIn)
          .subscribe((respuesta) => {
            if (!respuesta.exitoso) {
              this.serviciosVeterinariaService.openInfoModal(respuesta.mensaje);
            } else {
              this.serviciosVeterinariaService.openInfoModal('Exito');
            }
            this.limpiarCampos();
          }
        );
      }else{
        this.serviciosVeterinariaService.openInfoModal('Se necesita por lo menos el usuario y contraseña');
      }
    }else{
      this.serviciosVeterinariaService.openInfoModal('Las contraseñas no coinciden');
    }
  }

  limpiarCampos() {
    this.userForm.get('usuario')?.setValue('');
    this.userForm.get('nombre')?.setValue('');
    this.userForm.get('correo')?.setValue('');
    this.userForm.get('cedula')?.setValue('');
    this.userForm.get('password')?.setValue('');
    this.userForm.get('Cpassword')?.setValue('');
  }

  validarContrasenas(): boolean {
    console.log(this.userForm.get('password')?.value + " "+ 
    this.userForm.get('Cpassword')?.value);
    
    if (
      this.userForm.get('password')?.value !== null &&
      this.userForm.get('Cpassword')?.value !== null &&
      this.userForm.get('password')?.value ===
        this.userForm.get('Cpassword')?.value
    ) {
      return true;
    }
    return false;
  }
}
