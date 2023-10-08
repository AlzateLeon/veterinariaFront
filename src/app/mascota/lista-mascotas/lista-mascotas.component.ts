import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['../../app.component.css'],
})
export class ListaMascotasComponent implements AfterViewInit{
  public mascotas: MascotaDTO[] = []; // Debe obtenerse la lista de mascotas del usuario

  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  constructor(
    private cdRef: ChangeDetectorRef,
    private mascotaService: MascotaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    
  }
  ngAfterViewInit(): void {
    this.mascotaService.mascotasData$.subscribe((mascotas) => {

      console.log("mascota", mascotas);
      
      this.consultaMascotasUsuarioOutDTO = mascotas;
      console.log("mascota2", this.consultaMascotasUsuarioOutDTO);
      this.mascotas = this.consultaMascotasUsuarioOutDTO.listaMascotas;
      console.log("mascota3", this.mascotas);

      this.cdRef.detectChanges(); 
    });
  }

  ngOnInit(): void {
    // Aquí debes obtener la lista de mascotas del usuario, por ejemplo, desde un servicio
    // this.mascotas = this.mascotaService.getMascotasByUsuarioId(usuarioId);
    // for (let index = 0; index < 5; index++) {
    //   let mascota: MascotaDTO = new MascotaDTO();
    //   mascota.nombre = "Perrito" + index;
    //   mascota.raza = "raza" + index;
    //   mascota.edad = "Edad" + index;
    //   mascota.id =  index;
    //   this.mascotas.push(mascota);
    // }
  }

  onMascotaClick(mascota: MascotaDTO) {
    mascota.clicked = !mascota.clicked;
    console.log(mascota);
  }
}
