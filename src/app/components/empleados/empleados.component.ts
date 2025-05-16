import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultoresFormComponent } from './consultores-form/consultores-form.component';
import { EspecialistasFormComponent } from './especialistas-form/especialistas-form.component';
import { ProgramadoresFormComponent } from './programadores-form/programadores-form.component';
import { EmpleadosServiceService } from '../../services/empleados-service.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  MatTabsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  consultores: any;
  colConsultores: string[] = [
  'Nombres','Apellidos','Dpi','Email','Direccion','Tel','acciones'
  ];
  especialistas: any;
  colEspecialistas: string[] = [
  'Nombres','Apellidos','Especialidad','Colegiado','Dpi','Email','Direccion','Tel','acciones'
  ];
  programadores: any;
  colProgramadores: string[] = [
  'Nombres','Apellidos','Dpi','Email','Direccion','Tel','acciones'
  ];

  constructor(private empleadosService: EmpleadosServiceService, private dialog: MatDialog, private toast:ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
      this.cargarConsultores();
      this.cargarEspecialistas();
      this.cargarProgramadores();
    }
  
    cargarConsultores() {
      this.empleadosService.getConsultores().subscribe(res => {
        this.consultores = res;
      });
    }
    cargarEspecialistas() {
      this.empleadosService.getEspecialistas().subscribe(res => {
        this.especialistas = res;
      });
    }
    cargarProgramadores() {
      this.empleadosService.getProgramadores().subscribe(res => {
        this.programadores = res;
      });
    }
  
    abrirFormularioConsultores(Consultor?: any) {
      const dialogRef = this.dialog.open(ConsultoresFormComponent, {
        width: '600px',
        data: Consultor || null,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'actualizar') {
          this.cargarConsultores();
        }
      });
    }
    abrirFormularioEspecialistas(Especialista?: any) {
      const dialogRef = this.dialog.open(EspecialistasFormComponent, {
        width: '600px',
        data: Especialista || null,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'actualizar') {
          this.cargarEspecialistas();
        }
      });
    }
    abrirFormularioProgramadores(Programadores?: any) {
      const dialogRef = this.dialog.open(ProgramadoresFormComponent, {
        width: '600px',
        data: Programadores || null,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'actualizar') {
          this.cargarProgramadores();
        }
      });
    }
  
    eliminarConsultor(id: number) {
      if (confirm('¿Eliminar Consultor?')) {
        this.empleadosService.deleteConsultor(id).subscribe(() => this.cargarConsultores());
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.toast.success('Consultor eliminado con éxito', 'Éxito', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    }
    eliminarEspecialista(id: number) {
      if (confirm('¿Eliminar Especialista?')) {
        this.empleadosService.deleteEspecialista(id).subscribe(() => this.cargarEspecialistas());
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.toast.success('Especialista eliminado con éxito', 'Éxito', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    }
    eliminarProgramador(id: number) {
      if (confirm('¿Eliminar Programador?')) {
        this.empleadosService.deleteProgramador(id).subscribe(() => this.cargarProgramadores()
      );
        
        this.toast.success('Programador eliminado con éxito', 'Éxito', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    }
}
