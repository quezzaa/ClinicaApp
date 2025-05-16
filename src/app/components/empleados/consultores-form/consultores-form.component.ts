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
import { EmpleadosServiceService } from '../../../services/empleados-service.service';

@Component({
  selector: 'app-consultores-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './consultores-form.component.html',
  styleUrl: './consultores-form.component.css'
})
export class ConsultoresFormComponent {
  consultorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private empleadosService: EmpleadosServiceService,
    private dialogRef: MatDialogRef<ConsultoresFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.consultorForm = this.fb.group({
      NombresCo: [data?.NombresCo || '', [Validators.required, Validators.maxLength(50)]],
      ApellidosCo: [data?.ApellidosCo || '', [Validators.required, Validators.maxLength(50)]],
      EmailCo: [data?.EmailCo || '', [Validators.required, , Validators.maxLength(50)]],
      DireccionCo: [data?.DireccionCo || ''],
      TelCo: [data?.TelCo || '', [Validators.required, Validators.maxLength(8)]],
      DpiCo: [data?.DpiCo || '', [Validators.required, Validators.maxLength(13)]],
    });
  }

  guardar() {
    if (this.consultorForm.invalid) return;

    const data = this.consultorForm.value;
    const request$ = this.data?.idConsultor
      ? this.empleadosService.updateConsultor(this.data.idConsultor, data)
      : this.empleadosService.insertConsultor(data);

    request$.subscribe(() => this.dialogRef.close('actualizar'));
    this.toast.success('Consultor guardado con éxito', 'Éxito', {
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
