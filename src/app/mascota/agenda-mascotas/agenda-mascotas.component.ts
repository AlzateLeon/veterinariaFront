import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';

@Component({
  selector: 'app-agenda-mascotas',
  templateUrl: './agenda-mascotas.component.html',
  styleUrls: ['../../app.component.css'],
})
export class AgendaMascotasComponent {

  public submitted: boolean = false;

  constructor(
    public dialog: MatDialog,
  ) {
  }

  irCrear(){
    const dialogoModal = this.dialog.open(AgregarCitaComponent);

    dialogoModal.afterClosed().subscribe(e => {
        //this.recargarListaCitas();
        console.log("cita agendada");
        
    });
  }
}
