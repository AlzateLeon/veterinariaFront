import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultadoDTO } from '../dtos/resultado.dto';
import { Observable } from 'rxjs';
import { CreacionVacunaInDTO } from '../dtos/vacuna/creacion-vacuna-in.dto';
import { AplicacionVacunaInDTO } from '../dtos/vacuna/aplicacion-vacuna-in.dto';

@Injectable({
  providedIn: 'root',
})
export class VacunaService {
  private baseUrl = 'http://localhost:8080/veterinaria/vacuna';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  crearVacuna(inDTO: CreacionVacunaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/crearVacuna`, inDTO);
  }

  aplicarVacuna(inDTO: AplicacionVacunaInDTO): Observable<ResultadoDTO> {
    return this.http.post<ResultadoDTO>(`${this.baseUrl}/aplicarVacuna`, inDTO);
  }

}
