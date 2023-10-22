import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarUsuarioMascotaInDTO } from 'src/app/dtos/editar-usuario-mascota-in.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['../../app.component.css'],
})
export class PerfilUsuarioComponent {
  userName: string;

  public usuarioDTO: UsuarioDTO;

  //mostrar u ocultar informacion de pantalla
  public mostrarInformacionB: boolean = true;
  public mostrarEditaB: boolean = false;
  public mostrarMascotasB: boolean = false;
  public mostrarAgendabB: boolean = false;

  //forms
  public editForm: FormGroup;

  public mensajeCorreo: string;

  public submittedEdit: boolean = false;

  public CorreoEditar: string;
  public NombreEditar: string;
  public imagen: string;



  constructor(
    private router: Router,
    private form: FormBuilder,
    private route: ActivatedRoute,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    // Recupera el valor del parámetro 'id' de la URL
    // this.route.queryParams.subscribe((params) => {
    //   this.usuarioDTO = JSON.parse(params['user']);
    //   console.log('recibido', this.usuarioDTO);

    //   this.userName = this.usuarioDTO.nombre;
    // });
    this.usuarioDTO = usuarioService.getUsuarioData();
    console.log('recibido', this.usuarioDTO);
    this.CorreoEditar = this.usuarioDTO.correo;
    this.NombreEditar = this.usuarioDTO.nombre;
    this.imagen = this.usuarioDTO.imagenUser;

    this.editForm = this.form.group({
      nombre: [null],
      correo: [
        null,
        [
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
    });
  }

  volver() {
    this.router.navigate(['/']);
  }

  //pantalla de la informacion del usuario
  mostrarInformacion() {
    this.mostrarInformacionB = true;
    this.mostrarEditaB = false;
    this.mostrarMascotasB = false;
    this.mostrarAgendabB = false;
  }

  //muestra la pantalla de editar perfil
  mostrarEditar() {
    this.mostrarInformacionB = false;
    this.mostrarEditaB = true;
    this.mostrarMascotasB = false;
    this.mostrarAgendabB = false;
  }

  mostrarMascotas() {
    this.mostrarInformacionB = false;
    this.mostrarEditaB = false;
    this.mostrarMascotasB = true;
    this.mostrarAgendabB = false;
  }

  mostrarAgenda() {
    this.mostrarInformacionB = false;
    this.mostrarEditaB = false;
    this.mostrarMascotasB = false;
    this.mostrarAgendabB = true;
  }

  editarUsuario() {
    console.log('entro');

    if (
      this.editForm.get('correo')?.value === null &&
      this.editForm.get('nombre')?.value === null
    ) {
      this.serviciosVeterinariaService.openInfoModal(
        'Para editar la información debe ingresar los nuevos datos'
      );
      return;
    }

    this.submittedEdit = true;
    //se valida que haya editado alguno de los dos campos
    if (this.editForm.invalid) {
      if (this.f['correo'].hasError('pattern')) {
        this.mensajeCorreo = 'El correo no cumple con el formato correcto.';
      }
      return;
    }

    let editarIn: EditarUsuarioMascotaInDTO = new EditarUsuarioMascotaInDTO();
    editarIn.correo = this.editForm.get('correo')?.value;
    editarIn.nombre = this.editForm.get('nombre')?.value;
    editarIn.idUsuario = this.usuarioDTO.idUser;
    editarIn.imagen = this.imagen;

    //se edita el user
    this.usuarioService.editarUsuario(editarIn).subscribe((resultado) => {
      if (resultado.exitoso) {
        this.serviciosVeterinariaService.openInfoModal(
          'Información editada exitosamente'
        );

        //se recupera el usuario editado
        this.serviciosVeterinariaService
          .consultarUsuarioExistente(
            this.editForm.get('correo')?.value,
            this.usuarioDTO.contrasena
          )
          .subscribe((resultado) => {
            this.usuarioDTO = resultado;
          });
      } else {
        this.serviciosVeterinariaService.openInfoModal(resultado.mensaje);
      }
    });
  }

  public get f() {
    return this.editForm.controls;
  }

  handleFileInput(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imagePreview = document.getElementById(
          'imagePreview'
        ) as HTMLImageElement;
        imagePreview.src = e.target?.result as string;

        this.imagen = e.target?.result as string;
        this.usuarioDTO.imagenUser = this.imagen;
        console.log(this.imagen);
      };

      reader.readAsDataURL(selectedFile);
    }
  }
}
