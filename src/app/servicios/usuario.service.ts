import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditarUsuarioMascotaInDTO } from '../dtos/editar-usuario-mascota-in.dto';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { ActivarCuentaDTO } from '../dtos/activar-cuenta.dto';
import { EnvioCorreoInDTO } from '../dtos/envio-correo-in.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioData = new BehaviorSubject<any>(null);
  usuarioData$ = this.usuarioData.asObservable();
  private baseUrl = 'http://localhost:8080/veterinaria/usuario';

  constructor(private http: HttpClient,) {}

  setUsuarioData(data: any) {
    this.usuarioData.next(data);
  }

  getUsuarioData() {
    return this.usuarioData.getValue();
  }

  editarUsuario(editarUsuarioIn: EditarUsuarioMascotaInDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/editarUsuario`, editarUsuarioIn);
  }

  mandarCorreoValidacion(envioCorreoInDTO: EnvioCorreoInDTO): Observable<ResultadoDTO>{
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/mandarCorreoValidacion`, envioCorreoInDTO)
  }

  activarCuenta(activarCuentaDTO: ActivarCuentaDTO): Observable<ResultadoDTO> {
    const url = `${this.baseUrl}/activarCuenta`;
    return this.http.post<ResultadoDTO>(url, activarCuentaDTO);
  }
}
