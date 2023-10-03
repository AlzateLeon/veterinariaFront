import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreacionUsuarioIn } from 'src/app/dtos/creacion-usuario-in';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['../../app.component.css',
    '../../lib/flaticon/font/flaticon.css',
    '../../lib/owlcarousel/assets/owl.carousel.min.css',
    '../../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
  ],
})
export class CrearUsuarioComponent {
  public creacionUsuarioIn: CreacionUsuarioIn;

  public userForm: FormGroup;

  public submitted: boolean = false;

  public mensajeCorreo: string;

  constructor(
    private router: Router,
    private form: FormBuilder,
    // private modalInfoComponent: ModalInfoComponent,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.userForm = this.form.group({
      nombre: [],
      correo: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
      cedula: [],
      password: ['', Validators.required],
      Cpassword: ['', Validators.required],
    });
  }

  ngOnInit(){
    console.log( this.userForm);
    
  }

  volver() {
    this.router.navigate(['/']);
  }

  crearNuevoUsuario() {
    this.submitted = true;
    this.userForm.updateValueAndValidity();
    if (this.userForm.invalid){
      if (this.f['correo'].hasError('required')) {
        this.mensajeCorreo = "El correo es requerido."
      }
      if (this.f['correo'].hasError('pattern')) {
        this.mensajeCorreo = "El correo no cumple con el formato correcto."
      }
      
      return;
    }
    if (this.validarContrasenas()) {
      if (
        this.userForm.get('correo')?.value !== null &&
        this.userForm.get('password')?.value !== null &&
        this.userForm.get('Cpassword')?.value !== null
      ) {

        this.creacionUsuarioIn = new CreacionUsuarioIn();
        this.creacionUsuarioIn.nombre = this.userForm.get('nombre')?.value;
        this.creacionUsuarioIn.password = this.userForm.get('password')?.value;
        this.creacionUsuarioIn.cedula = this.userForm.get('cedula')?.value;
        this.creacionUsuarioIn.correo = this.userForm.get('correo')?.value;
        // this.creacionUsuarioIn.userName = this.userForm.get('usuario')?.value;
        this.creacionUsuarioIn.tipoUsuarioEnum = "DUENO_MASCOTA";

        this.serviciosVeterinariaService
          .crearNuevoUsuario(this.creacionUsuarioIn)
          .subscribe((respuesta) => {
            console.log(respuesta);
            
            if (!respuesta.exitoso) {
              this.serviciosVeterinariaService.openInfoModal(respuesta.mensaje);
            } else {
              this.serviciosVeterinariaService.openInfoModal('Usuario registrado exitosamente');
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
    // this.userForm.get('usuario')?.setValue('');
    this.userForm.get('nombre')?.setValue('');
    this.userForm.get('correo')?.setValue('');
    this.userForm.get('cedula')?.setValue('');
    this.userForm.get('password')?.setValue('');
    this.userForm.get('Cpassword')?.setValue('');
    this.submitted = false;
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

  public get f(){
    return this.userForm.controls;
  }
}
