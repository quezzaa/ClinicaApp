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
  selector: 'app-programadores-form',
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
  templateUrl: './programadores-form.component.html',
  styleUrl: './programadores-form.component.css'
})
export class ProgramadoresFormComponent {
  programadorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private empleadosService: EmpleadosServiceService,
    private dialogRef: MatDialogRef<ProgramadoresFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.programadorForm = this.fb.group({
      NombresP: [data?.NombresP || '', [Validators.required, Validators.maxLength(50)]],
      ApellidosP: [data?.ApellidosP || '', [Validators.required, Validators.maxLength(50)]],
      EmailP: [data?.EmailP || '', [Validators.required, , Validators.maxLength(50)]],
      DireccionP: [data?.DireccionP || ''],
      TelP: [data?.TelP || '', [Validators.required, Validators.maxLength(8)]],
      DpiP: [data?.DpiP || '', [Validators.required, Validators.maxLength(13)]],
    });
  }

  guardar() {
    if (this.programadorForm.invalid) return;

    const data = this.programadorForm.value;
    const request$ = this.data?.idProgramador
      ? this.empleadosService.updateProgramador(this.data.idProgramador, data)
      : this.empleadosService.insertProgramador(data);

    request$.subscribe(() => this.dialogRef.close('actualizar'));
    this.toast.success('Programador guardado con éxito', 'Éxito', {
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
