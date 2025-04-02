import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: string | null = null
 
  constructor() { 
    const storedUser = localStorage.getItem('user');

    if(storedUser) {
      this.user = JSON.parse(storedUser).fullName;
    }

  }
}
