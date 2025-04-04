import { Component, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HomeService } from '../services/home.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private homeService: HomeService;

  students = signal<any[]>([]);

  constructor() {
    this.homeService = inject(HomeService);
  }

  ngOnInit() {
    this.fetchStudents()
  }
  
  fetchStudents() {
    this.homeService.getStudents().subscribe({
      next: (data) => {
        if (data) {
          this.students.set(data); // ✅ Set only the `content` array
        } else {
          console.warn("No content field in response:", data);
        }
      },
      error: (err) => {
        console.error("Error fetching students:", err);
      }
    });
  }
}
