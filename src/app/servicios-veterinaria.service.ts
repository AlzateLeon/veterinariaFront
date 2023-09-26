import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreacionUsuarioIn } from './dtos/creacion-usuario-in';
import { ModalInfoComponent } from './utiles/modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ServiciosVeterinariaService {

  private baseUrl = 'http://localhost:8080'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient,
    private dialog: MatDialog
    ) { }

  crearNuevoUsuario(creacionUsuarioIn: CreacionUsuarioIn): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario`, creacionUsuarioIn);
  }

  openInfoModal(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: { mensaje: message },
    });
  }

  consultarUsuarioExistente(user: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}/usuario?user=${user}&contrasena=${contrasena}`;
    return this.http.get(url);
  }
}
