import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CitaMedicaDTO } from 'src/app/dtos/cita/cita-medica.dto';
import { ConsultaCitaFiltrosInDTO } from 'src/app/dtos/cita/consulta-cita-filtros-in.dto';
import { ConsultasCitasUserOutDTO } from 'src/app/dtos/cita/consultas-citas-user-out.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { CitaMedicaService } from 'src/app/servicios/cita.medica.service';

@Component({
  selector: 'app-citas-control',
  templateUrl: './citas-control.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class CitasControlComponent implements AfterViewInit {

  private consultaCitaFiltrosInDTO: ConsultaCitaFiltrosInDTO;
  private consultasCitasUserOutDTO: ConsultasCitasUserOutDTO;

  public citas: CitaMedicaDTO[] = [];
  public estados: string[] = ['Programada', 'Cancelada', 'Exitosa'];

  public citasForm: FormGroup;
  estado: string = '';
  mostrarTabla: boolean = false;
  opcionSeleccionada: boolean =false;

  constructor(
    private form: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public citasService: CitaMedicaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.citasForm = this.form.group({
      estado: [null],
      fecha: [null],
      cedula: [null],
    });
    this.consultarCitas();
  }

  ngAfterViewInit(): void {
    this.citasForm.get('nombre')?.setValue('a');
  }

  consultarCitas() {
    this.consultaCitaFiltrosInDTO = new ConsultaCitaFiltrosInDTO();
    this.consultaCitaFiltrosInDTO.cedula = this.citasForm.get('cedula')?.value;
    this.consultaCitaFiltrosInDTO.fecha = this.citasForm.get('fecha')?.value;

    if (this.citasForm.get('estado')?.value != null) {
      if (this.citasForm.get('estado')?.value === 'Programada') {
        this.consultaCitaFiltrosInDTO.estado = 'PROGRAMADA';
      }
      if (this.citasForm.get('estado')?.value === 'Cancelada') {
        this.consultaCitaFiltrosInDTO.estado = 'CANCELADA';
      }
      if (this.citasForm.get('estado')?.value === 'Exitosa') {
        this.consultaCitaFiltrosInDTO.estado = 'EXITOSA';
      }
    }

    console.log("dto enviar",  this.consultaCitaFiltrosInDTO);
    
    this.citasService
      .consultarCitasFiltros(this.consultaCitaFiltrosInDTO)
      .subscribe((res) => {
        this.consultasCitasUserOutDTO = res;
        console.log(this.consultasCitasUserOutDTO);

        if (this.consultasCitasUserOutDTO.exitoso) {
          if (
            this.consultasCitasUserOutDTO.listaCitasMedicas != null &&
            this.consultasCitasUserOutDTO.listaCitasMedicas.length > 0
          ) {
            this.citas = this.consultasCitasUserOutDTO.listaCitasMedicas;
            this.mostrarTabla = true;
            this.cdRef.detectChanges();
          } else {
            this.cdRef.detectChanges();
            this.mostrarTabla = false;
          }
        } else {
          this.serviciosVeterinariaService.openInfoModal(
            this.consultasCitasUserOutDTO.mensaje
          );
        }
      });
  }

  public get f() {
    return this.citasForm.controls;
  }


  consultarCita(citaMedicaDTO: CitaMedicaDTO) {}

  cancelarCita(citaMedicaDTO: CitaMedicaDTO) {}

  deseleccionar(){
    this.estado = '';
    this.opcionSeleccionada= false;
  }

  seleccionar(){
    this.opcionSeleccionada= true;
  }
}
