import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { creacionMascotaInDTO } from 'src/app/dtos/mascota/creacion-mascota-in.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ModalInfoComponent } from 'src/app/utiles/modal-info/modal-info.component';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['../../app.component.css'],
})
export class AgregarMascotaComponent {
  public mascotaForm: FormGroup;

  public submitted: boolean = false;

  opcionSeleccionada: string = 'opcion1'; // Valor predeterminado
  public tiposMascota: string[] = ['PERRO', 'GATO', 'PEZ', 'CABALLO'];

  public usuarioDTO: UsuarioDTO;

  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private router: Router,
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
  ) {
    this.mascotaForm = this.form.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      tipo: ['', Validators.required],
      edad: ['', Validators.required],
    });

    this.usuarioDTO = usuarioService.getUsuarioData();
  }

  public get f() {
    return this.mascotaForm.controls;
  }

  volver() {
    this.dialogRef.close();
  }

  agregarMascota() {
    this.submitted = true;
    if (this.mascotaForm.invalid) {
      return;
    }

    let inDTO: creacionMascotaInDTO = new creacionMascotaInDTO();
    inDTO.nombre = this.mascotaForm.get('nombre')?.value;
    inDTO.raza = this.mascotaForm.get('raza')?.value;
    inDTO.tipoMascota = this.mascotaForm.get('tipo')?.value;
    inDTO.edad = this.mascotaForm.get('edad')?.value;
    inDTO.idDueno = this.usuarioDTO.idUser;

    this.mascotaService.crearMascota(inDTO).subscribe((resultado) => {
      if (resultado.exitoso) {
        this.serviciosVeterinariaService.openInfoModal('¡Mascota agregada!');
        this.modalClosed.emit();
        this.volver();
        return;
      }
      this.serviciosVeterinariaService.openInfoModal(resultado.mensaje);
    });
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
      };

      reader.readAsDataURL(selectedFile);
    }
  }
}
