import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, MaxLengthValidator } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosServiceService } from '../../../services/empleados-service.service';
import { FacturasServiceService } from '../../../services/facturas-service.service';
import { ClientesServiceService } from '../../../services/clientes-service.service';
import { TratamientosServiceService } from '../../../services/tratamientos-service.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-compras-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './compras-form.component.html',
  styleUrl: './compras-form.component.css'
})
export class ComprasFormComponent implements OnInit {
  comprasForm: FormGroup;
  clientes: any
  consultores: any
  tratamientos: any

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private empleadosService: EmpleadosServiceService,
    private tratamientosService: TratamientosServiceService,
    private facturasService: FacturasServiceService,
    private clientesService: ClientesServiceService,
    private dialogRef: MatDialogRef<ComprasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.comprasForm = this.fb.group({
      idCliente: [data?.idCliente || '', Validators.required],
      idConsultor: [data?.idConsultor || '', Validators.required],
      idTratamiento: [data?.idTratamiento || '', Validators.required],
      Fecha: [data?.Fecha ? new Date(data.Fecha) : new Date()],
      Monto: [{ value: '', disabled: false }, Validators.required],
      Cantidad:[{value: 1}]
    });
  }

  guardar() {
    if (this.comprasForm.invalid) return;

    const data = this.comprasForm.value;
    const request$ = this.data?.idFactura
      ? this.facturasService.updateFactura(this.data.idFactura, data)
      : this.facturasService.insertFactura(data);

    request$.subscribe(() => this.dialogRef.close('actualizar'));
    this.toast.success('Compra guardada con éxito', 'Éxito', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarConsultores();
    this.cargarTratamientos();
    // Escuchar cambios del tratamiento seleccionado
    this.comprasForm.get('idTratamiento')?.valueChanges.subscribe(idTratamiento => {
      const tratamiento = this.tratamientos.find((tratamiento: any) => tratamiento.idTratamiento === idTratamiento);
      if (tratamiento) {
        this.comprasForm.patchValue({ Monto: tratamiento.Costo });
        this.comprasForm.patchValue({ Cantidad: tratamiento.Cantidad });
      }
    });
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe(res => {
      this.clientes = res;
    });
  }
  cargarConsultores() {
    this.empleadosService.getConsultores().subscribe(res => {
      this.consultores = res;
    });
  }
  cargarTratamientos() {
    this.tratamientosService.getTratamientos().subscribe(res => {
      this.tratamientos = res;
    });
  }

}
