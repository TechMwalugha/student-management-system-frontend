import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { sideBarType } from '../../models/sidebar.todo';


@Component({
  selector: 'app-sidebar-item',
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  item = input<sideBarType>()
  constructor(private router: Router) {}

 
}
