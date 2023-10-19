import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ConsultaMascotasUsuarioOutDTO } from 'src/app/dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { UsuarioDTO } from 'src/app/dtos/usuario.dto';
import { ServiciosVeterinariaService } from 'src/app/servicios-veterinaria.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['../../app.component.css'],
})
export class ListaMascotasComponent implements AfterViewInit {
  public mascotas: MascotaDTO[] = []; // Debe obtenerse la lista de mascotas del usuario

  public consultaMascotasUsuarioOutDTO: ConsultaMascotasUsuarioOutDTO;

  public usuarioDTO: UsuarioDTO;

  public showModal: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    public usuarioService: UsuarioService,
    private mascotaService: MascotaService,
    private serviciosVeterinariaService: ServiciosVeterinariaService
  ) {
    this.usuarioDTO = usuarioService.getUsuarioData();
  }
  ngAfterViewInit(): void {
    this.mascotaService.mascotasData$.subscribe((mascotas) => {
      this.consultaMascotasUsuarioOutDTO = mascotas;
      this.mascotas = this.consultaMascotasUsuarioOutDTO.listaMascotas;

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

  recargarListaMascotas() {
    this.mascotaService
      .consultarMascotasUsuario(this.usuarioDTO.idUser)
      .subscribe((resultado) => {
        if (resultado.exitoso) {
          this.consultaMascotasUsuarioOutDTO = resultado;
          this.mascotas = this.consultaMascotasUsuarioOutDTO.listaMascotas;
          this.cdRef.detectChanges();
        } else {
          this.serviciosVeterinariaService.openInfoModal(
            this.consultaMascotasUsuarioOutDTO.mensaje
          );
        }
      });
  }

  agregarMascota() {
    this.mascotaService.openModalAgregarMascota();
    // this.showModal = true;
  }
}
