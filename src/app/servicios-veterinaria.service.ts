import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosVeterinariaService {

  private baseUrl = 'http://localhost:8080'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  obtenerDatos() {
    return this.http.get(`${this.baseUrl}/ruta-del-backend`);
  }
}
