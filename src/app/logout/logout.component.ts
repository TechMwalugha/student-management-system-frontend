import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [SidebarComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  authService = inject(AuthService);

  logout() {
   const isLogout = confirm("Are you sure you want to logout?")
   if (isLogout) {
    this.authService.logout()
  }
}
}
