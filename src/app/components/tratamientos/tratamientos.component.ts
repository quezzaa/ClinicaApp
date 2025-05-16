import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TratamientosFormComponent } from './tratamientos-form/tratamientos-form.component';// ajusta path según tu estructura
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TratamientosServiceService } from '../../services/tratamientos-service.service';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule],
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css'
})
export class TratamientosComponent {
  tratamientos: any;
  displayedColumns: string[] = [
  'Tratamiento', 'Costo', 'Cantidad', 'Descripcion', 'acciones'
];

constructor(private tratamientosService: TratamientosServiceService, private dialog: MatDialog, private toast:ToastrService) {}

  ngOnInit() {
    this.cargarTratamientos();
  }

  cargarTratamientos() {
    this.tratamientosService.getTratamientos().subscribe(res => {
      this.tratamientos = res;
    });
  }

  abrirFormulario(cliente?: any) {
    const dialogRef = this.dialog.open(TratamientosFormComponent, {
      width: '600px',
      data: cliente || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'actualizar') {
        this.cargarTratamientos();
      }
    });
  }

  eliminarTratamiento(id: number) {
    if (confirm('¿Eliminar cliente?')) {
      this.tratamientosService.deleteTratamiento(id).subscribe(() => this.cargarTratamientos());
      this.toast.success('Cliente eliminado con éxito', 'Éxito', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
  }
}
