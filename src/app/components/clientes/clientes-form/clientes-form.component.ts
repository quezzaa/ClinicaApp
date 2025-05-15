import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, MaxLengthValidator } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ClientesServiceService } from '../../../services/clientes-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes-form',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private clienteService: ClientesServiceService,
    private dialogRef: MatDialogRef<ClientesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.clienteForm = this.fb.group({
      NombresC: [data?.NombresC || '', [Validators.required, Validators.maxLength(20)]],
      ApellidosC: [data?.ApellidosC || '', [Validators.required, Validators.maxLength(20)]],
      CodigoC: [data?.CodigoC || '', [Validators.required, Validators.maxLength(6)]],
      NitC: [data?.NitC || '', [Validators.required, Validators.maxLength(13)]],
      DireccionC: [data?.DireccionC || '', [Validators.required]],
      TelC: [data?.TelC || '', [Validators.required, Validators.maxLength(8)]],
      EmailC: [data?.EmailC || '', [Validators.required, Validators.email, Validators.maxLength(30)]],
      Nacimiento: [data?.Nacimiento || '', Validators.required],
      Peso: [data?.Peso || '', Validators.required],
      idSexo: [data?.idSexo || '', Validators.required]
    });
  }

  guardar() {
    if (this.clienteForm.invalid) return;

    const data = this.clienteForm.value;
    const request$ = this.data?.idCliente
      ? this.clienteService.updateCliente(this.data.idCliente, data)
      : this.clienteService.insertCliente(data);

    request$.subscribe(() => this.dialogRef.close('actualizar'));
    this.toast.success('Cliente guardado con éxito', 'Éxito', {
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

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
