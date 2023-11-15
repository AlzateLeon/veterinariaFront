import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreacionCitaInDTO } from 'src/app/dtos/cita/creacion-cita-in.dto';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { ObjetoListaDTO } from 'src/app/dtos/objeto.lista.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { CitaMedicaService } from 'src/app/servicios/cita.medica.service';
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

  public tiposCita: String[] = ["Vacunación", "Baño"];

  public mascotas: MascotaDTO[] = [];
  
  public nombresMascotas: ObjetoListaDTO[] = [];

  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  fechaSeleccionada: string;

  public usuarioDTO: UsuarioDTO;

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    private citaService: CitaMedicaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService,
    //modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarCitaComponent>
  ) {
    this.citaForm = this.form.group({
      mascota: ['', Validators.required],
      fecha: ['', Validators.required],
      tipoCita: ['', Validators.required],
    });

    this.usuarioDTO = usuarioService.getUsuarioData();
    //se recupera la lista de mascotas
    this.cargarListaMascotas();
   
  }

  cargarListaMascotas(){
    this.mascotaService.mascotasData$.subscribe((mascotas) => {
      this.consultaMascotasUsuarioOutDTO = mascotas;
      this.mascotas = this.consultaMascotasUsuarioOutDTO.listaMascotas;
    });

    this.mascotas.forEach(mascota =>{
      let objeto : ObjetoListaDTO = new ObjetoListaDTO();
      objeto.id = mascota.id;
      objeto.valor = mascota.nombre;
      this.nombresMascotas.push(objeto);
    });
  }

  /**
   * Metodo encargado de crear una cita asociada a una mascota
   */
  crearCita(){
    console.log(this.citaForm);
    this.submitted = true;
    if (this.citaForm.invalid){
      return;
    }

    let citaIn : CreacionCitaInDTO = new CreacionCitaInDTO();
    citaIn.idMascota = this.citaForm.get('mascota')?.value;
    citaIn.idUser = this.usuarioDTO.idUser;

    let fechaHora = this.citaForm.get('fecha')?.value + "";
    let fecha = fechaHora.split("T")[0];
    let hora = fechaHora.split("T")[1];
    citaIn.fecha = fecha;
    citaIn.hora = hora;

    let tipo : string = "";
    if (this.citaForm.get('tipoCita')?.value === "Vacunación"){
      citaIn.tipoCitaMascotaEnum = "VACUNACION";
    }else{
      citaIn.tipoCitaMascotaEnum = "BANIO";
    }

    this.citaService.crearCita(citaIn).subscribe(res =>{
      if (res.exitoso){
        this.serviciosVeterinariaService.openInfoModal('Cita agendada exitosamente');
        this.volver();
        return;
      }
      this.serviciosVeterinariaService.openInfoModal(res.mensaje);
    });
    
  }

  volver() {
    this.dialogRef.close();
  }

  public get f() {
    return this.citaForm.controls;
  }

}
