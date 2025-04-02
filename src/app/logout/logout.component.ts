import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../components/header/header.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-logout',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  authService = inject(AuthService);
  isLoading = signal(false)

  logout() {
    this.isLoading.set(true)
   const isLogout = confirm("Are you sure you want to logout?")
   if (isLogout) {
    this.authService.logout()
  }

  this.isLoading.set(false)
}
}
