import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class AgregarCitaComponent {

  public citaForm: FormGroup;
  public submitted: boolean = false;

  public mascotas: MascotaDTO[] = [];
  public nombresMascotas: string[] = [];

  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    //modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarCitaComponent>
  ) {
    this.citaForm = this.form.group({
      mascota: [''],
      fecha: [''],
      tipoCita: [''],
    });

    //se recupera la lista de mascotas
    this.cargarListaMascotas();
   
  }

  cargarListaMascotas(){
    this.mascotaService.mascotasData$.subscribe((mascotas) => {
      this.consultaMascotasUsuarioOutDTO = mascotas;
      this.mascotas = this.consultaMascotasUsuarioOutDTO.listaMascotas;
    });

    this.mascotas.forEach(mascota =>{
      this.nombresMascotas.push(mascota.nombre);
    });
  }

  /**
   * Metodo encargado de crear una cita asociada a una mascota
   */
  crearCita(){

  }

  volver() {
    this.dialogRef.close();
  }

  public get f() {
    return this.citaForm.controls;
  }

}
