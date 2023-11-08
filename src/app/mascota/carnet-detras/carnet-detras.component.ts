import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MascotaDTO } from 'src/app/dtos/mascota/mascota.dto';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { CarnetMascotaComponent } from '../carnet-mascota/carnet-mascota.component';

@Component({
  selector: 'app-carnet-detras',
  templateUrl: './carnet-detras.component.html',
  styleUrls: ['../../app.component.css'],
})
export class CarnetDetrasComponent {

  listaVacunas : any[] = [];

  public mascota: MascotaDTO;

  constructor(
    public dialog: MatDialog,
    private mascotaService: MascotaService,
    public dialogRef: MatDialogRef<CarnetDetrasComponent>
  ){
    this.mascota = this.mascotaService.getMascotaData();
    for (let index = 0; index < 5; index++) {

      let vacunacion: any = {
        nombre: "vacuna"+index,
        fecha: "fecha"+index,
        // Puedes agregar más propiedades aquí si es necesario
      };

      this.listaVacunas.push(vacunacion);
    }
  }

  volver() {
    this.dialogRef.close();
  }

  voltearTarjeta() {
    console.log('voltear tarjeta');
    this.volver();

    const dialogoModal = this.dialog.open(CarnetMascotaComponent);

  }

}
