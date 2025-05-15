import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';// ajusta path según tu estructura
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientesServiceService } from '../../services/clientes-service.service';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
  clientes: any;
  displayedColumns: string[] = [
  'nombres', 'apellidos', 'codigo', 'nit', 'direccion',
  'telefono', 'email', 'peso', 'genero', 'nacimiento', 'acciones'
];


  constructor(private clienteService: ClientesServiceService, private dialog: MatDialog, private toast:ToastrService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res;
    });
  }

  abrirFormulario(cliente?: any) {
    const dialogRef = this.dialog.open(ClientesFormComponent, {
      width: '600px',
      data: cliente || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'actualizar') {
        this.cargarClientes();
      }
    });
  }

  eliminarCliente(id: number) {
    if (confirm('¿Eliminar cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => this.cargarClientes());
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
