import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CitaMedicaDTO } from 'src/app/dtos/cita/cita-medica.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { CitaMedicaService } from 'src/app/servicios/cita.medica.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-modal-cancelar-cita',
  templateUrl: './modal-cancelar-cita.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class ModalCancelarCitaComponent {
  
  citaCancelar: CitaMedicaDTO;

  public usuarioDTO: UsuarioDTO;

  constructor(
    public dialog: MatDialog,
    public usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private citaMedicaService: CitaMedicaService,
    public dialogRef: MatDialogRef<ModalCancelarCitaComponent>,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.citaCancelar = this.data.cita;
    this.usuarioDTO = usuarioService.getUsuarioData();
    console.log(data.cita);
  }

  volver() {
    this.dialogRef.close();
  }

  cancelarCita() {
    this.citaMedicaService.cancelarCita(this.citaCancelar).subscribe((res) => {
      if (res.exitoso) {
        this.serviciosVeterinariaService
          .consultarUsuarioExistente(
            this.usuarioDTO.correo,
            this.usuarioDTO.contrasena 
          )
          .subscribe((resultado) => {
            if (resultado.exitoso){
              this.usuarioDTO = resultado;
              this.usuarioService.setUsuarioData(this.usuarioDTO);
              this.serviciosVeterinariaService.openInfoModal(
                'Cita cancelada exitosamente'
              );
            }else{
              this.serviciosVeterinariaService.openInfoModal(resultado.mensaje);
            }
          });
        this.volver();
      } else {
        this.serviciosVeterinariaService.openInfoModal(res.mensaje);
      }
    });
  }
}
