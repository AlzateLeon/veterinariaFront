import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-carnet-mascota',
  templateUrl: './carnet-mascota.component.html',
  styleUrls: ['../../app.component.css'],
})
export class CarnetMascotaComponent {

  public carnetForm: FormGroup;

  public mascota: MascotaDTO;

  public nombreEditar: string;
  public edadEditar: string;
  public razaEditar: string;
  public tipoEditar: string;
  public observacionEditar: string;

  public imagen: string;

  constructor(
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    //modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CarnetMascotaComponent>,
  ){
    this.carnetForm = this.form.group({
      nombre: [''],
      raza: [''],
      tipo: [''],
      edad: [''],
      observacion: [''],
    });

    this.mascota = this.mascotaService.getMascotaData();
    this.nombreEditar = this.mascota.nombre;
    this.edadEditar = this.mascota.edad;
    this.razaEditar = this.mascota.raza;
    this.tipoEditar = this.mascota.tipoMascota;
    this.observacionEditar = this.mascota.observacion;
  }

  volver() {
    this.dialogRef.close();
  }

  actualizarMascota(){

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
        this.mascota.imagenMascota = this.imagen;
      };

      reader.readAsDataURL(selectedFile);
    }
  }

}
