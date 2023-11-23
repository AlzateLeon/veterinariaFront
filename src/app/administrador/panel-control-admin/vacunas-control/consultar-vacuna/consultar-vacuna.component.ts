import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VacunaDTO } from 'src/app/dtos/vacuna/vacuna.dto';

@Component({
  selector: 'app-consultar-vacuna',
  templateUrl: './consultar-vacuna.component.html',
  styleUrls: ['../../../../app.component.css'],
})
export class ConsultarVacunaComponent {

  vacuna: VacunaDTO;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConsultarVacunaComponent>,
  ) {
    this.vacuna = this.data.vacuna;
  }

  volver() {
    this.dialogRef.close();
  }
}
