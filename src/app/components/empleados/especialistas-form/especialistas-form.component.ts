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
  selector: 'app-especialistas-form',
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
  templateUrl: './especialistas-form.component.html',
  styleUrl: './especialistas-form.component.css'
})
export class EspecialistasFormComponent {
  especialistaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private empleadosService: EmpleadosServiceService,
    private dialogRef: MatDialogRef<EspecialistasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.especialistaForm = this.fb.group({
      NombresE: [data?.NombresE || '', [Validators.required, Validators.maxLength(50)]],
      ApellidosE: [data?.ApellidosE || '', [Validators.required, Validators.maxLength(50)]],
      EmailE: [data?.EmailE || '', [Validators.required, , Validators.maxLength(50)]],
      DireccionE: [data?.DireccionE || ''],
      TelE: [data?.TelE || '', [Validators.required, Validators.maxLength(8)]],
      DpiE: [data?.DpiE || '', [Validators.required, Validators.maxLength(13)]],
      Especialidad: [data?.Especialidad || '', [Validators.required, Validators.maxLength(40)]],
      Colegiado: [data?.Colegiado || '', [Validators.required, Validators.maxLength(7)]],
    });
  }

  guardar() {
    if (this.especialistaForm.invalid) return;

    const data = this.especialistaForm.value;
    const request$ = this.data?.idEspecialista
      ? this.empleadosService.updateEspecialista(this.data.idEspecialista, data)
      : this.empleadosService.insertEspecialista(data);

    request$.subscribe(() => this.dialogRef.close('actualizar'));
    this.toast.success('Especialista guardado con éxito', 'Éxito', {
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
