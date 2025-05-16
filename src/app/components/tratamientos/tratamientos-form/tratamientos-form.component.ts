import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, MaxLengthValidator } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { TratamientosServiceService } from '../../../services/tratamientos-service.service';

@Component({
  selector: 'app-tratamientos-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule],
  templateUrl: './tratamientos-form.component.html',
  styleUrl: './tratamientos-form.component.css'
})
export class TratamientosFormComponent {
  tratamientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private tratamientosService: TratamientosServiceService,
    private dialogRef: MatDialogRef<TratamientosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tratamientoForm = this.fb.group({
      Tratamiento: [data?.Tratamiento || '', [Validators.required, Validators.maxLength(50)]],
      Costo: [data?.Costo || '0', [Validators.required]],
      Cantidad: [data?.Cantidad || '0', [Validators.required, Validators.pattern('^[0-9]*[^.,]*$')]],
      Descripcion: [data?.Descripcion || ''],
    });
  }

  guardar() {
    if (this.tratamientoForm.invalid) return;

    const data = this.tratamientoForm.value;
    const request$ = this.data?.idTratamiento
      ? this.tratamientosService.updateTratamiento(this.data.idTratamiento, data)
      : this.tratamientosService.insertTratamiento(data);

    request$.subscribe(() => this.dialogRef.close('actualizar'));
    this.toast.success('Tratamiento guardado con éxito', 'Éxito', {
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

}
