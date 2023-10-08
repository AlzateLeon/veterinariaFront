import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditarUsuarioMascotaInDTO } from '../dtos/editar-usuario-mascota-in.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioData = new BehaviorSubject<any>(null);
  usuarioData$ = this.usuarioData.asObservable();
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,) {}

  setUsuarioData(data: any) {
    this.usuarioData.next(data);
  }

  getUsuarioData() {
    return this.usuarioData.getValue();
  }

  editarUsuario(editarUsuarioIn: EditarUsuarioMascotaInDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario/editarUsuario`, editarUsuarioIn);
  }
}
