import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../services/sidenav.service';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule,RouterModule,MatIcon,MatListModule,CommonModule,MatButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private subscription: Subscription;
  menuItems = [
    { icon: 'home', label: 'Inicio', path: '/inicio' },
    { icon: 'healing', label: 'Tratamientos', path: '/tratamientos' },
    { icon: 'groups', label: 'Clientes', path: '/clientes' },
    { icon: 'person', label: 'Colaboradores', path: '/colaboradores' },
    { icon: 'event', label: 'Citas', path: '/citas' },
    { icon: 'receipt_long', label: 'Compras', path: '/compras' }
  ];
  constructor(private sidenavService: SidenavService) {
    this.subscription = this.sidenavService.toggleSidenav$.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
