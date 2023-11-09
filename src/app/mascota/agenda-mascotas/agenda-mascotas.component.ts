import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';
import { VacunaService } from 'src/app/servicios/vacuna.service';
import { CitaMedicaService } from 'src/app/servicios/cita.medica.service'
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ConsultasCitasUserOutDTO } from 'src/app/dtos/cita/consultas-citas-user-out.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { CitaMedicaDTO } from 'src/app/dtos/cita/cita-medica.dto';

@Component({
  selector: 'app-agenda-mascotas',
  templateUrl: './agenda-mascotas.component.html',
  styleUrls: ['../../app.component.css'],
})
export class AgendaMascotasComponent {

  public submitted: boolean = false;

  public usuarioDTO: UsuarioDTO;

  public consultasCitasUserOutDTO: ConsultasCitasUserOutDTO;

  public citas: CitaMedicaDTO[] = [];

  constructor(
    public dialog: MatDialog,
    public citaMedicaService: CitaMedicaService,
    public usuarioService: UsuarioService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {

    this.usuarioDTO = usuarioService.getUsuarioData();
    this.citaMedicaService.consultarCitasUsuario(this.usuarioDTO.idUser).subscribe(res =>{
      this.consultasCitasUserOutDTO = res;

      if (this.consultasCitasUserOutDTO.exitoso){

        if (this.consultasCitasUserOutDTO.listaCitasMedicas != null && 
          this.consultasCitasUserOutDTO.listaCitasMedicas.length > 0){
            this.citas = this.consultasCitasUserOutDTO.listaCitasMedicas;
            console.log(this.citas);    
          }else{
            console.log("aun no tienes citas");
            
          }
        
      }else{
        this.serviciosVeterinariaService.openInfoModal(
          this.consultasCitasUserOutDTO.mensaje
        );
      }
    });
  }

  irCrear(){
    const dialogoModal = this.dialog.open(AgregarCitaComponent);

    dialogoModal.afterClosed().subscribe(e => {
        //this.recargarListaCitas();
        console.log("cita agendada");
        
    });
  }
}
