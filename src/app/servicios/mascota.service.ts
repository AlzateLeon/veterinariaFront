import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditarUsuarioMascotaInDTO } from '../dtos/editar-usuario-mascota-in.dto';
import { ConsultaMascotasUsuarioOutDTO } from '../dtos/mascota/consulta-mascotas-usuario-out.dto';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {

  private mascotasData = new BehaviorSubject<any>(null);
  mascotasData$ = this.mascotasData.asObservable();

  private baseUrl = 'http://localhost:8080/mascota';

  constructor(private http: HttpClient) {}

  consultarMascotasUsuario(idUser: number): Observable<ConsultaMascotasUsuarioOutDTO> {
    const url = `${this.baseUrl}/mascotasUsuario?idUser=${idUser}`;
    return this.http.get<ConsultaMascotasUsuarioOutDTO>(url);
  }

  setMascotasData(data: any) {
    console.log(data);
    
    this.mascotasData.next(data);
  }

  getMascotasData() {
    return this.mascotasData.getValue();
  }
}
