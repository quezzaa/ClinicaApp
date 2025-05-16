import { Routes } from '@angular/router';
import { CitasComponent } from './components/citas/citas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ComprasComponent } from './components/compras/compras.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';

export const routes: Routes = [
  { path: 'colaboradores', component: EmpleadosComponent},
  { path: 'clientes', component:  ClientesComponent},
  { path: 'tratamientos', component:  TratamientosComponent},
  { path: 'citas', component:  CitasComponent},
  { path: 'compras', component: ComprasComponent},
  { path: '', redirectTo: '/tratamientos', pathMatch: 'full' },
];

