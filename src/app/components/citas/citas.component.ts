import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CitasServiceService } from '../../services/citas-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { EmpleadosServiceService } from '../../services/empleados-service.service';
import { ClientesServiceService } from '../../services/clientes-service.service';
import { TratamientosServiceService } from '../../services/tratamientos-service.service';


@Component({
  selector: 'app-citas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule
  ],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  citas: any
  citaForm: FormGroup;
  editando: boolean = false;
  clientes: any
  programadores: any
  especialistas: any
  tratamientoscliente: any

  constructor(
    private fb: FormBuilder,
    private citasService: CitasServiceService,
    private clientesService: ClientesServiceService,
    private empleadosService: EmpleadosServiceService,
    private tratamientoCliente: TratamientosServiceService,
    private snackBar: MatSnackBar
  ) {
    this.citaForm = this.fb.group({
      idCita: [null],
      idProgramador: ['', Validators.required],
      idCliente: ['', Validators.required],
      idEspecialista: ['', Validators.required],
      idTratamiento: ['', Validators.required],
      FechaGenerada: [new Date(), Validators.required],
      Inicio: ['', Validators.required],
      Final: ['', Validators.required],
      Atendido: [false]
    });
  }

  ngOnInit(): void {
    this.cargarCitas();
    this.cargarProgramadores();
    this.cargarClientes();
    this.cargarEspecialista();
    this.citaForm.get('idCliente')?.valueChanges.subscribe(idCliente => {
      const cliente = this.clientes.find((cliente: any) => cliente.idCliente === idCliente);
      if (cliente) {
        this.cargarTratamientoCliente(cliente.idCliente);
      }
    });
  }

  cargarCitas() {
    this.citasService.obtenerCitas().subscribe(data => this.citas = data);
  }
  cargarProgramadores() {
    this.empleadosService.getProgramadores().subscribe(data => this.programadores = data);
  }
  cargarEspecialista() {
    this.empleadosService.getEspecialistas().subscribe(data => this.especialistas = data);
  }
  cargarClientes() {
    this.clientesService.getClientes().subscribe(data => this.clientes = data);
  }
  cargarTratamientoCliente(id: number) {
    this.tratamientoCliente.getTratamientosCliente(id).subscribe(data => this.tratamientoscliente = data);
    console.log(this.tratamientoscliente)
  }

  guardarCita() {
    const cita = this.citaForm.value;

    if (this.editando) {
      this.citasService.editarCita(cita).subscribe({
        next: () => {
          this.snackBar.open('Cita actualizada', 'Cerrar', { duration: 2000 });
          this.cargarCitas();
          this.resetForm();
        },
        error: err => this.snackBar.open(err.error || 'Error', 'Cerrar')
      });
    } else {
      this.citasService.crearCita(cita).subscribe({
        next: () => {
          this.snackBar.open('Cita creada', 'Cerrar', { duration: 2000 });
          this.cargarCitas();
          this.resetForm();
        },
        error: err => this.snackBar.open(err.error || 'Error', 'Cerrar')
      });
    }
  }

  editar(cita: any) {
    this.editando = true;
    this.citaForm.patchValue(cita);
    this.citaForm.patchValue({
      Inicio: this.toDatetimeLocal(new Date(cita.Inicio)),
      Final: this.toDatetimeLocal(new Date(cita.Final)),
    });
  }

  eliminar(id: number) {
    this.citasService.borrarCita(id).subscribe(() => {
      this.snackBar.open('Cita eliminada', 'Cerrar', { duration: 2000 });
      this.cargarCitas();
    });
  }

  resetForm() {
    this.citaForm.reset({ FechaGenerada: new Date() });
    this.editando = false;
  }

  toDatetimeLocal(date: Date): string {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

}
