import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditarUsuarioMascotaInDTO } from '../dtos/editar-usuario-mascota-in.dto';
import { ConsultaMascotasUsuarioOutDTO } from '../dtos/mascota/consulta-mascotas-usuario-out.dto';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMascotaComponent } from '../mascota/agregar-mascota/agregar-mascota.component';
import { creacionMascotaInDTO } from '../dtos/mascota/creacion-mascota-in.dto';
import { ResultadoDTO } from '../dtos/resultado.dto';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private mascotasData = new BehaviorSubject<any>(null);
  mascotasData$ = this.mascotasData.asObservable();

  private baseUrl = 'http://localhost:8080/veterinaria/mascota';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  consultarMascotasUsuario(
    idUser: number
  ): Observable<ConsultaMascotasUsuarioOutDTO> {
    const url = `${this.baseUrl}/mascotasUsuario?idUser=${idUser}`;
    return this.http.get<ConsultaMascotasUsuarioOutDTO>(url);
  }

  crearMascota(inDTO: creacionMascotaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/crearMascota`, inDTO);
  }

  setMascotasData(data: any) {
    console.log(data);

    this.mascotasData.next(data);
  }

  getMascotasData() {
    return this.mascotasData.getValue();
  }

  /**
   * modal de ingresar a la app
   */
  openModalAgregarMascota(): void {
    this.dialog.open(AgregarMascotaComponent, {
      width: '400px',
      height: '550px',
      data: {},
    });
  }
}
