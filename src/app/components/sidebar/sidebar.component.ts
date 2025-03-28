import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { PrimeIcons } from 'primeng/api';
import { items } from '../../models/items.sidebar';
import { sideBarType } from '../../models/sidebar.todo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [
    SidebarModule,
    ButtonModule,
    SidebarItemComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  PrimeIcons = PrimeIcons
  items: sideBarType[] = items

  private router: Router
  constructor (router: Router) {
    this.router = router
  }

}
