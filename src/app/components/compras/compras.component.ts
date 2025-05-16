import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComprasFormComponent } from './compras-form/compras-form.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientesServiceService } from '../../services/clientes-service.service';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { FacturasServiceService } from '../../services/facturas-service.service';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  compras: any;
  displayedColumns: string[] = [
  'No Factura', 'Cliente', 'Consultor', 'Monto', 'Fecha Emisión', 'acciones'
];
  constructor(private clienteService: ClientesServiceService, private dialog: MatDialog, private toast:ToastrService,
    private facturasService: FacturasServiceService
  ) {}

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.facturasService.getFacturas().subscribe(res => {
      this.compras = res;
    });
  }

  abrirFormulario(compra?: any) {
    const dialogRef = this.dialog.open(ComprasFormComponent, {
      width: '600px',
      data: compra || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'actualizar') {
        this.cargarFacturas();
      }
    });
  }

  eliminarFactura(id: number) {
    if (confirm('¿Eliminar factura?')) {
      this.facturasService.deleteFactura(id).subscribe(() => this.cargarFacturas());
      this.toast.success('Compra eliminada con éxito', 'Éxito', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }
  }
}
