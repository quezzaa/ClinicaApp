import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitasServiceService } from '../../../services/citas-service.service';
import { FacturasServiceService } from '../../../services/facturas-service.service';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reporte-cliente-dialog',
  standalone: true,
  imports: [
    MatListModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './reporte-cliente-dialog.component.html',
  styleUrl: './reporte-cliente-dialog.component.css'
})
export class ReporteClienteDialogComponent implements OnInit {
  citas: any
  facturas: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: any,
    private citasService: CitasServiceService,
    private facturasService: FacturasServiceService
  ) {}

  ngOnInit(): void {
    console.log(parseInt(this.cliente.idCliente))
    this.citasService.obtenerCitasCliente(parseInt(this.cliente.idCliente)).subscribe(data => {
      console.log(data)
      this.citas = data;
    });

    this.facturasService.getFacturasCliente(parseInt(this.cliente.idCliente)).subscribe(data => {
      console.log(data)
      this.facturas = data;
    });
  }

   @ViewChild('reporte', { static: false }) reporteElement!: ElementRef;

   descargarPDF(): void {
    const element = this.reporteElement.nativeElement;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`reporte-${this.cliente.NombresC}-${this.cliente.ApellidosC}.pdf`);
    });
  }

}
